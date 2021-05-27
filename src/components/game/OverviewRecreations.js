import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { ButtonWhite } from '../../views/design/ButtonWhite';
import {EllipseH} from "../../views/design/EllipseH";
import {BaseContainer} from "../../helpers/layout";
import {Col, Container, Row, setConfiguration} from 'react-grid-system';
import {Spinner} from "../../views/design/Spinner";
import {EllipseV} from "../../views/design/EllipseV";
import RecreationElement from "./RecreationElement"

setConfiguration({
    defaultScreenClass: 'sm',
    containerWidths: [540, 740, 960, 1140, 1540]
});

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

const Container2 = styled.div`
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);

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
            userNames: {},
            ping: true,
            guesses: {}
        }
    }

    async getRecreations() {
        try {
            if(this.state.ping){
                const pathname = this.props.location.pathname;
                const response = await api.get(pathname);

                this.setState({recreations: response.data.recreations});
                this.setState({userNames: response.data.userNames});

                //ping the recreations again every two seconds
                setTimeout(() => {
                    this.getRecreations();
                }, 1000);
            }
        } catch (error) {
            alert(`Something went wrong while getting the recreations: \n${handleError(error)}`);
        }
    }


    async getImagesGrid(){
        try {
            let gameId = sessionStorage.getItem("gameId");
            const endpoint = 'game/grid/' + gameId;

            const response = await api.get(endpoint);

            this.setState({picturesGrid: response.data});

        } catch (error) {
            console.log("error while getting image: " + error);
        }
    }

    async submit(){
        try {
            let userId = sessionStorage.getItem("loginId");
            let gameId = sessionStorage.getItem("gameId");

            const endpoint = 'game/round/' + userId;
            const requestBody = JSON.stringify({
                gameId: gameId,
                guesses: this.state.guesses
            });

            const response = await api.post(endpoint, requestBody);

            const scoreboardEndpoint = '/scoreboards/' + gameId;
            const responseScoreboard = await api.post(scoreboardEndpoint, requestBody);

            this.setState({ping: false});
            this.props.history.push(scoreboardEndpoint);

        } catch (error) {
            console.log("error while posting the guesses: " + error);
        }
    }


    componentDidMount() {
        this.getImagesGrid();
        this.getRecreations();

        let userId = sessionStorage.getItem("loginId");
        this.setState({userId: userId})
    }

    componentWillUnmount(){
        this.setState({ping: false});
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    render() {
        return (
            <BaseContainer>
                <FormContainer>
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
                            <Row align="center" style={{ }} >
                                <EllipseV> b </EllipseV>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['B1']} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['B2']} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['B3']} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['B4']} alt={"pic"} width="150" />  </Col>
                            </Row>
                            <Row align="center" style={{ }} >
                                <EllipseV> c </EllipseV>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['C1']} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['C2']} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['C3']} alt={"pic"} width="150" />  </Col>
                                <Col >  <img src={"data:image/jpg;base64," + this.state.picturesGrid['C4']} alt={"pic"} width="150" />  </Col>
                            </Row>
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
                <Container2>
                    <PictureContainer>
                        <Row align="center" style={{ }} >
                            {Object.entries(this.state.recreations).map(recreation => {
                                return (
                                    <Col>
                                        <RecreationElement recreation={recreation} userName={this.state.userNames[recreation[0]]}/>
                                        <br />
                                        <Row>
                                            <InputField
                                            disabled={recreation[0] === this.state.userId}
                                            placeholder={recreation[0] === this.state.userId ? 'Your recreation' : 'Enter guess..'}
                                            style = {recreation[0] === this.state.userId ? ({ cursor: 'not-allowed' }): ({ cursor: 'text' })}
                                            onChange={e => {
                                                this.state.guesses[recreation[0]] = e.target.value;
                                            }}
                                        /></Row>
                                    </Col>
                                );
                            })}
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
            </Container2>
            </BaseContainer>


        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(GameviewUser);
