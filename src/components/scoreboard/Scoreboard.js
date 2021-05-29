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
            allGuessed: false,
            CreatorId: null,
            pingInterval: 750,
        };
    }

    handleError(message, error){
        try {
            if (window.confirm(message+" \n"+handleError(error)+"\n\nDo you want to go back to the Dashboard?")) {
                this.props.history.push(`/dashboard`);
            }
        }  catch (error) {}
        //catch will literally only happen if the user spams the back key in the browser, so we will ignore this, it will keep working nonetheless

    }

    confirmSubmitOverride(){
        if (window.confirm("It seems not all users have submitted their guesses, are you sure you want to proceed? \nIf you do so, these players will be left behind.")) {
            this.updateGame();
        }
    }

    async componentDidMount() {
        this.displayScoreboard();
        this.allGuessed();
        this.checkIfCreatorExists();

        sessionStorage.removeItem("picture");
        sessionStorage.removeItem("coordinate");
        sessionStorage.removeItem("setId");
    }

    componentWillUnmount(){
        this.setState({ping: false});

        if(sessionStorage.getItem('submitted')=="true" ){
            window.location.reload();
        }
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
                }, this.state.pingInterval);
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
            }, this.state.pingInterval);
        }

        if(this.state.allGuessed === true){
            this.setState({pingAllGuessed: false})
        }
    }

    getRoundText(){
        if(sessionStorage.getItem("roundNr") == 5){
            return "Final Ranking"
        }
        return "Play next round"
    }

    async pingNewRound(){
        try {
            let gameId = sessionStorage.getItem('gameId');

            const endpoint = 'game/round/' + gameId;
            const response = await api.get(endpoint);

            let actualRoundNr = sessionStorage.getItem('roundNr');
            let updateRoundNr = response.data;

            if(updateRoundNr.toString() !== actualRoundNr.toString()){
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

    async checkIfCreatorExists(){
        try {
            if(this.state.ping){
                let roomId = sessionStorage.getItem('roomId');
                const endpoint = "gamerooms/overview/" + roomId;
                const response = await api.get(endpoint);

                await new Promise(resolve => setTimeout(resolve, 1000));
                this.setState({ CreatorId: response.data.creator});

                let userId = sessionStorage.getItem('loginId');
                if (userId.toString() === this.state.CreatorId.toString()){
                    sessionStorage.setItem('creator', 'yes');
                    this.setState({creator: sessionStorage.getItem('creator')})
                }

                setTimeout(() => {
                    this.checkIfCreatorExists();
                }, this.state.pingInterval);
            }

        }  catch (error) {
            this.handleError(error);
        }
    }

    render() {
        return (
            <FormContainer>
                <img src={logo} width={700} alt={""}/>
                <h1>Overview of Round {sessionStorage.getItem("roundNr")}</h1>
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
                    { this.state.allGuessed === false ? (
                        <ButtonWhite
                            disabled={this.state.creator == null}
                            width="100%"
                            style={{opacity: 0.4}}
                            onClick={() => {
                                this.confirmSubmitOverride();
                            }}
                        >
                            {this.getRoundText()}
                        </ButtonWhite>
                    ): (
                        <ButtonWhite
                            disabled={this.state.creator == null}
                            width="100%"
                            onClick={() => {
                                this.updateGame();
                            }}
                        >
                            {this.getRoundText()}
                        </ButtonWhite>
                    )}
                </ButtonContainer>
            </FormContainer>
        );
    }
}

export default withRouter(Scoreboard)

