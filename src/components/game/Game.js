import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import { EllipseH} from "../../views/design/EllipseH";
import { EllipseV} from "../../views/design/EllipseV";
import { ButtonWhite } from '../../views/design/ButtonWhite';
import { Container, Row, Col, setConfiguration  } from 'react-grid-system';
import {Spinner} from "../../views/design/Spinner";

setConfiguration({
    defaultScreenClass: 'sm',
    containerWidths: [540, 740, 960, 1140, 1540]
});

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
  background: transparent;
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
  background: transparent;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.0);
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
class Game extends React.Component {
    /**
     * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
     * The constructor for a React component is called before it is mounted (rendered).
     * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
     * These fields are then handled in the onChange() methods in the resp. InputFields
     */
    constructor() {
        super();
        this.state = {
            id: null,
            token: null,
            picture: null
        }
    }
    /**
     * HTTP POST request is sent to the backend.
     * If the request is successful, a new user is returned to the front-end
     * and its token is stored in the localStorage.
     */
    async logout() {
        try {
            const requestBody = JSON.stringify({
                id: this.state.id,
                token: this.state.token
            });

            const response = await api.post('/logout', requestBody);

            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            const user = new User(response.data)

            localStorage.removeItem("token");

            this.props.history.push(`/login`);
        } catch (error) {
            alert(`Something went wrong during the logout: \n${handleError(error)}`);
        }
    }

    /**
     *  Every time the user enters something in the input field, the state gets updated.
     * @param key (the key of the state for identifying the field that needs to be updated)
     * @param value (the value that gets assigned to the identified state key)
     */
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    /**
     * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
     * Initialization that requires DOM nodes should go here.
     * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
     * You may call setState() immediately in componentDidMount().
     * It will trigger an extra rendering, but it will happen before the browser updates the screen.
     */
    async componentDidMount() {
        try {
            const p = await api.get('/game/setup/2')
            this.setState({picture: p.data});
            console.log(this.state.picture[0]);
        } catch (error) {
            console.log("error while getting image: " + error);
        }
    }

    //Work in Progress:
    async getImage(){

    }

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    {/*<Ellipse>e1 </Ellipse>*/}

                    {!this.state.picture ? (
                        <div>
                            <FormContainer>
                                Fetching Images
                                <Spinner />
                            </FormContainer>
                        </div>
                    ): (
                        <Container fluid style={{ width: '800px' }}>

                    {/*https://www.npmjs.com/package/react-grid-system*/}
                    {/*https://sealninja.github.io/react-grid-system/#col*/}
                        <Row justify="around"  >
                        <EllipseH> 1 </EllipseH>
                        <EllipseH> 2 </EllipseH>
                        <EllipseH> 3 </EllipseH>
                        <EllipseH> 4 </EllipseH>
                        </Row>
                        <Row align="center"  >
                        <EllipseV>a</EllipseV>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[0]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[1]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[2]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[3]} alt={"pic"} width="150" />  </Col>
                        </Row>
                        {/*<br />*/}
                        <Row align="center" style={{ }} >
                        <EllipseV> b </EllipseV>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[4]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[5]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[6]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[7]} alt={"pic"} width="150" />  </Col>
                        </Row>
                        {/*<br />*/}
                        <Row align="center" style={{ }} >
                        <EllipseV> c </EllipseV>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[8]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[9]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[10]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[11]} alt={"pic"} width="150" />  </Col>
                        </Row>
                        {/*<br />*/}
                        <Row align="center" style={{ }} >
                        <EllipseV> d </EllipseV>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[12]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[13]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[14]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[15]} alt={"pic"} width="150" />  </Col>
                        </Row>
                        </Container>)
                    }

                    <Form>
                        <ButtonContainer>
                            <ButtonWhite
                                width="50%"
                                onClick={() => {
                                }}
                            >
                                Create Room
                            </ButtonWhite>
                        </ButtonContainer>
                        <ButtonContainer>
                            <ButtonWhite
                                width="50%"
                                onClick={() => {
                                }}
                            >
                                Join Room
                            </ButtonWhite>
                        </ButtonContainer>
                        <ButtonContainer>
                            <ButtonWhite
                                width="50%"
                                onClick={() => {
                                }}
                            >
                                Logout
                            </ButtonWhite>
                        </ButtonContainer>
                    </Form>


                </FormContainer>
            </BaseContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Game);
