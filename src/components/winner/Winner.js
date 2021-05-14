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
            creator: null,
            ping: true,
            winners: null,
            winnerString: null,
        };
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
            // var keys = Object.keys(this.state.userPoints);
            // this.setState({userPoints_keys: keys});

            if(this.state.ping){
                setTimeout(() => {
                    // console.log("pinging scoreboard")
                    // console.log("roundnumber: "+sessionStorage.getItem("roundNr"));
                    this.displayScoreboard();
                    this.getWinners();

                }, 1000);
            }

        }  catch (error) {
            alert(`Something went wrong while fetching the scoreboard: \n${handleError(error)}`);
        }

    }

    async getWinners(){
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
                //todo: sometimes this gives an error, not sure if we should react to it or just ignore it, as this is only displayed at the end

                // alert(`Something went wrong while getting the winners: \n${handleError(error)}`);
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

            this.props.history.push(`/dashboard`);
        }  catch (error) {
            alert(`Something went wrong while fetching the gameroom: \n${handleError(error)}`);
        }
    }

    async continue() {
        try{
            let roomId = sessionStorage.getItem('roomId');

            sessionStorage.removeItem('gameId');
            sessionStorage.removeItem('roundNr');

            this.props.history.push(`/gamerooms/overview/${roomId}`);
        }  catch (error) {
            alert(`Something went wrong while fetching the gameroom: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <FormContainer>
                <img src={logo} width={700} alt={""}/>
                <h1>Final Ranking</h1>
                {this.state.winnerString ? (<h1>{this.state.winnerString}</h1>): ("")}
                <Form>
                    <Players>
                        {Object.entries(this.state.userPoints).sort(([,a],[,b]) => b-a).map(user => {
                            return (
                                <PlayerContainer>
                                    <PlayerElementWinner user={user}/>
                                </PlayerContainer>
                            );
                        })}
                    </Players>
                </Form>
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

