import React from 'react';
import styled from "styled-components";
import {ButtonWhite} from "../../views/design/ButtonWhite";
import withRouter from "react-router-dom/es/withRouter";
import {api, handleError} from "../../helpers/api";
import logo from "../dashboard/logoSmall.png";
import PlayerElementWinner from "./PlayerElementWinner";


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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.0);
`;

const Players = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


class Winner extends React.Component {
    constructor() {
        super();
        this.state = {
            userPoints: {},
            userNames: {},
            creator: null,
            ping: true,
            winners: null,
            winnerString: null,
        };
    }

    handleError(message, error){
        if (window.confirm(message+" \n"+handleError(error)+"\n\nDo you want to go back to the Dashboard?")) {
            this.setState({ping: false});
            this.props.history.push(`/dashboard`);
        }
    }

    async componentDidMount() {
        let creator = sessionStorage.getItem('creator')
        this.setState({creator: creator})
        this.displayScoreboard();
    }

    async displayScoreboard() {
        try {
            let gameId = sessionStorage.getItem("gameId");
            const endpoint = 'scoreboards/' + gameId;
            const response = await api.get(endpoint);

            this.setState({userPoints: response.data.userPoints});
            this.setState({userNames: response.data.userNames});

            if(this.state.ping){
                setTimeout(() => {
                    if(this.state.userPoints == {}){
                        this.displayScoreboard();
                    }
                    this.getWinners();
                }, 1000);
            }

        }  catch (error) {
            this.handleError("Something went wrong while fetching the scoreboard: ", error);
        }

    }

    async getWinners(){
        if(this.state.winners==null){
            try {
                let gameId = sessionStorage.getItem("gameId");
                let response = await api.get(gameId+"/winner");
                await new Promise(resolve => setTimeout(resolve, 1000));

                this.setState({ winners: response.data});

                let winnerNames = []
                if(this.state.winners!==null){
                    for(let i = 0; i < this.state.winners.length; i++) {
                        winnerNames.push(this.state.winners[i].username);
                    }
                }

                //if there is only one winner, we display this user, else we create a string with the whole list
                //Formatting should be correct.
                if(winnerNames.length===1){
                    let string = winnerNames[0]+" has won the game, congratulations!";
                    this.setState({ winnerString: string});
                }else{
                    let string = "Users "+winnerNames[0];
                    for(let i = 1; i < winnerNames.length-1; i++) {
                        string = string + ", "+ winnerNames[i];
                    }
                    string = string + " and " + winnerNames[winnerNames.length-1] +" have won the game, congratulations!";
                    this.setState({ winnerString: string});
                }

            }  catch (error) {
                console.log("error while fetching winners: "+handleError(error));
            }
        }
    }

    async leaveGame() {
        try{
            let userId = sessionStorage.getItem('loginId');
            let roomId = sessionStorage.getItem('roomId');

            const endpoint = '/gamerooms/list/' + roomId + '/'+ userId;
            const response = await api.put(endpoint);

            sessionStorage.removeItem('roomId');
            sessionStorage.removeItem('creator');
            sessionStorage.removeItem('gameId');
            sessionStorage.removeItem('roundNr');

            this.setState({ping: false});
            this.props.history.push(`/dashboard`);
        }  catch (error) {
            this.handleError("Something went wrong while fetching the gameroom: ", error);
        }
    }

    async continue() {
        try{
            let roomId = sessionStorage.getItem('roomId');

            try{
                const endpoint = '/gamerooms/' + roomId;
                const response = await api.put(endpoint);
            }catch (e) {
                console.log("error while putting gameroom request: "+handleError(e));
            }


            sessionStorage.removeItem('gameId');
            sessionStorage.removeItem('roundNr');

            this.setState({ping: false});
            this.props.history.push(`/gamerooms/overview/${roomId}`);
        }  catch (error) {
            this.handleError("Something went wrong while fetching the gameroom: ", error);
        }
    }

    render() {
        return (
            <FormContainer>
                <img src={logo} width={700} alt={""}/>
                <h1>Final Ranking</h1>
                {this.state.winnerString ? (<h1>{this.state.winnerString}</h1>): ("")}
                <div>
                    <Players>
                        {Object.entries(this.state.userPoints).sort(([,a],[,b]) => b-a).map(user => {
                            return (
                                <PlayerContainer>
                                    <PlayerElementWinner user={user} userName={this.state.userNames[user[0]]}/>
                                </PlayerContainer>
                            );
                        })}
                    </Players>
                </div>
                <ButtonContainer>
                    <ButtonWhite
                        width="100%"
                        onClick={() => {
                            this.continue()
                        }}
                    >
                        Rematch with Restrictions for the Winner
                    </ButtonWhite>
                </ButtonContainer>
                <ButtonContainer>
                    <ButtonWhite
                        width="100%"
                        onClick={() => {
                            this.leaveGame()
                        }}
                    >
                       Exit
                    </ButtonWhite>
                </ButtonContainer>
            </FormContainer>
        );
    }
}

export default withRouter(Winner)

