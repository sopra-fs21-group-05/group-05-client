import React from "react";
import styled from "styled-components";
import { ReactLogo } from "./ReactLogo";
import helpIcon from "./assets/help.png"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import logo from "./assets/logoSmallSpaced.png";


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

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 30px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(0, 0, 0, 1.0);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(153, 153, 153, 0.2);
  color: black;
`;

const Label = styled.label`
  color: black;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.2);
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

const Modal = () => (
    <Popup trigger={<button className="button"> Open Modal </button>} modal>
        <span> Modal content </span>
    </Popup>
);

const contentStyle = { background: '#000' };
const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
const arrowStyle = { color: '#000' }; // style for an svg element

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
            {/*<Popup trigger={ //taken from https://www.npmjs.com/package/reactjs-popup*/}
            {/*            <ButtonWhite>*/}
            {/*            Help   /!*<img src={helpIcon} width={60} height={60}/>*!/*/}
            {/*            </ButtonWhite>*/}
            {/*        } position="left">*/}
            {/*    /!*<div>Popup content here !!</div>*!/*/}
            {/*    <Form> Modal content </Form>*/}
            {/*</Popup>*/}


            {/*<Popup trigger={<button>Trigger</button>} position="top left"> //https://react-popup.elazizi.com/getting-started*/}
            {/*    {close => (*/}
            {/*        <div>*/}
            {/*            Content here*/}
            {/*            <a className="close" onClick={close}>*/}
            {/*                &times;*/}
            {/*            </a>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</Popup>*/}

            {/*<Popup*/}
            {/*    trigger={open => (*/}
            {/*        <button className="button">Trigger - {open ? 'Opened' : 'Closed'}</button> //https://react-popup.elazizi.com/component-api*/}
            {/*    )}*/}
            {/*    position="right center"*/}
            {/*    closeOnDocumentClick*/}
            {/*>*/}
            {/*    <span> Popup content </span>*/}
            {/*</Popup>;*/}

            <Popup
                trigger={<ButtonWhite className="button"> Help </ButtonWhite>} //https://react-popup.elazizi.com/react-modal
                modal
                nested
            >
                {close => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                        <div className="header">
                            Help Menu
                        </div>

                        <div className="content">
                            {' '}
                            {/*Rules taken from: https://boardgamegeek.com/boardgame/284108/pictures*/}
                            {/*Pictures*/}
                            <img src={logo} width={65} />
                            is a quick-playing family game with very simple rules. <br />
                            Form the image on your secret picture card with one set of components,
                            either shoelaces, color cubes, icon cards, sticks and stones or building blocks
                            in such a way that the other players guess what image you have pictured:<br />

                            1: You receive a secret picture card selected from 16 randomly selected picture cards, visible in a 4x4 grid.<br />
                            2: Then form that image with your building materials in such a way that it is recognizable.<br />
                            3: And finally guess what image each other player has pictured.<br /><br />

                            The players get points for correctly guessing other players images and
                            for other players guessing their image. The most points after 5 Rounds wins!
                        </div>
                        <div className="actions">
                            {/*<Popup*/}
                            {/*    trigger={<ButtonWhite className="button"> Rules </ButtonWhite>}*/}
                            {/*    position="top center"*/}
                            {/*    nested*/}
                            {/*>*/}
                            {/*<span>*/}
                            {/*    Game Rules:<br />*/}
                            {/*  The game includes 5 diﬀerent sets of Objects, 91 photo cards andcoordinate*/}
                            {/*tokens.<br />*/}
                            {/*Preparation for a Game: 16 randomly selected picture cards are placed in a*/}
                            {/*4x4grid marked with coordinates.<br />*/}
                            {/*Each person is assigned a random set and the not usedsets are kept on the*/}
                            {/*side for later use.<br />*/}
                            {/*Playing a Round: Each player gets a random coordinatefor a photo that they*/}
                            {/*then have to mimic with their set. After that, all players guess*/}
                            {/*which pictures the others recreated. For every correctly guessed picture, the*/}
                            {/*player that created it and the player that guessed it gets a point. Then the sets are*/}
                            {/*moved to*/}
                            {/*the next player and the next round starts.*/}
                            {/*<br />*/}
                            {/*The game ends after every player had everyset once, so after 5 rounds.*/}
                            {/*There is an additional feature to the game: when a playerreaches a certain*/}
                            {/*amount of points, their subsequent rounds are going to be harder,*/}
                            {/*in the sense that the sets they get are restricted in some way. For more*/}
                            {/*informationplease refer to the rules.*/}
                            {/*</span>*/}
                            {/*</Popup>*/}

                            {/*<Popup*/}
                            {/*    trigger={<ButtonWhite className="button"> Detailed Rules </ButtonWhite>}*/}
                            {/*    position="top center"*/}
                            {/*    nested*/}
                            {/*>*/}
                            {/*<span>*/}
                            {/*   The game includes 5 diﬀerent sets of Objects, 91 photo cards andcoordinate tokens.<br />*/}
                            {/*    Preparation for a Game: 16 randomly selected picture cards are placed in a 4x4 grid marked with coordinates.*/}
                            {/*    Each person is assigned a random set and the not usedsets are kept on the*/}
                            {/*    side for later use.*/}
                            {/*    Playing a Round: Each player gets a random coordinatefor a photo that they*/}
                            {/*    then have to mimic with their set. After that, all players guess*/}
                            {/*    which pictures the others recreated. For every correctly guessed picture, the*/}
                            {/*    player*/}
                            {/*    that created it and the player that guessed it gets a point. Then the sets are*/}
                            {/*    moved to*/}
                            {/*    the next player and the next round starts.*/}
                            {/*</span>*/}
                            {/*</Popup>*/}

                            <ButtonWhite

                                className="button"
                                onClick={() => {
                                    console.log('modal closed ');
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
