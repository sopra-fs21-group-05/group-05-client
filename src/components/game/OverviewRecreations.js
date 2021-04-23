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
import stick from "../game/assets/BuildingMaterials/SticksStones/stick1.png";


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
  height: 35px;
  padding-left: 10px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
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
            picturesGrid: null,
            recreations: null,
            guess1: null,
            guess2: null,
            guess3: null,
            guess4: null,
            guess5: null,
            guesses: []
        }
    };

    async getPicture() {
        try {
            const pathname = this.props.location.pathname;

            const response = await api.get(pathname);

            this.setState({recreations: response.data});

        } catch (error) {
            alert(`Something went wrong while getting the picture and material set: \n${handleError(error)}`);
        }
    }

    componentDidMount() {
        this.getImage();
    }

    async getImage(){
        try {
            const p = await api.get('/game/setup/2')
            this.setState({picturesGrid: p.data});
            console.log(this.state.picturesGrid[0]);
        } catch (error) {
            console.log("error while getting image: " + error);
        }
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
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid[0]} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid[1]} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid[2]} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid[3]} alt={"pic"} width="150" />  </Col>
                            </Row>
                            {/*<br />*/}
                            <Row align="center" style={{ }} >
                                <EllipseV> b </EllipseV>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid[4]} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid[5]} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid[6]} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid[7]} alt={"pic"} width="150" />  </Col>
                            </Row>
                            {/*<br />*/}
                            <Row align="center" style={{ }} >
                                <EllipseV> c </EllipseV>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid[8]} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid[9]} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid[10]} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid[11]} alt={"pic"} width="150" />  </Col>
                            </Row>
                            {/*<br />*/}
                            <Row align="center" style={{ }} >
                                <EllipseV> d </EllipseV>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid[12]} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid[13]} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid[14]} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid[15]} alt={"pic"} width="150" />  </Col>
                            </Row>
                        </Container>)
                    }
                </FormContainer>
                <Container>
                    <PictureContainer>
                        <Row align="center" style={{ }} >
                            <Col> <img src={stick} width={50} />
                                <InputField
                                    placeholder="Enter guess.."
                                    onChange={e => {
                                        this.handleInputChange('guess1', e.target.value);
                                    }}
                                />
                            </Col>
                            <Col > <img src={stick} width={50} />
                                <InputField
                                    placeholder="Enter guess.."
                                    onChange={e => {
                                        this.handleInputChange('guess2', e.target.value);
                                    }}
                                />
                            </Col>
                            <Col > <img src={stick} width={50} />
                                <InputField
                                    placeholder="Enter guess.."
                                    onChange={e => {
                                        this.handleInputChange('guess3', e.target.value);
                                    }}
                                />
                            </Col>
                            <Col > <img src={stick} width={50} />
                                <InputField
                                    placeholder="Enter guess.."
                                    onChange={e => {
                                        this.handleInputChange('guess4', e.target.value);
                                    }}
                                />
                            </Col>
                            <Col > <img src={stick} width={50} />
                                <InputField
                                    placeholder="Enter guess.."
                                    onChange={e => {
                                        this.handleInputChange('guess5', e.target.value);
                                    }}
                                />
                            </Col>
                        </Row>
                    </PictureContainer>
                <ButtonContainer>
                    <ButtonWhite
                        width="100%"
                        onClick={() => {
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
