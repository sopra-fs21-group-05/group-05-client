import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 6px 0;
  width: 280px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
`;

const Score = styled.div`
  font-weight: lighter;
  margin-left: 10px;
`;

const Id = styled.div`
  margin-left: auto;
  margin-right: 10px;
`;

const PlayerElement = ({ user }) => {
    return (
        <Container>
            <Id>UserId {user[0]}:</Id>
            <Score>{user[1]}  Points </Score>
        </Container>
    );
};

export default PlayerElement;