import React from "react";
import styled from "styled-components";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import logo from "./assets/logoSmallSpaced.png";
import {withRouter } from 'react-router-dom'




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

// const Modal = () => (
//     <Popup trigger={<button className="button"> Open Modal </button>} modal>
//         <span> Modal content </span>
//     </Popup>
// );
//
// const contentStyle = { background: '#000' };
// const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
// const arrowStyle = { color: '#000' }; // style for an svg element

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
            <Popup
                trigger={<ButtonWhite className="button"> Help </ButtonWhite>} //https://react-popup.elazizi.com/react-modal
                modal
                nested
            >
                {close => (
                    <div className="modal"
                         style={{
                            overflow: 'auto',
                            minWidth: '20%',
                            // maxWidth: "100%",
                            minHeight: '20%',
                            maxHeight: "600px",
                         }}>

                        <button className="close" onClick={close}>
                            &times;
                        </button>
                        <div className="header">
                            Help Menu
                        </div>

                        <div className="content"
                            >
                            {' '}
                            {/*Rules taken from: https://boardgamegeek.com/boardgame/284108/pictures*/}
                            {/*Pictures*/}
                            <b>Introduction</b> <br />
                            <img src={logo} width={65} alt={""}/>
                            is a quick-playing family game with very simple rules. <br />
                            Form the image on your secret picture card with one set of components,
                            either shoelaces, color cubes, icon cards, sticks and stones or building blocks
                            in such a way that the other players guess what image you have pictured:<br />

                            1: You receive a secret picture card selected from 16 randomly selected picture cards, visible in a 4x4 grid.<br />
                            2: Then form that image with your building materials in such a way that it is recognizable.<br />
                            3: And finally guess what image each other player has pictured.<br />
                            The players get points for correctly guessing other players images and
                            for other players guessing their image. The most points after 5 Rounds wins!
                            <br />
                            <br />
                            <b>Gameflow</b> <br />
                            After registering you can either create or join a Gameroom, whose creator can then start a game with 3-5 people.<br />
                            A round starts by presenting you a 4x4 Grid of Pictures, one of which will then randomly be assigned to each player, but beware, two players
                            could potentially receive the same Picture! You can then recreate your secret picture using one of these 5 Material Sets, and afterwards it is your turn to guess which image the other players
                            recreated. You will then see the scores for the round, and the next round starts. After 5 rounds, you will proceed to the Winners Scoreboard, where you can
                            either choose to leave the game, or you can choose to rematch with the same players, which means that the current winners will only receive a restricted
                            version of Building Materials for the next 5 rounds.
                            <br />
                            <br />
                            <b>Gameplay</b> <br />
                            When interacting with your Building Material Set, you will receive a list of available pieces on the right of your Building Area. You can then
                            click on a piece once to toggle it, and therefore make it available in the Building Area, and a second click will remove it again.
                            Depending on the Material Set, you will see a hint at the bottom, which tells you exactly what pieces you may use.
                            Once you have a piece in your Building Area, you can use your preferred input method, either Touch or a Cursor, to drag them around freely.
                            The Building Area will handle any overflow that might occur, but make sure your final recreation is completely visible, as only a square image will be submitted
                            for you.
                            When it is your turn to submit your guesses, make sure to enter them in the format "A1", otherwise you will not receive points for them.


                        </div>
                        <div className="actions">
                            {/*<ButtonWhite*/}
                            {/*    // className="button"*/}
                            {/*    onClick={() => {*/}
                            {/*        close();*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    Back to the Dashboard*/}
                            {/*</ButtonWhite>*/}


                            <ButtonWhite
                                // className="button"
                                onClick={() => {
                                    // const history = useHistory();
                                    // console.log('modal closed ');
                                    close();
                                }}
                            >
                                Close Help Menu
                            </ButtonWhite>

                        </div>
                    </div>
                )}
            </Popup>


            {/*  <Title>Pictures!</Title>*/}
            {/*<ReactLogo width={60} height={60} />*/}
            {/*<div style={{float: 'right'}}>*/}
            {/*</div>*/}
        </Container>
    );
};

/**
 * Don't forget to export your component!
 */
export default Header;
