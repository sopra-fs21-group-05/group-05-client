import React from 'react';
import styled from "styled-components";
import {ButtonWhite} from "../../views/design/ButtonWhite";
import withRouter from "react-router-dom/es/withRouter";
import {api, handleError} from "../../helpers/api";
import logo from "../dashboard/logoSmall.png";
import PlayerElement from "./PlayerElement";


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
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.0);
`;

const Players = styled.ul`
  list-style: none;
  padding-left: 0;
  text-align: center;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


class Scoreboard extends React.Component {
    constructor() {
        super();
        this.state = {
            userPoints: {},
            userNames: {},
            creator: null,
            ping: true,
            winners: null,
            winnerString: null,
            pingAllGuessed: true,
            allGuessed: false
        };
    }

    handleError(message, error){
        if (window.confirm(message+" \n"+handleError(error)+"\n\nDo you want to go back to the Dashboard?")) {
            this.props.history.push(`/dashboard`);
        }
    }

    async componentDidMount() {
        let creator = sessionStorage.getItem('creator')
        this.setState({creator: creator})
        this.displayScoreboard();
        this.allGuessed();
    }

    async displayScoreboard() {
        try {
            const pathname = this.props.location.pathname;
            const response = await api.get(pathname);

            this.setState({userPoints: response.data.userPoints});
            this.setState({userNames: response.data.userNames});

            this.pingNewRound();

            if(this.state.ping){
                setTimeout(() => {
                    this.displayScoreboard();
                }, 1000);
            }

        }  catch (error) {
            this.handleError("Something went wrong while fetching the scoreboard: ", error);
        }

    }

    async updateGame(){
        try {
            let gameId = sessionStorage.getItem("gameId");
            const endpoint = 'game/' + gameId;

            const response = await api.put(endpoint);
            await new Promise(resolve => setTimeout(resolve, 1000));

            let roundNr = response.data;
            sessionStorage.setItem('roundNr', roundNr);
            this.setState({ping: false});

            //if we are in the final round, redirect to the winner screen instead of the next round
            if(roundNr === 6){
                this.props.history.push(`/game/ranking/winners/${gameId}`);
            }else{
                this.props.history.push(`/game/view/grid/${gameId}`);
            }

        }  catch (error) {
            this.handleError("Something went wrong while fetching the new game: "+ handleError(error));
        }
    }

    async allGuessed(){
        let gameId = sessionStorage.getItem("gameId");
        const endpoint = 'game/guesses/' + gameId;

        const response = await api.get(endpoint);
        await new Promise(resolve => setTimeout(resolve, 1000));

        this.setState({allGuessed: response.data})

        if(this.state.pingAllGuessed){
            setTimeout(() => {
                this.allGuessed();
            }, 1000);
        }

        if(this.state.allGuessed === true){
            this.setState({pingAllGuessed: false})
        }
    }

    async pingNewRound(){
        try {
            let gameId = sessionStorage.getItem('gameId');

            const endpoint = 'game/round/' + gameId;
            const response = await api.get(endpoint);

            let actualRoundNr = sessionStorage.getItem('roundNr');
            let updateRoundNr = response.data;

            if(updateRoundNr.toString() !== actualRoundNr.toString()){
                console.log("detected new roundNr, next round starting");
                sessionStorage.setItem('roundNr', updateRoundNr);

                this.setState({ping: false});

                if(updateRoundNr === 6){
                    this.props.history.push(`/game/ranking/winners/${gameId}`);
                }else{
                    this.props.history.push(`/game/view/grid/${gameId}`);
                }
            }

        }  catch (error) {
            this.handleError("Something went wrong while fetching the next round:", error);
        }
    }

    render() {
        return (
            <FormContainer>
                <img src={logo} width={700} alt={""}/>
                <h1>Overview after Round {sessionStorage.getItem("roundNr")}</h1>
                {this.state.winnerString ? (<h1>{this.state.winnerString}</h1>): ("")}

                <div>
                    <Players>
                        {Object.entries(this.state.userPoints).sort(([,a],[,b]) => b-a).map(user => {
                            return (
                                <PlayerContainer>
                                    <PlayerElement user={user} userName={this.state.userNames[user[0]]}/>
                                </PlayerContainer>
                            );
                        })}
                    </Players>
                </div>
                <ButtonContainer>
                    <ButtonWhite
                        disabled={this.state.creator == null || this.state.allGuessed === false}
                        width="100%"
                        onClick={() => {
                            this.updateGame();
                        }}
                    >
                        Play next round
                    </ButtonWhite>
                </ButtonContainer>

            </FormContainer>
        );
    }
}

export default withRouter(Scoreboard)

