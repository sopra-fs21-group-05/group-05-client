import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 6px 0;
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 30px;
  font-weight: 300;
`;

const Score = styled.div`
  font-weight: 10;
  margin-left: 10px;
  text-align: center;
`;

const Id = styled.div`
  margin-left: auto;
  margin-right: 10px;
  text-align: center;
`;

const PlayerElement = ({ user, userName }) => {
    return (
        <Container>
            <Id>{userName}:</Id>
            <Score>{user[1]}  Points </Score>
        </Container>
    );
};

export default PlayerElement;