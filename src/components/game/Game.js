import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import { EllipseH} from "../../views/design/EllipseH";
import { EllipseV} from "../../views/design/EllipseV";
import { ButtonWhite } from '../../views/design/ButtonWhite';
import { Container, Row, Col, setConfiguration  } from 'react-grid-system';
import {Spinner} from "../../views/design/Spinner";
import logo from "../dashboard/logoSmall.png";
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

import stick1 from  './assets/BuildingMaterials/SticksStones/stick1.png'
import stick2 from  './assets/BuildingMaterials/SticksStones/stick2.png'
import stick3 from  './assets/BuildingMaterials/SticksStones/stick3.png'
import stick4 from  './assets/BuildingMaterials/SticksStones/stick4.png'
import stone1 from  './assets/BuildingMaterials/SticksStones/stone1.png'
import stone2 from  './assets/BuildingMaterials/SticksStones/stone2.png'
import stone3 from  './assets/BuildingMaterials/SticksStones/stone3.png'
import stone4 from  './assets/BuildingMaterials/SticksStones/stone4.png'

setConfiguration({
    defaultScreenClass: 'sm',
    containerWidths: [540, 740, 960, 1140, 1540]
});

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
  background: transparent;
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
  background: transparent;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.0);
`;



/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Game extends React.Component {
    /**
     * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
     * The constructor for a React component is called before it is mounted (rendered).
     * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
     * These fields are then handled in the onChange() methods in the resp. InputFields
     */
    constructor() {
        super();
        this.state = {
            id: null,
            token: null,
            picture: null
        }
    }


    /**
     *  Every time the user enters something in the input field, the state gets updated.
     * @param key (the key of the state for identifying the field that needs to be updated)
     * @param value (the value that gets assigned to the identified state key)
     */
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    /**
     * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
     * Initialization that requires DOM nodes should go here.
     * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
     * You may call setState() immediately in componentDidMount().
     * It will trigger an extra rendering, but it will happen before the browser updates the screen.
     */
    componentDidMount() {
        this.getImage();
    }

    async getImage(){
        try {
            const p = await api.get('/game/setup/2')
            this.setState({picture: p.data});
            console.log(this.state.picture[0]);
        } catch (error) {
            console.log("error while getting image: " + error);
        }
    }


//ReactDraggable Stuff:
//########################################################################
    state = {
        activeDrags: 0,
        deltaPosition: {
            x: 0, y: 0
        },
        controlledPosition: {
            x: -400, y: 200
        }
    };
    handleDrag = (e, ui) => {
        const {x, y} = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            }
        });
    };

    onStart = () => {
        this.setState({activeDrags: ++this.state.activeDrags});
    };

    onStop = () => {
        this.setState({activeDrags: --this.state.activeDrags});
    };
    onDrop = (e) => {
        this.setState({activeDrags: --this.state.activeDrags});
        if (e.target.classList.contains("drop-target")) {
            alert("Dropped!");
            e.target.classList.remove('hovered');
        }
    };
    onDropAreaMouseEnter = (e) => {
        if (this.state.activeDrags) {
            e.target.classList.add('hovered');
        }
    }
    onDropAreaMouseLeave = (e) => {
        e.target.classList.remove('hovered');
    }

    // For controlled component
    adjustXPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {x, y} = this.state.controlledPosition;
        this.setState({controlledPosition: {x: x - 10, y}});
    };

    adjustYPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {controlledPosition} = this.state;
        const {x, y} = controlledPosition;
        this.setState({controlledPosition: {x, y: y - 10}});
    };

    onControlledDrag = (e, position) => {
        const {x, y} = position;
        this.setState({controlledPosition: {x, y}});
    };

    onControlledDragStop = (e, position) => {
        this.onControlledDrag(e, position);
        this.onStop();
    };

//########################################################################

    render() {
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        const {deltaPosition, controlledPosition} = this.state;
        return (
            <BaseContainer>
                <FormContainer>
                    {/*<Ellipse>e1 </Ellipse>*/}

                    {!this.state.picture ? (
                        <Container fluid style={{ height: '400px' }}>
                            <Row justify="around"  >
                                Fetching Images, please wait
                            </Row>
                            <Row justify="around"   >
                                <Spinner />
                            </Row>
                        </Container>
                    ): (

                        <Container fluid style={{ width: '800px' }}>
                    {/*https://www.npmjs.com/package/react-grid-system*/}
                    {/*https://sealninja.github.io/react-grid-system/#col*/}
                        <Row justify="around" style={{ height: '30px' }}>
                        <EllipseH> 1 </EllipseH>
                        <EllipseH> 2 </EllipseH>
                        <EllipseH> 3 </EllipseH>
                        <EllipseH> 4 </EllipseH>
                        </Row>
                        <Row align="center"  >
                        <EllipseV>a</EllipseV>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[0]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[1]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[2]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[3]} alt={"pic"} width="150" />  </Col>
                        </Row>
                        {/*<br />*/}
                        <Row align="center" style={{ }} >
                        <EllipseV> b </EllipseV>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[4]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[5]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[6]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[7]} alt={"pic"} width="150" />  </Col>
                        </Row>
                        {/*<br />*/}
                        <Row align="center" style={{ }} >
                        <EllipseV> c </EllipseV>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[8]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[9]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[10]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[11]} alt={"pic"} width="150" />  </Col>
                        </Row>
                        {/*<br />*/}
                        <Row align="center" style={{ }} >
                        <EllipseV> d </EllipseV>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[12]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[13]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[14]} alt={"pic"} width="150" />  </Col>
                            <Col >  <img src={"data:image/jpg;base64," + this.state.picture[15]} alt={"pic"} width="150" />  </Col>
                        </Row>
                        </Container>)
                    }

                    {/*for debugging and testing the asset-loading:*/}
                    <Container fluid style={{ width: '450px' }}>
                        <Row align="center" justify="around" >
                            <Col >  <image src={stick1} height={100} />  </Col>
                            <Col >  <img src={stick2} height={100} />  </Col>
                            <Col >  <img src={stick3} height={100} />  </Col>
                            <Col >  <img src={stick4} height={100} />  </Col>
                        </Row>
                        <Row align="center" justify="around" >
                            <Col >  <img src={stone1} height={50} />  </Col>
                            <Col >  <img src={stone2} height={50} />  </Col>
                            <Col >  <img src={stone3} height={50} />  </Col>
                            <Col >  <img src={stone4} height={50} />  </Col>
                        </Row>
                    </Container>


                    <div>
                        <h1>React Draggable</h1>
                        <p>Active DragHandlers: {this.state.activeDrags}</p>
                        <p>
                            <a href="https://github.com/STRML/react-draggable/blob/master/example/example.js">Demo Source</a>
                        </p>
                        <Draggable {...dragHandlers}>
                            <div className="box">I can be dragged anywhere</div>
                        </Draggable>

                        <Draggable {...dragHandlers}>
                            <img src={stick1} height={100} />
                        </Draggable>
                    </div>
                    <Draggable handle="strong" {...dragHandlers}>
                        <div className="box no-cursor">
                            <strong className="cursor"><div>Drag here</div></strong>
                            <div>You must click my handle to drag me</div>
                        </div>
                    </Draggable>
                    <Draggable {...dragHandlers}>
                        <RemWrapper>
                            <div className="box rem-position-fix" style={{position: 'absolute', bottom: '6.25rem', right: '18rem'}}>
                                I use <span style={{ fontWeight: 700 }}>rem</span> instead of <span style={{ fontWeight: 700 }}>px</span> for my transforms. I also have absolute positioning.

                                <br /><br />
                                I depend on a CSS hack to avoid double absolute positioning.
                            </div>
                        </RemWrapper>
                    </Draggable>

                    <div className="box" style={{height: '500px', width: '500px', position: 'relative', overflow: 'auto', padding: '0', background: "white", border: "black"}}>
                        <div style={{height: '1000px', width: '1000px', padding: '10px'}}>
                            <Draggable bounds="parent" {...dragHandlers}>
                                <div className="box">
                                    I can only be moved within my offsetParent.<br /><br />
                                    Both parent padding and child margin work properly.
                                </div>
                            </Draggable>
                            <Draggable bounds="parent" {...dragHandlers}>
                                <div className="box">
                                    I also can only be moved within my offsetParent.<br /><br />
                                    Both parent padding and child margin work properly.
                                </div>
                            </Draggable>
                        </div>
                    </div>

                </FormContainer>
            </BaseContainer>


        );
    }
}


class RemWrapper extends React.Component {
    // PropTypes is not available in this environment, but here they are.
    // static propTypes = {
    //   style: PropTypes.shape({
    //     transform: PropTypes.string.isRequired
    //   }),
    //   children: PropTypes.node.isRequired,
    //   remBaseline: PropTypes.number,
    // }

    translateTransformToRem(transform, remBaseline = 16) {
        const convertedValues = transform.replace('translate(', '').replace(')', '')
            .split(',')
            .map(px => px.replace('px', ''))
            .map(px => parseInt(px, 10) / remBaseline)
            .map(x => `${x}rem`)
        const [x, y] = convertedValues

        return `translate(${x}, ${y})`
    }

    render() {
        const { children, remBaseline = 16, style } = this.props
        const child = React.Children.only(children)

        const editedStyle = {
            ...child.props.style,
            ...style,
            transform: this.translateTransformToRem(style.transform, remBaseline),
        }

        return React.cloneElement(child, {
            ...child.props,
            ...this.props,
            style: editedStyle
        })
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Game);
