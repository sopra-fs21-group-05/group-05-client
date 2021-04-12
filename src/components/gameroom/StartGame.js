import React from 'react';
import styled from "styled-components";
import {ButtonWhite} from "../../views/design/ButtonWhite";
import withRouter from "react-router-dom/es/withRouter";
import {api, handleError} from "../../helpers/api";
import {BaseContainer} from "../../helpers/layout";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
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

class StartGame extends React.Component {
    state = {
        id: null,
        roomname: null
    };

    async componentDidMount() {
        try {
            const pathname = this.props.location.pathname;

            const response = await api.get(pathname);

            await new Promise(resolve => setTimeout(resolve, 1000));

            this.setState({ id: response.data.id, roomname: response.data.roomname });

        }  catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }

    }

    render() {
        return (
            <Container>
                <h1>Gameroom</h1>
                    <div>
                        <Boxes>
                            {"Id:"}   {this.state.id}
                        </Boxes>
                        <Boxes>
                            {"Roomname:"}   {this.state.roomname}
                        </Boxes>
                        <Boxes>
                        </Boxes>
                        //<ButtonContainer>
                            <ButtonWhite
                                width="50%"
                               onClick={() => {
                                    this.window.reload()
                                }}
                            >
                                Start Game
                            </ButtonWhite>
                        </ButtonContainer>
                    </div>
            </Container>
        );
    }
}

export default withRouter(StartGame)

