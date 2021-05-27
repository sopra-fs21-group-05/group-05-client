import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../../views/design/Spinner';
import { withRouter } from 'react-router-dom';
import GameroomElement from "../../views/Player";
import logo from "../dashboard/logoSmall.png";
import {ButtonWhite} from "../../views/design/ButtonWhite";
import {Col, Row} from "react-grid-system";

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

    handleError(error){
        if (window.confirm("Something went wrong while getting the picture and material set: \n"+handleError(error)+"\n\nDo you want to go back to the Dashboard?")) {
            this.props.history.push(`/dashboard`);
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        this.pingGamerooms();
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    checkRooms(){
        if(this.state.gamerooms==null){
            return false;
        }
        return this.state.gamerooms.length >= 1;

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
                this.handleError(error);
            }
        }
    }

    joinGameroom = (roomId) => {
        this.props.history.push(`list/${roomId}`)
    }

    render() {
        return (
            <FormContainer>
                <img src={logo} width={700} alt={""} />
                <h2>Gamerooms Overview </h2>
                {!this.checkRooms() ? (
                    <Row  justify="around">
                        <Col>  <Spinner />  </Col>
                    </Row>
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
