import React from 'react';
import styled from "styled-components";
import {ButtonWhite} from "../../views/design/ButtonWhite";
import withRouter from "react-router-dom/es/withRouter";
import {api, handleError} from "../../helpers/api";
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
`;

const Boxes = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px solid #ffffff30;
  margin-top: 20px;
  border-radius: 15px; 
`;


class Scoreboard extends React.Component {
    constructor() {
        super();
        this.state = {
            userPoints: {},
            userPoints_keys: {},
            creator: null,
            ping: true,
        };
    }

    async componentDidMount() {
        let creator = sessionStorage.getItem('creator')
        this.setState({creator: creator})
    }

    async displayScoreboard() {
        try {
            const pathname = this.props.location.pathname;
            const response = await api.get(pathname);

            this.setState({userPoints: response.data.userPoints})
            var keys = Object.keys(this.state.userPoints);
            this.setState({userPoints_keys: keys})
            this.pingNewRound();

            // if(this.state.ping){
            //     setTimeout(() => {
            //         this.displayScoreboard();
            //     }, 1000);
            // }

        }  catch (error) {
            alert(`Something went wrong while fetching the scoreboard: \n${handleError(error)}`);
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
            this.props.history.push(`/game/view/grid/${gameId}`);

        }  catch (error) {
            alert(`Something went wrong while fetching the new game: \n${handleError(error)}`);
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
                this.props.history.push(`/game/view/grid/${gameId}`);
            }

        }  catch (error) {
            alert(`Something went wrong while fetching the next round: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <FormContainer>
                <img src={logo} width={700} />
                <h1>Overview Points</h1>
                <Form>
                <Boxes> UserId {this.state.userPoints_keys[0]} : {this.state.userPoints[this.state.userPoints_keys[0]]} Points </Boxes>
                <Boxes> UserId {this.state.userPoints_keys[1]} : {this.state.userPoints[this.state.userPoints_keys[1]]} Points </Boxes>
                <Boxes> UserId {this.state.userPoints_keys[2]} : {this.state.userPoints[this.state.userPoints_keys[2]]} Points </Boxes>
                <Boxes> UserId {this.state.userPoints_keys[3]} : {this.state.userPoints[this.state.userPoints_keys[3]]} Points </Boxes>
                <Boxes> UserId {this.state.userPoints_keys[4]} : {this.state.userPoints[this.state.userPoints_keys[4]]} Points </Boxes>
                </Form>
                <ButtonContainer>
                    <ButtonWhite
                        width="100%"
                        onClick={() => {
                            this.displayScoreboard();
                        }}
                    >
                        Update Scoreboard
                    </ButtonWhite>
                </ButtonContainer>
                <ButtonContainer>
                    <ButtonWhite
                        disabled={this.state.creator == null}
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

