import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { ButtonWhite } from '../../views/design/ButtonWhite';
import {EllipseH} from "../../views/design/EllipseH";
import {BaseContainer} from "../../helpers/layout";
import {Col, Row} from "react-grid-system";
import {Spinner} from "../../views/design/Spinner";
import {EllipseV} from "../../views/design/EllipseV";


const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 700px;
  justify-content: center;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(0, 0, 0, 1.0);
  }
  text-transform: uppercase;
  height: 35px;
  padding-left: 5px;
  margin-left: 0px;
  margin-right: 5px;
  border: none;
  border-radius: 10px;
  margin-bottom: 10px;
  background: rgba(153, 153, 153, 0.2);
  color: black;
`;

const Container = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  min-width: 300px;
  justify-content: center;
`;

const PictureContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  min-width: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 30px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  transition: opacity 0.5s ease, transform 0.5s ease;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 50px;
  background: rgba(255, 255, 255, 0.2);

`;

const Label = styled.label`
  color: black;
  margin-bottom: 10px;
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class GameviewUser extends React.Component {
    constructor() {
        super();
        this.state = {
            userId: null,
            picturesGrid: null,
            recreations: {},
            recreations_keys: {},
            guess1: null,
            guess2: null,
            guess3: null,
            guess4: null,
            guess5: null,
        }
    };

    async getRecreations() {
        try {
            const pathname = this.props.location.pathname;

            const response = await api.get(pathname);

            this.setState({recreations: response.data});

            var keys = Object.keys(this.state.recreations);

            this.setState({recreations_keys: keys})

        } catch (error) {
            alert(`Something went wrong while getting the recreations: \n${handleError(error)}`);
        }
    }


    async getImagesGrid(){
        try {
            let gameId = localStorage.getItem("gameId");
            const endpoint = 'game/grid/' + 5;

            const response = await api.get(endpoint);

            this.setState({picturesGrid: response.data});

        } catch (error) {
            console.log("error while getting image: " + error);
        }
    }

    async submit(){
        try {
            let userId = localStorage.getItem("loginId");
            let gameId = localStorage.getItem("gameId");

            const endpoint = 'game/round/' + userId;

            var myMap = new Map();
            var keyObj = {};

            if (this.state.recreations_keys.length === 3){
                myMap.set(this.state.recreations_keys[0], this.state.guess1);
                myMap.set(this.state.recreations_keys[1], this.state.guess2);
                myMap.set(this.state.recreations_keys[2], this.state.guess3);
            } else if (this.state.recreations_keys.length === 4){
                myMap.set(this.state.recreations_keys[0], this.state.guess1);
                myMap.set(this.state.recreations_keys[1], this.state.guess2);
                myMap.set(this.state.recreations_keys[2], this.state.guess3);
                myMap.set(this.state.recreations_keys[3], this.state.guess4);
            } else {
                myMap.set(this.state.recreations_keys[0], this.state.guess1);
                myMap.set(this.state.recreations_keys[1], this.state.guess2);
                myMap.set(this.state.recreations_keys[2], this.state.guess3);
                myMap.set(this.state.recreations_keys[3], this.state.guess4);
                myMap.set(this.state.recreations_keys[4], this.state.guess5);
            }

            myMap.delete(userId);

            myMap.get(keyObj);

            for (var [key, value] of myMap) {
                console.log(key + " = " + value);
            }

            const guesses_obj = Object.fromEntries(myMap)

            const requestBody = JSON.stringify({
                gameId: 5,
                guesses: guesses_obj
            });

            console.log(requestBody);

            const response = await api.post(endpoint, requestBody);

            this.props.history.push(`/scoreboards/5`);
        } catch (error) {
            console.log("error while posting the guesses: " + error);
        }
    }


    componentDidMount() {
        this.getImagesGrid();
        this.getRecreations();

        let userId = localStorage.getItem("loginId");
        this.setState({userId: userId})
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    {/*<Ellipse>e1 </Ellipse>*/}

                    {!this.state.picturesGrid ? (
                        <Container fluid style={{ height: '400px' }}>
                            <Row justify="around"  >
                                Fetching Images, please wait
                            </Row>
                            <Row justify="around"   >
                                <Spinner />
                            </Row>
                        </Container>
                    ): (

                        <Container fluid style={{ width: '800px' }}>
                            {/*https://www.npmjs.com/package/react-grid-system*/}
                            {/*https://sealninja.github.io/react-grid-system/#col*/}
                            <Row justify="around" style={{ height: '30px' }}>
                                <EllipseH> 1 </EllipseH>
                                <EllipseH> 2 </EllipseH>
                                <EllipseH> 3 </EllipseH>
                                <EllipseH> 4 </EllipseH>
                            </Row>
                            <Row align="center"  >
                                <EllipseV>a</EllipseV>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['A1']} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['A2']} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['A3']} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['A4']} alt={"pic"} width="150" />  </Col>
                            </Row>
                            {/*<br />*/}
                            <Row align="center" style={{ }} >
                                <EllipseV> b </EllipseV>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['B1']} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['B2']} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['B3']} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['B4']} alt={"pic"} width="150" />  </Col>
                            </Row>
                            {/*<br />*/}
                            <Row align="center" style={{ }} >
                                <EllipseV> c </EllipseV>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['C1']} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['C2']} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['C3']} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['C4']} alt={"pic"} width="150" />  </Col>
                            </Row>
                            {/*<br />*/}
                            <Row align="center" style={{ }} >
                                <EllipseV> d </EllipseV>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['D1']} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['D2']} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['D3']} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['D4']} alt={"pic"} width="150" />  </Col>
                            </Row>
                        </Container>)
                    }
                </FormContainer>
                <Container>
                    <PictureContainer>
                        <Row align="center" style={{ }} >
                            <Col>
                                <Row><Label> UserId {this.state.recreations_keys[0]}</Label></Row>
                                <Row> <img src={"data:image/jpg;base64," + this.state.recreations[this.state.recreations_keys[0]]} alt={"pic"} width="180" /> </Row>
                                <br />
                                <Row><InputField
                                    disabled={this.state.recreations_keys[0] === this.state.userId}
                                    placeholder="Enter guess.."
                                    onChange={e => {
                                        this.handleInputChange('guess1', e.target.value);
                                    }}
                                /></Row>
                            </Col>
                            <Col>
                                <Row><Label> UserId {this.state.recreations_keys[1]} </Label></Row>
                                <Row> <img src={"data:image/jpg;base64," + this.state.recreations[this.state.recreations_keys[1]]} alt={"pic"} width="180" /> </Row>
                                <br />
                                <Row><InputField
                                    disabled={this.state.recreations_keys[1] === this.state.userId}
                                    placeholder="Enter guess.."
                                    onChange={e => {
                                        this.handleInputChange('guess2', e.target.value);
                                    }}
                                /></Row>
                            </Col>
                            <Col>
                                <Row><Label> UserId {this.state.recreations_keys[2]} </Label></Row>
                                <Row> <img src={"data:image/jpg;base64," + this.state.recreations[this.state.recreations_keys[2]]} alt={"pic"} width="180" /> </Row>
                                <br />
                                <Row><InputField
                                    disabled={this.state.recreations_keys[2] === this.state.userId}
                                    placeholder="Enter guess.."
                                    onChange={e => {
                                        this.handleInputChange('guess3', e.target.value);
                                    }}
                                /></Row>
                            </Col>
                            <Col>
                                <Row><Label> UserId {this.state.recreations_keys[3]}</Label></Row>
                                <Row> <img src={"data:image/jpg;base64," + this.state.recreations[this.state.recreations_keys[3]]} alt={"pic"} width="180" /> </Row>
                                <br />
                                <Row><InputField
                                    disabled={this.state.recreations_keys[3] == null || this.state.recreations_keys[3] === this.state.userId}
                                    placeholder="Enter guess.."
                                    onChange={e => {
                                        this.handleInputChange('guess4', e.target.value);
                                    }}
                                /></Row>
                            </Col>
                            <Col>
                                <Row><Label> UserId {this.state.recreations_keys[4]}</Label></Row>
                                <Row> <img src={"data:image/jpg;base64," + this.state.recreations[this.state.recreations_keys[4]]} alt={"pic"} width="180" /> </Row>
                                <br />
                                <Row><InputField
                                    disabled={this.state.recreations_keys[4] == null || this.state.recreations_keys[4] === this.state.userId}
                                    placeholder="Enter guess.."
                                    onChange={e => {
                                        this.handleInputChange('guess5', e.target.value);
                                    }}
                                /></Row>
                            </Col>
                        </Row>
                    </PictureContainer>
                <ButtonContainer>
                    <ButtonWhite
                        width="100%"
                        onClick={() => {
                            this.submit();
                        }}
                    >
                        Submit Guesses
                    </ButtonWhite>
                </ButtonContainer>
            </Container>
            </BaseContainer>


        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(GameviewUser);
