import React from 'react';
import styled from "styled-components";
import {ButtonWhite} from "../../views/design/ButtonWhite";
import withRouter from "react-router-dom/es/withRouter";
import {api, handleError} from "../../helpers/api";
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
            users: null,
            startedGame: null,
            creator: null,
            ping: true,
            creatorId: null
        };
    }

    async componentDidMount() {
        this.pingPlayerCount(0);
        this.checkIfCreatorExists();
    }

    componentWillUnmount(){
        this.setState({ping: false});
    }

    async pingPlayerCount(){
        try {
            if(this.state.ping){
                const pathname = this.props.location.pathname;
                const response = await api.get(pathname);
                // await new Promise(resolve => setTimeout(resolve, 1000));
                this.setState({ id: response.data.id, roomname: response.data.roomname, users: response.data.users, startedGame: response.data.startedGame});

                if(this.state.startedGame!==null){
                    let gameId = response.data.startedGame
                    sessionStorage.setItem('gameId', gameId);
                    sessionStorage.setItem('roundNr', '1');

                    this.setState({ping: false});
                    this.props.history.push(`/game/view/grid/${gameId}`);
                }

                //ping the gameroom over and over again
                setTimeout(() => {
                    this.pingPlayerCount();
                }, 750);
            }

        }  catch (error) {
            this.handleError(error);
        }
    }

    //check how many players there are, if null or less than 3 we cant start,
    //if 5 or less, we can
    canStart(){
        if( this.state.users === null){ //null check to prevent errors if the request has not yet returned at the start
            return false;
        }
        if( this.state.users.length<3){
            return false;
        }
        return this.state.users.length <= 5;
    }

    handleError(error){
        if (window.confirm("Something went wrong while fetching the gameroom: \n"+handleError(error)+"\n\nDo you want to go back to the Dashboard?")) {
            this.props.history.push(`/dashboard`);
        }
    }

    async startGameCall() {
        if(this.state.creator !== null){
            try{
                const response = await api.put('/gamerooms/overview/'+this.state.id);

                sessionStorage.setItem('gameId', response.data);
                sessionStorage.setItem('roundNr', '1')

                this.setState({ping: false});

                //now redirect to the game
                this.props.history.push(`/game`);
            }  catch (error) {
                this.handleError(error);
            }
        }
    }

    async leaveRoom() {
        try{
            let userId = sessionStorage.getItem('loginId');
            const endpoint = '/gamerooms/list/' + this.state.id + '/'+ userId;
            const response = await api.put(endpoint);

            sessionStorage.removeItem('roomId');
            sessionStorage.removeItem('creator');

            this.setState({ping: false});
            this.props.history.push(`/dashboard`);
        }  catch (error) {
            this.handleError(error);
        }
    }

    async checkIfCreatorExists(){
        try {
            if(this.state.ping){
                const pathname = this.props.location.pathname;
                const response = await api.get(pathname);

                // await new Promise(resolve => setTimeout(resolve, 1000));
                this.setState({ CreatorId: response.data.creator});

                let userId = sessionStorage.getItem('loginId');
                if (userId.toString() === this.state.CreatorId.toString()){
                    sessionStorage.setItem('creator', 'yes');
                    this.setState({creator: sessionStorage.getItem('creator')})
                }

                setTimeout(() => {
                    this.checkIfCreatorExists();
                }, 750);
            }

        }  catch (error) {
            this.handleError(error);
        }
    }


    render() {
        return (
                <FormContainer>
                <img src={logo} width={700} alt={""} />
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
                            disabled={!this.canStart() || this.state.creator == null}
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
                            width="100%"
                            onClick={() => {
                                this.leaveRoom();
                            }}
                        >
                            Leave Gameroom
                        </ButtonWhite>
                    </ButtonContainer>
                </FormContainer>
        );
    }
}

export default withRouter(StartGame)

