import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import {ButtonWhite} from "../../views/design/ButtonWhite";
import logo from "../dashboard/logoSmall.png";

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


class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            errorMessage: null
        };
    }

    async register() {
        try {
            const requestBody = JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            });

            const response = await api.post('/users', requestBody);
            const newResponse = await api.put('/login', requestBody);

            // Get the returned user and update a new object.
            const user = new User(newResponse.data);

            // Store the token into the local storage.
            sessionStorage.setItem('token', user.token);
            sessionStorage.setItem('loginId', user.id);

            alert("You are now registered!")

            // Login successfully worked --> navigate to the route /game in the GameRouter
            this.props.history.push('/dashboard');
        } catch (error) {
            this.setState({errorMessage: handleError(error)});
        }
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    componentDidMount() {}

    render(){
        return (
            <BaseContainer>
                <FormContainer>
                    <img src={logo} width={700} alt={""}/>
                    <Form>
                        <Label>Username</Label>
                        <InputField
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('username', e.target.value);
                            }}
                        />
                        <Label>Password</Label>
                        <InputField
                            type="password"
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('password', e.target.value);
                            }}
                        />
                        { this.state.errorMessage &&
                        <Error>{this.state.errorMessage}</Error>}
                        <ButtonContainer>
                            <ButtonWhite
                                disabled={!this.state.username || !this.state.password}
                                width="50%"
                                onClick={() => {
                                    this.register();
                                }}
                            >
                                Confirm registration
                            </ButtonWhite>
                        </ButtonContainer>
                        <ButtonContainer>
                            <ButtonWhite
                                width="50%"
                                onClick={() => {
                                    this.props.history.push('/login');
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
export default withRouter(Register);