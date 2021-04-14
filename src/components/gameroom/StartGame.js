import React from 'react';
import styled from "styled-components";
import {ButtonWhite} from "../../views/design/ButtonWhite";
import withRouter from "react-router-dom/es/withRouter";
import {api, handleError} from "../../helpers/api";
import {BaseContainer} from "../../helpers/layout";
import logo from "../dashboard/logoSmall.png";
import Users from "../../views/Users";
import {Spinner} from "../../views/design/Spinner";


const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
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

const User = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const UserContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class StartGame extends React.Component {
    constructor() {
        super();
        this.state = {
            id: null,
            roomname: null,
            users: null
        };
    }

    async componentDidMount() {
        try {
            const pathname = this.props.location.pathname;

            const response = await api.get(pathname);

            await new Promise(resolve => setTimeout(resolve, 1000));

            this.setState({ id: response.data.id, roomname: response.data.roomname, users: response.data.users });

        }  catch (error) {
            alert(`Something went wrong while fetching the gameroom: \n${handleError(error)}`);
        }

    }

    render() {
        return (
                <FormContainer>
                <img src={logo} width={700} />
                <h1>Gameroom Overview</h1>
                        <Boxes>
                            {"Id:"}   {this.state.id}
                        </Boxes>
                        <Boxes>
                            {"Roomname:"}   {this.state.roomname}
                        </Boxes>
                    {!this.state.users ?(
                        <Spinner />
                        ) : (
                        <User>
                            {this.state.users.map(user => {
                                return (
                                    <UserContainer>
                                        <Users user={user} />
                                    </UserContainer>
                                );
                            })}
                        </User>
                        )}
                    <ButtonContainer>
                        <ButtonWhite
                            width="100%"
                            onClick={() => {
                            }}
                        >
                            Start Game
                        </ButtonWhite>
                    </ButtonContainer>
                </FormContainer>
        );
    }
}

export default withRouter(StartGame)

