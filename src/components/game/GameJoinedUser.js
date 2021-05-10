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
  background: rgba(255, 255, 255, 0.0);

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
            picturesGrid: null
        }
    };

    async getImagesGrid() {
        try {
            let gameId = sessionStorage.getItem('gameId');
            const endpoint = '/game/grid/' + gameId ;

            const response = await api.get(endpoint);

            this.setState({picturesGrid: response.data});

        } catch (error) {
            console.log("error while getting image: " + error);
        }
    }

    async playGame(){
        let gameId = sessionStorage.getItem('gameId');
        let userId = sessionStorage.getItem('loginId'); //login id here from the login to represent the userId
        this.props.history.push(`/game/${gameId}/${userId}`)
    }

    componentDidMount() {
        this.getImagesGrid();
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
                {!this.state.picturesGrid ? ("") : (
                    <ButtonContainer>
                        <ButtonWhite
                            width="20%"
                            onClick={() => {
                                this.playGame();
                            }}
                        >
                            Play the game
                        </ButtonWhite>
                    </ButtonContainer>)
                }
            </BaseContainer>


        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(GameviewUser);
