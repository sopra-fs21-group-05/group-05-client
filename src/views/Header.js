import React from "react";
import styled from "styled-components";
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
                            <img src={logo} width={65} alt={""}/>
                            is a quick-playing family game with very simple rules. <br />
                            Form the image on your secret picture card with one set of components,
                            either shoelaces, color cubes, icon cards, sticks and stones or building blocks
                            in such a way that the other players guess what image you have pictured:<br />

                            1: You receive a secret picture card selected from 16 randomly selected picture cards, visible in a 4x4 grid.<br />
                            2: Then form that image with your building materials in such a way that it is recognizable.<br />
                            3: And finally guess what image each other player has pictured.<br /><br />

                            The players get points for correctly guessing other players images and
                            for other players guessing their image. The most points after 5 Rounds wins!

                            <br /><br />
                            is a quick-playing family game with very simple rules. <br />
                            Form the image on your secret picture card with one set of components,
                            either shoelaces, color cubes, icon cards, sticks and stones or building blocks
                            in such a way that the other players guess what image you have pictured:<br />

                            1: You receive a secret picture card selected from 16 randomly selected picture cards, visible in a 4x4 grid.<br />
                            2: Then form that image with your building materials in such a way that it is recognizable.<br />
                            3: And finally guess what image each other player has pictured.<br /><br />


                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

                            Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.

                            Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.

                            Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer
                        </div>
                        <div className="actions">
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
