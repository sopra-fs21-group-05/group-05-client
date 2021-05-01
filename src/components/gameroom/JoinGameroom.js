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

class JoinGameroom extends React.Component {
    constructor() {
        super();
        this.state = {
            password: null,
        };
    }


    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    async joinGameroom() {
        try {
            const pathname = this.props.location.pathname;
            let numb = pathname.match(/\d/g);

            let userId = sessionStorage.getItem("loginId");
            console.log('roomId:', numb)

            const requestBody = JSON.stringify({
                roomId: numb.toString(),
                password: this.state.password,
                userId: userId
            });

            const endpoint = 'gamerooms/list/' + numb.toString();

            const response = await api.put(endpoint, requestBody);

            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            sessionStorage.setItem('roomId', numb.toString());

            this.props.history.push(`/gamerooms/overview/${numb}`);

        } catch (error) {
            alert(`Something went wrong while joining the gameroom: \n${handleError(error)}`);
        }
    }

    back(){
        this.props.history.push(`/gamerooms/list`);
    }

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    <img src={logo} width={700} />
                    <Form>
                        <Label>Password</Label>
                        <InputField
                            placeholder={this.state.password}
                            onChange={e => {
                                this.handleInputChange("password", e.target.value);
                            }}
                        />
                        <ButtonContainer>
                            <ButtonWhite
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
