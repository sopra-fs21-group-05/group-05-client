import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import { withRouter } from 'react-router-dom';
import GameroomElement from "../../views/Player";
import logo from "../dashboard/logoSmall.png";
import {ButtonWhite} from "../../views/design/ButtonWhite";


const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Gamerooms = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const GameroomContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.0);
`;

class GameroomList extends React.Component {
    constructor() {
        super();
        this.state = {
            gamerooms: null,
        };
        this._isMounted = false;

    }

    async componentDidMount() {
        this._isMounted = true;
        this.pingGamerooms();
    }

    async componentWillUnmount(){
        this._isMounted = false;
    }

    async pingGamerooms(){
        if(this._isMounted){
            try {
                const response = await api.get('/gamerooms/list');
                await new Promise(resolve => setTimeout(resolve, 1000));
                this.setState({gamerooms: response.data});

                setTimeout(() => {
                    this.pingGamerooms();
                }, 750);

            } catch (error) {
                alert(`Something went wrong while fetching the gamerooms: \n${handleError(error)}`);
            }
        }
    }

    joinGameroom = (roomId) => {
        this.props.history.push(`list/${roomId}`)
    }

    render() {
        return (
            <FormContainer>
                <img src={logo} width={500} alt={""} />
                <h2>Gamerooms Overview </h2>
                {!this.state.gamerooms ? (
                    <Spinner />
                ) : (
                        <Gamerooms>
                            {this.state.gamerooms.map(gameroom => {
                                return (
                                    <GameroomContainer
                                        onClick={() => {
                                            this.joinGameroom(gameroom.id);
                                        }}
                                    >
                                        <GameroomElement gameroom={gameroom}/>
                                    </GameroomContainer>
                                );
                            })}
                        </Gamerooms>
                )}
                <ButtonContainer>
                    <ButtonWhite
                        width="100%"
                        onClick={() => {
                            this.props.history.push('/dashboard');
                        }}
                    >
                        Back
                    </ButtonWhite>
                </ButtonContainer>
            </FormContainer>
        );
    }
}

export default withRouter(GameroomList);
