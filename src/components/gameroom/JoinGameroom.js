import React from 'react';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import logo from "../dashboard/logoSmall.png";
import {ButtonWhite} from "../../views/design/ButtonWhite";

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
  background: rgba(255, 255, 255, 0.0);
`;

const Error = styled.label`
  color: red;
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 300;
`;

class JoinGameroom extends React.Component {
    constructor() {
        super();
        this.state = {
            password: null,
            errorMessage: null
        };
    }


    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    async joinGameroom() {
        try {
            const pathname = this.props.location.pathname;
            let roomId = pathname.match(/\d+(?!.*\d)/g)

            let userId = sessionStorage.getItem("loginId");

            const requestBody = JSON.stringify({
                roomId: roomId.toString(),
                password: this.state.password,
                userId: userId
            });

            const endpoint = 'gamerooms/list/' + roomId;
            const response = await api.put(endpoint, requestBody);

            sessionStorage.setItem('roomId', roomId.toString());
            this.props.history.push(`/gamerooms/overview/${roomId}`);

        } catch (error) {
            this.setState({errorMessage: handleError(error)});
        }
    }

    back(){
        this.props.history.push(`/gamerooms/list`);
    }

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    <img src={logo} width={700} alt={""} />
                    <Form>
                        <Label>Password</Label>
                        <InputField
                            type="password"
                            placeholder={this.state.password}
                            onChange={e => {
                                this.handleInputChange("password", e.target.value);
                            }}
                        />
                        { this.state.errorMessage &&
                        <Error>{this.state.errorMessage}</Error>}
                        <ButtonContainer>
                            <ButtonWhite
                                disabled={!this.state.password}
                                width="50%"
                                onClick={() => {
                                    this.joinGameroom();
                                }}
                            >
                                Join Gameroom
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
export default withRouter(JoinGameroom);
