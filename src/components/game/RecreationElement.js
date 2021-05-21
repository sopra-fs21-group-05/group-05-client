import {Col, Row} from "react-grid-system";
import styled from "styled-components";
import {Spinner} from "../../views/design/Spinner";

const Label = styled.label`
  color: black;
  margin-bottom: 10px;
`;

const RecreationElement = ({ recreation, userName }) => {
    return (
        <Col>
            <Row><Label> {userName}</Label></Row>
            {recreation[1].length <1 ? (
                //another column to offset the spinner, as it is not usually centered nicely
                <Row  justify="around">
                    <Col   xs={7} >  <Spinner />  </Col>
                </Row>
            ): (
                <Row> <img src={"data:image/jpg;base64," + recreation[1]} alt={""} width="180" /> </Row>
            )}
        </Col>
    );
};

export default RecreationElement;