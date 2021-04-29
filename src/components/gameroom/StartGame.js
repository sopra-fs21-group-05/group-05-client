import React from 'react';
import styled from "styled-components";
import {ButtonWhite} from "../../views/design/ButtonWhite";
import withRouter from "react-router-dom/es/withRouter";
import {api, handleError} from "../../helpers/api";
import {BaseContainer} from "../../helpers/layout";
import logo from "../dashboard/logoSmall.png";
import Users from "../../views/Users";
import {Spinner} from "../../views/design/Spinner";
import {Col, Container, Row, setConfiguration} from 'react-grid-system';



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
            users: null,
            startedGame: null
        };
    }

    async componentDidMount() {
        console.log("starting ComponentDidMount");
        this.pingPlayerCount();

    }

    async pingPlayerCount(){
        try {
            const pathname = this.props.location.pathname;
            const response = await api.get(pathname);
            console.log(response.data);
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.setState({ id: response.data.id, roomname: response.data.roomname, users: response.data.users, startedGame: response.data.startedGame});
            console.log(this.state.startedGame)
            console.log("playerCount updated");

            if(this.state.startedGame!==null){
                console.log("detected gameId, starting")
                this.startGameCall();
            }

        }  catch (error) {
            alert(`Something went wrong while fetching the gameroom: \n${handleError(error)}`);
        }
    }

    //check how many players there are, if null or less than 3 we cant start,
    //if 5 we start automatically, else the button is enabled and we can start if we want
    canStart(){
        if( this.state.users === null){ //null check to prevent errors if the request has not yet returned at the start
            return false;
        }
        if( this.state.users.length<3){
            return false;
        }
        if(this.state.users.length >= 5){ //should never be more than 5 but whatever
            this.startGameCall();
        }
        return true;

    }

    async startGameCall() {
        try{
            const response = await api.put('/gamerooms/overview/'+this.state.id);

            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            localStorage.setItem('gameId', response.data);

            //now redirect to the game
            this.props.history.push(`/game`);
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
                            // we wait for a list of users that is not null and at least three players long
                            disabled={!this.canStart() }
                            width="100%"
                            onClick={() => {
                                this.startGameCall();
                            }}
                        >
                            Start Game
                        </ButtonWhite>
                    </ButtonContainer>

                    <ButtonContainer>
                        <ButtonWhite
                            // manually ping the playercount as automatically pinging caused memory leaks in the infinite loop
                            width="100%"
                            onClick={() => {
                                this.pingPlayerCount();
                            }}
                        >
                           Update Players
                        </ButtonWhite>
                    </ButtonContainer>

                </FormContainer>
        );
    }
}

export default withRouter(StartGame)

