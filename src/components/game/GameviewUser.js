import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { ButtonWhite } from '../../views/design/ButtonWhite';
import {EllipseH} from "../../views/design/EllipseH";
import stick1 from "../game/assets/BuildingMaterials/SticksStones/stick1.png"


const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 700px;
  justify-content: center;
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
            picture: null,
            coordinates: null,
            materialSet: null
        }
    }

    async getPicture() {
        try {
            const response = await api.get('game/:gameId/:userId/picture');

            this.setState({picture: response.data.picture, coordinates: response.data.coordinates});

        } catch (error) {
            alert(`Something went wrong while getting the picture and material set: \n${handleError(error)}`);
        }
    }

    async getMaterialSet() {
        try {
            const response = await api.get('game/:gameId/:userId/set');

            this.setState({materialSet: response.data.materialSet})

        } catch (error) {
            alert(`Something went wrong while getting the picture and material set: \n${handleError(error)}`);
        }
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    componentDidMount() {}

    render() {
        return (
                <FormContainer>
                    <Container>
                        <Label>Coordinates</Label>
                        <EllipseH> {this.state.coordinates} </EllipseH>
                        <Form>
                            {this.state.picture}
                        </Form>
                    <ButtonContainer>
                        <ButtonWhite
                            width="100%"
                            onClick={() => {
                                this.getPicture();
                            }}
                        >
                            Get Picture
                        </ButtonWhite>
                    </ButtonContainer>
                    </Container>
                    <Container>
                        <Label>Recreate the Picture</Label>
                        <Form>
                            {/*buildingArea should be placed here*/}
                        </Form>
                    <ButtonContainer>
                        <ButtonWhite
                            width="100%"
                            onClick={() => {
                            }}
                        >
                            Submit
                        </ButtonWhite>
                    </ButtonContainer>
                    </Container>
                    <Container>
                        <Label>SetNr</Label>
                        <EllipseH> {this.state.materialSet} </EllipseH>
                        <Form>
                            {/*{this.showMaterialset}, the correct material set should be displayed to the user*/}
                        </Form>
                    <ButtonContainer>
                        <ButtonWhite
                            width="100%"
                            onClick={() => {
                                this.getMaterialSet();
                            }}
                        >
                            Get Material Set
                        </ButtonWhite>
                    </ButtonContainer>
                    </Container>
                </FormContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(GameviewUser);
