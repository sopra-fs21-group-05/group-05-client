import {Col, Row} from "react-grid-system";
import styled from "styled-components";

// const Container = styled.div`
//   margin: 6px 0;
//   width: 280px;
//   padding: 10px;
//   border-radius: 6px;
//   display: flex;
//   align-items: center;
//   border: 1px solid #ffffff26;
// `;

const Label = styled.label`
  color: black;
  margin-bottom: 10px;
`;

// const InputField = styled.input`
//   &::placeholder {
//     color: rgba(0, 0, 0, 1.0);
//   }
//   text-transform: uppercase;
//   height: 35px;
//   padding-left: 5px;
//   margin-left: 0px;
//   margin-right: 5px;
//   border: none;
//   border-radius: 10px;
//   margin-bottom: 10px;
//   background: rgba(153, 153, 153, 0.2);
//   color: black;
// `;

const RecreationElement = ({ recreation }) => {
    return (
        <Col>
            <Row><Label> UserId {recreation[0]}</Label></Row>
            <Row> <img src={"data:image/jpg;base64," + recreation[1]} alt={"pic"} width="180" /> </Row>
        </Col>
    );
};

export default RecreationElement;