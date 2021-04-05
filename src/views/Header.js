import React from "react";
import styled from "styled-components";
import { ReactLogo } from "./ReactLogo";
import helpIcon from "./assets/help.png"


/**
 * Using styled-components you can visual HTML primitives and use props with it!
 * The idea behind this external package, it's to have a better structure and overview for your HTML and CSS
 * Using styled-components, you can have styling conditions using the following syntax: ${props => ...}
 * https://www.styled-components.com/
 */
const Container = styled.div`
  height: ${props => props.height}px;
  background: ${props => props.background};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  
`;

const Title = styled.h1`
  font-weight: bold;
  color: black;
  text-align: center;
`;

const ButtonWhite = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  text-align: center;
  color: rgba(0, 0, 0, 1);
  width: ${props => props.width || null};
  height: 35px;

  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};


  transition: all 0.3s ease;
    background: #FFFFFF;
    border: 1px solid #FFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 14px;
`;

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Header = props => {
    return (
        <Container height={props.height}>
            {/*  <Title>Pictures!</Title>*/}
            {/*<ReactLogo width={60} height={60} />*/}
            <div style={{float: 'right'}}>
                <ButtonWhite>
                    Help
                    {/*<img src={helpIcon} width={60} height={60}/>*/}
                </ButtonWhite>
            </div>
        </Container>
    );
};

/**
 * Don't forget to export your component!
 */
export default Header;
