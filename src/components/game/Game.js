import React from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import {EllipseH} from "../../views/design/EllipseH";
import {EllipseV} from "../../views/design/EllipseV";
import {Col, Container, Row, setConfiguration} from 'react-grid-system';
import {Spinner} from "../../views/design/Spinner";
import Draggable from 'react-draggable'; // Both at the same time

import stick1 from './assets/BuildingMaterials/SticksStones/stick1.png'
import stick2 from './assets/BuildingMaterials/SticksStones/stick2.png'
import stick3 from './assets/BuildingMaterials/SticksStones/stick3.png'
import stick4 from './assets/BuildingMaterials/SticksStones/stick4.png'
import stone1 from './assets/BuildingMaterials/SticksStones/stone1.png'
import stone2 from './assets/BuildingMaterials/SticksStones/stone2.png'
import stone3 from './assets/BuildingMaterials/SticksStones/stone3.png'
import stone4 from './assets/BuildingMaterials/SticksStones/stone4.png'
import stick1r from './assets/BuildingMaterials/SticksStones/stick1r.png'
import stick2r from './assets/BuildingMaterials/SticksStones/stick2r.png'
import stick3r from './assets/BuildingMaterials/SticksStones/stick3r.png'
import stick4r from './assets/BuildingMaterials/SticksStones/stick4r.png'

import cubeBlack from './assets/BuildingMaterials/ColouredCubes/cubeBlack.png'
import cubeBlue from './assets/BuildingMaterials/ColouredCubes/cubeBlue.png'
import cubeBrown from './assets/BuildingMaterials/ColouredCubes/cubeBrown.png'
import cubeGreen from './assets/BuildingMaterials/ColouredCubes/cubeGreen.png'
import cubeGrey from './assets/BuildingMaterials/ColouredCubes/cubeGrey.png'
import cubeRed from './assets/BuildingMaterials/ColouredCubes/cubeRed.png'
import cubeWhite from './assets/BuildingMaterials/ColouredCubes/cubeWhite.png'
import cubeYellow from './assets/BuildingMaterials/ColouredCubes/cubeYellow.png'




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


const RotatedDiv = styled.div`
  width: 60%;
  height: 375px;
  transform: rotate(30deg);
  background: black;
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
            picture: null,
            reload: false,
            set: 2,
            sticksAndStones: [false, false, false, false, false, false, false, false, false, false, false, false, ],
            colouredCubes: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,],
            blocks: [false, false, false, false, false, false, false, false, false, false, false, ],
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

    toggleSticksAndStones(n){
        var stoneMax = 4;
        //Todo: If restricted: stoneMax =O

        var stickCount =0;
        for (var i = 0; i < 8; i++) {
            if(this.state.sticksAndStones[i]){
                stickCount++;
            }
        }
        console.log("sticks: "+stickCount);

        var stoneCount =0;
        for (var i = 8; i < 12; i++) {
            if(this.state.sticksAndStones[i]){
                stoneCount++;
            }
        }
        console.log("stones: "+stoneCount);

        var b = this.state.sticksAndStones[n];
        var list = this.state.sticksAndStones;

        if( n<8 && !this.state.sticksAndStones[n] && stickCount<4){ //if we are in the stick region, want to place one, and have less than four placed
            list[n] = !b
        } else if (n>=8 && !this.state.sticksAndStones[n] && stoneCount<stoneMax){ //if we are in the stone region, want to place one, and have less than four placed
            list[n] = !b
        }else if (n<8 && this.state.sticksAndStones[n]){ //if we are in the stick region and want to take one away
            list[n] = !b
        } else if (n>=8 && this.state.sticksAndStones[n]){ //if we are in the stone region and want to take one away
            list[n] = !b
        }
        this.setState({reload: false});
    }

    toggleColouredCubes(n){
        var b = this.state.colouredCubes[n];
        var list = this.state.colouredCubes;
        var cubeMax = 9;

        //todo: restricted option: get request to see if actually restricted
        var restricted = true;
        if(restricted && ( (n>2 && n<6) || (n>8 && n<12) || (n>14 && n<18) || (n>20) )) {
            return;
        }

        var cubeCount =0;
        for (var i = 0; i < 24; i++) {
            if(this.state.colouredCubes[i]){
                cubeCount++;
            }
        }
        if( n<24 && !this.state.colouredCubes[n] && cubeCount<cubeMax){ //if we want to place one, and have less than the max placed
            list[n] = !b
        }else if (n<24 && this.state.colouredCubes[n]){ //if we want to take one away
            list[n] = !b
        }
        this.setState({reload: false});
    }

    toggleBlocks(n){
        var b = this.state.blocks[n];
        var list = this.state.blocks;

        //todo: get request for restricted set check
        var restricted = true;
        var blockCount =0;

        if(restricted && !(n===3 || n===4 || n===9 || n===10)  ){
            return;
        }

        for (var i = 0; i < this.state.blocks.length; i++) {
            if(this.state.blocks[i]){
                blockCount++;
            }}

        if( n<this.state.blocks.length && !this.state.blocks[n] && blockCount<9){ //if we want to place one, and have less than the max placed
            list[n] = !b
        }else if (n<this.state.blocks.length && this.state.blocks[n]){ //if we want to take one away
            list[n] = !b
        }
        this.setState({reload: false});
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

                    {/*display the set of togglebuttons for the SticksnStones:*/}
                    {this.state.set===1 ? (
                    <Container fluid style={{ width: '300px' }}>
                        {/*https://www.npmjs.com/package/react-grid-system*/}
                        {/*https://sealninja.github.io/react-grid-system/#col*/}
                        <Row justify="around" style={{ height: '120px' }}>
                                <img src={stick1} height={100} onClick={() => {this.toggleSticksAndStones(0)}} />
                                <img src={stick2} height={100} onClick={() => {this.toggleSticksAndStones(1)}}/>
                                <img src={stick3} height={100} onClick={() => {this.toggleSticksAndStones(2)}}/>
                                <img src={stick4} height={100} onClick={() => {this.toggleSticksAndStones(3)}}/>
                        </Row>

                        <Row justify="around" style={{ height: '120px' }}>
                            <img src={stick1r} height={25} onClick={() => {this.toggleSticksAndStones(4)}} />
                            <img src={stick2r} height={25} onClick={() => {this.toggleSticksAndStones(5)}}/>
                            <img src={stick3r} height={25} onClick={() => {this.toggleSticksAndStones(6)}}/>
                            <img src={stick4r} height={25} onClick={() => {this.toggleSticksAndStones(7)}}/>
                        </Row>

                        <Row justify="around" style={{ height: '100' }}>
                            <img src={stone1} height={50} onClick={() => {this.toggleSticksAndStones(8)}} />
                            <img src={stone2} height={50} onClick={() => {this.toggleSticksAndStones(9)}}/>
                            <img src={stone3} height={50} onClick={() => {this.toggleSticksAndStones(10)}}/>
                            <img src={stone4} height={50} onClick={() => {this.toggleSticksAndStones(11)}}/>
                        </Row>
                    </Container>
                        ): (<div></div>)}

                    {/*display the set of togglebuttons for the ColouredCubes:*/}
                    {this.state.set===2 ? (
                        <Container fluid style={{ width: '200px' }}>
                            <Row justify="around" style={{ height: '60px' }}>
                                <img src={cubeBlack} height={50} onClick={() => {this.toggleColouredCubes(0)}} />
                                <img src={cubeBlack} height={50} onClick={() => {this.toggleColouredCubes(1)}}/>
                                <img src={cubeBlack} height={50} onClick={() => {this.toggleColouredCubes(2)}}/>
                            </Row>
                            <Row justify="around" style={{ height: '60px' }}>
                                <img src={cubeBlue} height={50} onClick={() => {this.toggleColouredCubes(3)}} />
                                <img src={cubeBlue} height={50} onClick={() => {this.toggleColouredCubes(4)}}/>
                                <img src={cubeBlue} height={50} onClick={() => {this.toggleColouredCubes(5)}}/>
                            </Row>
                            <Row justify="around" style={{ height: '60px' }}>
                                <img src={cubeBrown} height={50} onClick={() => {this.toggleColouredCubes(6)}} />
                                <img src={cubeBrown} height={50} onClick={() => {this.toggleColouredCubes(7)}}/>
                                <img src={cubeBrown} height={50} onClick={() => {this.toggleColouredCubes(8)}}/>
                            </Row>
                            <Row justify="around" style={{ height: '60px' }}>
                                <img src={cubeGreen} height={50} onClick={() => {this.toggleColouredCubes(9)}} />
                                <img src={cubeGreen} height={50} onClick={() => {this.toggleColouredCubes(10)}}/>
                                <img src={cubeGreen} height={50} onClick={() => {this.toggleColouredCubes(11)}}/>
                            </Row>
                            <Row justify="around" style={{ height: '60px' }}>
                                <img src={cubeGrey} height={50} onClick={() => {this.toggleColouredCubes(12)}} />
                                <img src={cubeGrey} height={50} onClick={() => {this.toggleColouredCubes(13)}}/>
                                <img src={cubeGrey} height={50} onClick={() => {this.toggleColouredCubes(14)}}/>
                            </Row>
                            <Row justify="around" style={{ height: '60px' }}>
                                <img src={cubeRed} height={50} onClick={() => {this.toggleColouredCubes(15)}} />
                                <img src={cubeRed} height={50} onClick={() => {this.toggleColouredCubes(16)}}/>
                                <img src={cubeRed} height={50} onClick={() => {this.toggleColouredCubes(17)}}/>
                            </Row>
                            <Row justify="around" style={{ height: '60px' }}>
                                <img src={cubeWhite} height={50} onClick={() => {this.toggleColouredCubes(18)}} />
                                <img src={cubeWhite} height={50} onClick={() => {this.toggleColouredCubes(19)}}/>
                                <img src={cubeWhite} height={50} onClick={() => {this.toggleColouredCubes(20)}}/>
                            </Row>
                            <Row justify="around" style={{ height: '60px' }}>
                                <img src={cubeYellow} height={50} onClick={() => {this.toggleColouredCubes(21)}} />
                                <img src={cubeYellow} height={50} onClick={() => {this.toggleColouredCubes(22)}}/>
                                <img src={cubeYellow} height={50} onClick={() => {this.toggleColouredCubes(23)}}/>
                            </Row>
                        </Container>
                    ): (<div></div>)}




                    {/*for debugging and testing the asset-loading:*/}
                    {/*<Container fluid style={{ width: '450px' }}>*/}
                    {/*    <Row align="center" justify="around" >*/}
                    {/*        <Col >  <image src={stick1} height={100} />  </Col>*/}
                    {/*        <Col >  <img src={stick2} height={100} />  </Col>*/}
                    {/*        <Col >  <img src={stick3} height={100} />  </Col>*/}
                    {/*        <Col >  <img src={stick4} height={100} />  </Col>*/}
                    {/*    </Row>*/}
                    {/*    <Row align="center" justify="around" >*/}
                    {/*        <Col >  <img src={stone1} height={50} />  </Col>*/}
                    {/*        <Col >  <img src={stone2} height={50} />  </Col>*/}
                    {/*        <Col >  <img src={stone3} height={50} />  </Col>*/}
                    {/*        <Col >  <img src={stone4} height={50} />  </Col>*/}
                    {/*    </Row>*/}
                    {/*</Container>*/}


                    {/*<div>*/}
                    {/*    <h1>React Draggable</h1>*/}
                    {/*    <p>Active DragHandlers: {this.state.activeDrags}</p>*/}
                    {/*    <p>*/}
                    {/*        <a href="https://github.com/STRML/react-draggable/blob/master/example/example.js">Demo Source</a>*/}
                    {/*    </p>*/}
                    {/*    <Draggable {...dragHandlers}>*/}
                    {/*        <div className="box">I can be dragged anywhere</div>*/}
                    {/*    </Draggable>*/}

                    {/*    <Draggable {...dragHandlers}>*/}
                    {/*        <img src={stick1} height={100} />*/}
                    {/*    </Draggable>*/}
                    {/*</div>*/}
                    {/*<Draggable handle="strong" {...dragHandlers}>*/}
                    {/*    <div className="box no-cursor">*/}
                    {/*        <strong className="cursor"><div>Drag here</div></strong>*/}
                    {/*        <div>You must click my handle to drag me</div>*/}
                    {/*    </div>*/}
                    {/*</Draggable>*/}
                    {/*<Draggable {...dragHandlers}>*/}
                    {/*    <RemWrapper>*/}
                    {/*        <div className="box rem-position-fix" style={{position: 'absolute', bottom: '6.25rem', right: '18rem'}}>*/}
                    {/*            I use <span style={{ fontWeight: 700 }}>rem</span> instead of <span style={{ fontWeight: 700 }}>px</span> for my transforms. I also have absolute positioning.*/}

                    {/*            <br /><br />*/}
                    {/*            I depend on a CSS hack to avoid double absolute positioning.*/}
                    {/*        </div>*/}
                    {/*    </RemWrapper>*/}
                    {/*</Draggable>*/}

                    {/*<div>*/}
                    {/*    <ReactPanZoom image="https://drscdn.500px.org/photo/105738331/q%3D80_m%3D2000/v2?webp=true&sig=538a4f76f4966c84acb01426bb4a4a5e4a85b72a2c3bd64973d3a369f9653007" alt="document image"/>*/}
                    {/*</div>*/}

                    {/*<div className="rotated">*/}
                    {/*    <img src={stick1} height={100} />*/}
                    {/*</div>*/}



                    <div className="box"
                         style={{height: '500px', width: '500px', position: 'relative', overflow: 'auto',
                             padding: '0', background: "white", borderColor: "black", borderRadius: "5px"}}>

                            {/*<Draggable bounds="parent" {...dragHandlers}>*/}
                            {/*    <img src={stick1} height={100} />*/}
                            {/*</Draggable>*/}

                            {/*Sticks and Stones: ###################################################################################################################*/}
                            {this.state.sticksAndStones[0] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stick1} height={100} /></Draggable>): (<div></div>)}
                            {this.state.sticksAndStones[1] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stick2} height={100} /></Draggable>): (<div></div>)}
                            {this.state.sticksAndStones[2] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stick3} height={100} /></Draggable>): (<div></div>)}
                            {this.state.sticksAndStones[3] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stick4} height={100} /></Draggable>): (<div></div>)}

                            {this.state.sticksAndStones[4] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stick1r} height={20} /></Draggable>): (<div></div>)}
                            {this.state.sticksAndStones[5] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stick2r} height={20} /></Draggable>): (<div></div>)}
                            {this.state.sticksAndStones[6] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stick3r} height={20} /></Draggable>): (<div></div>)}
                            {this.state.sticksAndStones[7] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stick4r} height={20} /></Draggable>): (<div></div>)}

                            {this.state.sticksAndStones[8] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stone1} height={50} /></Draggable>): (<div></div>)}
                            {this.state.sticksAndStones[9] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stone2} height={50} /></Draggable>): (<div></div>)}
                            {this.state.sticksAndStones[10] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stone3} height={50} /></Draggable>): (<div></div>)}
                            {this.state.sticksAndStones[11] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stone4} height={50} /></Draggable>): (<div></div>)}


                            {/*Coloured Cubes: ###################################################################################################################*/}
                            {this.state.colouredCubes[0] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeBlack} height={50} /></Draggable>): (<div></div>)}
                            {this.state.colouredCubes[1] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeBlack} height={50} /></Draggable>): (<div></div>)}
                            {this.state.colouredCubes[2] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeBlack} height={50} /></Draggable>): (<div></div>)}

                            {this.state.colouredCubes[3] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeBlue} height={50} /></Draggable>): (<div></div>)}
                            {this.state.colouredCubes[4] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeBlue} height={50} /></Draggable>): (<div></div>)}
                            {this.state.colouredCubes[5] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeBlue} height={50} /></Draggable>): (<div></div>)}

                            {this.state.colouredCubes[6] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeBrown} height={50} /></Draggable>): (<div></div>)}
                            {this.state.colouredCubes[7] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeBrown} height={50} /></Draggable>): (<div></div>)}
                            {this.state.colouredCubes[8] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeBrown} height={50} /></Draggable>): (<div></div>)}

                            {this.state.colouredCubes[9] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeGreen} height={50} /></Draggable>): (<div></div>)}
                            {this.state.colouredCubes[10] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeGreen} height={50} /></Draggable>): (<div></div>)}
                            {this.state.colouredCubes[11] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeGreen} height={50} /></Draggable>): (<div></div>)}

                            {this.state.colouredCubes[12] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeGrey} height={50} /></Draggable>): (<div></div>)}
                            {this.state.colouredCubes[13] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeGrey} height={50} /></Draggable>): (<div></div>)}
                            {this.state.colouredCubes[14] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeGrey} height={50} /></Draggable>): (<div></div>)}

                            {this.state.colouredCubes[15] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeRed} height={50} /></Draggable>): (<div></div>)}
                            {this.state.colouredCubes[16] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeRed} height={50} /></Draggable>): (<div></div>)}
                            {this.state.colouredCubes[17] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeRed} height={50} /></Draggable>): (<div></div>)}

                            {this.state.colouredCubes[18] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeWhite} height={50} /></Draggable>): (<div></div>)}
                            {this.state.colouredCubes[19] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeWhite} height={50} /></Draggable>): (<div></div>)}
                            {this.state.colouredCubes[20] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeWhite} height={50} /></Draggable>): (<div></div>)}

                            {this.state.colouredCubes[21] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeYellow} height={50} /></Draggable>): (<div></div>)}
                            {this.state.colouredCubes[22] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeYellow} height={50} /></Draggable>): (<div></div>)}
                            {this.state.colouredCubes[23] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeYellow} height={50} /></Draggable>): (<div></div>)}




                        {/*<Draggable bounds="parent" {...dragHandlers}>*/}
                           {/*    <img src={stick1} height={100} />*/}
                           {/*</Draggable>*/}
                           {/* <Draggable bounds="parent" {...dragHandlers}>*/}
                           {/*     <img src={stick2} height={100} />*/}
                           {/* </Draggable>*/}
                           {/* <Draggable bounds="parent" {...dragHandlers}>*/}
                           {/*     <img src={stick3} height={100} />*/}
                           {/* </Draggable>*/}
                           {/* <Draggable bounds="parent" {...dragHandlers}>*/}
                           {/*     <img src={stick4} height={100} />*/}
                           {/* </Draggable>*/}
                            {/*<Draggable bounds="parent" {...dragHandlers}>*/}
                            {/*    <img src={stone1} height={50} />*/}
                            {/*</Draggable>*/}
                            {/*<Draggable bounds="parent" {...dragHandlers}>*/}
                            {/*    <img src={stone2} height={50} />*/}
                            {/*</Draggable>*/}
                            {/*<Draggable bounds="parent" {...dragHandlers}>*/}
                            {/*    <img src={stone3} height={50} />*/}
                            {/*</Draggable>*/}
                            {/*<Draggable bounds="parent" {...dragHandlers}>*/}
                            {/*    <img src={stone4} height={50} />*/}
                            {/*</Draggable>*/}


                            {/*<Draggable bounds="parent" {...dragHandlers}>*/}
                            {/*    <div className="box">*/}
                            {/*        I also can only be moved within my offsetParent.<br /><br />*/}
                            {/*        Both parent padding and child margin work properly.*/}
                            {/*    </div>*/}
                            {/*</Draggable>*/}

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
