import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null
    };
  }

  logout() {
    localStorage.removeItem('token');
    this.props.history.push('/login');
  }

  render() {
    return (
      <Container>
        <h2>Pictures </h2>
          <div>
            <Button
                width="100%"
                onClick={() => {
                  this.props.history.push(`/gamerooms`);
                }}
            >
              Create Room
            </Button>
            <Button
                width="100%"
                onClick={() => {
                  //method for checking game room credentials
                }}
            >
              Join Room
            </Button>
            <Button
              width="100%"
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(Game);
