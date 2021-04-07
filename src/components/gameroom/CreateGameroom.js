import React from 'react';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import logo from "../dashboard/logoSmall.png";
import {ButtonWhite} from "../../views/design/ButtonWhite";
import Gameroom from "../shared/models/Gameroom";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
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

const InputField = styled.input`
  &::placeholder {
    color: rgba(0, 0, 0, 1.0);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(153, 153, 153, 0.2);
  color: black;
`;

const Label = styled.label`
  color: black;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.2);
`;

const Boxes = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px solid #ffffff30;
  border-radius: 8px; 
`;

class CreateGameroom extends React.Component {
    constructor() {
        super();
        this.state = {
            gameroom: {},
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    async createGameroom() {
        try {
            const requestBody = JSON.stringify({
                roomname: this.state.roomname,
                password: this.state.password
            });

            const response = await api.post('/gamerooms', requestBody);

            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            const newResponse = await api.get('/gamerooms');

            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', newResponse.request.responseURL);
            console.log('status code:', newResponse.status);
            console.log('status text:', newResponse.statusText);
            console.log('requested data:', newResponse.data);

            this.setState({ gameroom: newResponse.data });

        } catch (error) {
            alert(`Something went wrong while creating the gameroom: \n${handleError(error)}`);
        }
    }

    back(){
        this.props.history.push(`/dashboard`);
    }

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    <img src={logo} width={300} />
                    <Form>
                        <Label>Roomname</Label>
                        <InputField
                            placeholder={this.state.gameroom.roomname}
                            onChange={e => {
                                this.handleInputChange("roomname", e.target.value);
                            }}
                        />
                        <Label>Password</Label>
                        <InputField
                            placeholder={this.state.gameroom.password}
                            onChange={e => {
                                this.handleInputChange("password", e.target.value);
                            }}
                        />
                        <ButtonContainer>
                            <ButtonWhite
                                width="50%"
                                onClick={() => {
                                    this.createGameroom();
                                    this.props.history.push(`/gamerooms/${this.state.roomId}`)
                                }}
                            >
                                Go to Gameroom
                            </ButtonWhite>
                        </ButtonContainer>
                        <ButtonContainer>
                            <ButtonWhite
                                width="50%"
                                onClick={() => {
                                    this.back();
                                }}
                            >
                                Back
                            </ButtonWhite>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}
export default withRouter(CreateGameroom);
