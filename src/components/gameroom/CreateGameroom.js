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


class CreateGameroom extends React.Component {
    constructor() {
        super();
        this.state = {
            roomname: null,
            password: null,
        };
    }

    async createGameroom() {
        try {
            let userId = sessionStorage.getItem("loginId");

            const requestBody = JSON.stringify({
                roomname: this.state.roomname,
                password: this.state.password,
                userId: userId
            });

            const response = await api.post('/gamerooms', requestBody);

            let roomId = response.data.match(/\d+(?!.*\d)/g)
            sessionStorage.setItem('roomId', roomId);
            sessionStorage.setItem('creator', 'yes');

            this.props.history.push(`/gamerooms/overview/${roomId}`);

        } catch (error) {
            alert(`Something went wrong while creating the gameroom: \n${handleError(error)}`);
        }
    }

    back(){
        this.props.history.push(`/dashboard`);
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {}

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    <img src={logo} width={300} />
                    <Form>
                        <Label>Roomname</Label>
                        <InputField
                            placeholder={this.state.roomname}
                            onChange={e => {
                                this.handleInputChange("roomname", e.target.value);
                            }}
                        />
                        <Label>Password</Label>
                        <InputField
                            type="password"
                            placeholder={this.state.password}
                            onChange={e => {
                                this.handleInputChange("password", e.target.value);
                            }}
                        />
                        <ButtonContainer>
                            <ButtonWhite
                                width="80%"
                                onClick={() => {
                                    this.createGameroom();
                                }}
                            >
                                Create Gameroom
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
