import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { ButtonWhite } from '../../views/design/ButtonWhite';
import {EllipseH} from "../../views/design/EllipseH";
import {Col, Container, Row, setConfiguration} from 'react-grid-system';
import {Spinner} from "../../views/design/Spinner";
import Draggable from 'react-draggable'; // Both at the same time

import html2canvas from "html2canvas";

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

import arch from './assets/BuildingMaterials/Blocks/arch.png'
import archR1 from './assets/BuildingMaterials/Blocks/archR1.png'
import archR2 from './assets/BuildingMaterials/Blocks/archR2.png'
import circle from './assets/BuildingMaterials/Blocks/circle.png'
import cuboid1 from './assets/BuildingMaterials/Blocks/cuboid1.png'
import cuboid1R from './assets/BuildingMaterials/Blocks/cuboid1R.png'
import square from './assets/BuildingMaterials/Blocks/square.png'
import cuboid2 from './assets/BuildingMaterials/Blocks/cuboid2.png'
import cuboid2R from './assets/BuildingMaterials/Blocks/cuboid2R.png'
import triangle from './assets/BuildingMaterials/Blocks/triangle.png'
import triangleR from './assets/BuildingMaterials/Blocks/triangleR.png'

import ball from './assets/BuildingMaterials/Cards/ball.png'
import bird from './assets/BuildingMaterials/Cards/bird.png'
import bulb from './assets/BuildingMaterials/Cards/bulb.png'
import car from './assets/BuildingMaterials/Cards/car.png'
import clock from './assets/BuildingMaterials/Cards/clock.png'
import clover from './assets/BuildingMaterials/Cards/clover.png'
import face from './assets/BuildingMaterials/Cards/face.png'
import fire from './assets/BuildingMaterials/Cards/fire.png'
import flash from './assets/BuildingMaterials/Cards/flash.png'
import flower from './assets/BuildingMaterials/Cards/flower.png'
import heart from './assets/BuildingMaterials/Cards/heart.png'
import house from './assets/BuildingMaterials/Cards/house.png'
import poop from './assets/BuildingMaterials/Cards/poop.png'
import ring from './assets/BuildingMaterials/Cards/ring.png'
import shark from './assets/BuildingMaterials/Cards/shark.png'
import shirt from './assets/BuildingMaterials/Cards/shirt.png'
import skull from './assets/BuildingMaterials/Cards/skull.png'
import snail from './assets/BuildingMaterials/Cards/snail.png'
import snow from './assets/BuildingMaterials/Cards/snow.png'
import sun from './assets/BuildingMaterials/Cards/sun.png'

import l1 from './assets/BuildingMaterials/Laces/l1.png'
import l2 from './assets/BuildingMaterials/Laces/l2.png'
import l3 from './assets/BuildingMaterials/Laces/l3.png'
import l4 from './assets/BuildingMaterials/Laces/l4.png'
import l5 from './assets/BuildingMaterials/Laces/l5.png'
import l6 from './assets/BuildingMaterials/Laces/l6.png'
import l7 from './assets/BuildingMaterials/Laces/s1.png'
import l8 from './assets/BuildingMaterials/Laces/s2.png'
import l9 from './assets/BuildingMaterials/Laces/s3.png'
import l10 from './assets/BuildingMaterials/Laces/s4.png'
import l11 from './assets/BuildingMaterials/Laces/s5.png'
import l12 from './assets/BuildingMaterials/Laces/s6.png'
import l13 from './assets/BuildingMaterials/Laces/s7.png'
import l14 from './assets/BuildingMaterials/Laces/s8.png'
import l15 from './assets/BuildingMaterials/Laces/s9.png'
import l16 from './assets/BuildingMaterials/Laces/s10.png'
import l17 from './assets/BuildingMaterials/Laces/s11.png'
import l18 from './assets/BuildingMaterials/Laces/s12.png'
import l19 from './assets/BuildingMaterials/Laces/s13.png'
import l20 from './assets/BuildingMaterials/Laces/s14.png'

setConfiguration({
    defaultScreenClass: 'sm',
    containerWidths: [540, 740, 960, 1140, 1540]
});

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 700px;
  justify-content: center;
`;


const Container2 = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  min-width: 300px;
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


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.2);

`;

const Label = styled.label`
  color: black;
  margin-bottom: 10px;
`;

const PictureContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
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
class GameviewUser extends React.Component {
    constructor() {
        super();
        this.state = {
            materialSet: null,
            restricted: null,
            picture: null,
            coordinate: null,
            reload: false,
            sticksAndStones: [false, false, false, false, false, false, false, false, false, false, false, false, ],
            colouredCubes: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,],
            blocks: [false, false, false, false, false, false, false, false, false, false, false, ],
            cards: [false, false, false, false, false,false, false, false, false, false,false, false, false, false, false,false, false, false, false, false,],
            laces: [false, false, false, false, false,false, false, false, false, false,false, false, false, false, false,false, false, false, false, false,],
            debugImage: null,
        }
    };

    async getPicture() {
        try {
            const pathname = this.props.location.pathname;
            const pathname_str = pathname + "/picture";

            const response = await api.get(pathname_str);
            let coordinate = response.data.coordinate;
            let picture = response.data.picture;

            this.setState({picture: picture, coordinate: coordinate})

        } catch (error) {
            alert(`Something went wrong while getting the picture and material set: \n${handleError(error)}`);
        }
    }

    async getMaterialSet() {
        try {
            const pathname = this.props.location.pathname;
            const pathname_str = pathname + "/set";

            const response_set = await api.get(pathname_str);
            let setNr = response_set.data

            this.setState({materialSet: setNr})

        } catch (error) {
            alert(`Something went wrong while getting the picture and material set: \n${handleError(error)}`);
        }
    }

    //todo: check if this actually is the correct request, not in rest spec yet!!!
    async checkRestriction() {
        try {
            const pathname = this.props.location.pathname;
            const pathname_str = pathname + "/restricted";

            const response_set = await api.get(pathname_str);
            let restriction = response_set.data

            this.setState({restricted: restriction})

        } catch (error) {
            alert(`Something went wrong while getting the restriction state for the current user: \n${handleError(error)}`);
        }
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    toggleSticksAndStones(n){
        var stoneMax = 4;
        if( this.state.restricted){
            stoneMax=0;
        }

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
        var restricted = false;
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
        var restricted = false;

        if(restricted && !(n===3 || n===4 || n===9 || n===10)  ){
            return;
        }

        let arch = (this.state.blocks[0] + this.state.blocks[1] + this.state.blocks[2]);
        let circle = 0+this.state.blocks[3];
        let square = 0+this.state.blocks[4];
        let cuboid1 = (this.state.blocks[5] + this.state.blocks[7]);
        let cuboid2 = (this.state.blocks[6] + this.state.blocks[8]);
        let triangle = (this.state.blocks[9] + this.state.blocks[10]);

        var blockCount = 0;
        for (var i = 0; i < this.state.blocks.length; i++) {
            if(this.state.blocks[i]){
                blockCount++;
            }
        }

        if( n<3 && arch<1 && !this.state.blocks[n]){ //check if we want to place or take away an arch
            list[n] = !b;
        }else if(n<3 && this.state.blocks[n]){
            list[n] = !b;
        }

        if( n==3 && circle<1 && !this.state.blocks[n]){ //check if we want to place or take away a circle
            list[n] = !b;
        }else if(n==3&& this.state.blocks[n]){
            list[n] = !b;
        }

        if( n==4 && square<1 && !this.state.blocks[n]){ //check if we want to place or take away a square
            list[n] = !b;
        }else if(n==4&& this.state.blocks[n]){
            list[n] = !b;
        }

        if( (n==5|| n==7) && cuboid1<1 && !this.state.blocks[n]){ //check if we want to place or take away a cuboid1
            list[n] = !b;
        }else if((n==5|| n==7)&& this.state.blocks[n]){
            list[n] = !b;
        }

        if( (n==6|| n==8) && cuboid2<1 && !this.state.blocks[n]){ //check if we want to place or take away a cuboid2
            list[n] = !b;
        }else if( (n==6|| n==8)&& this.state.blocks[n]){
            list[n] = !b;
        }

        if( n>8 && triangle<1 && !this.state.blocks[n]){ //check if we want to place or take away a triangle
            list[n] = !b;
        }else if( n>8  && this.state.blocks[n]){
            list[n] = !b;
        }
        this.setState({reload: false});

    }

    toggleCards(n){
        var b = this.state.cards[n];
        var list = this.state.cards;

        //todo: get request for restricted set check
        var restricted = false;
        var cardCount =0;
        var cardMax = 5;

        if(restricted){
            cardMax = 2;
        }

        for (var i = 0; i < this.state.cards.length; i++) {
            if(this.state.cards[i]){
                cardCount++;
            }}

        if( n<this.state.cards.length && !this.state.blocks[n] && cardCount<cardMax){ //if we want to place one, and have less than the max placed
            list[n] = !b
        }else if (n<this.state.cards.length && this.state.cards[n]){ //if we want to take one away
            list[n] = !b
        }
        this.setState({reload: false});
    }

    toggleLaces(n){
        console.log("entered lace toggle " +n);
        var b = this.state.laces[n];
        var list = this.state.laces;

        //todo: get request for restricted set check
        var restricted = false;
        var laceCount =0;
        var laceMax = 5;

        if(restricted){
            laceMax = 2;
        }

        for (var i = 0; i < this.state.laces.length; i++) {
            if(this.state.laces[i]){
                laceCount++;
            }}

        if( n<this.state.laces.length && !this.state.laces[n] && laceCount < laceMax){ //if we want to place one, and have less than the max placed
            list[n] = !b
        }else if (n<this.state.laces.length && this.state.laces[n]){ //if we want to take one away
            list[n] = !b
        }
        console.log(laceCount);
        this.setState({reload: false});
    }

    componentDidMount() {}

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

    takeshot() {
        let div = document.getElementById('drawingArea');
        if(div!= null){
            // div.parentNode.style.overflow = 'visible';
            window.scrollTo(0, 0); // this will help to print if div hidden or on mobile screen
            html2canvas(div, {                                  }
            ).then(
                function (canvas) {
                    try{
                        //this part will append a "canvas" object to the document
                        // document
                        //     .getElementById('output')
                        //     .appendChild(canvas);

                        //this will append other screenshots too, but this should not matter as we only take one and then
                        // immediately redirect the user
                        var data = canvas.toDataURL('image/png');
                        var image = new Image();
                        image.src = data;
                        document.getElementById('image').appendChild(image);

                    }catch (error) {
                        console.log("error while setting the screenshot as an image" + error);
                    }
                })
            // this.setState({reload: false});
        }

    }

//########################################################################

    render() {
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        const {deltaPosition, controlledPosition} = this.state;
        return (
                <FormContainer>
                    <Container2>
                        <div id="image">
                            <p>Image:</p>
                        </div>
                        <Label>Picture</Label>
                        <EllipseH> {this.state.coordinate} </EllipseH>
                        <PictureContainer>
                            <img src={"data:image/jpg;base64," + this.state.picture} alt={"pic"} width="400" />
                        </PictureContainer>
                    <ButtonContainer>
                        <ButtonWhite
                            disabled={this.state.picture!== null}
                            width="100%"
                            onClick={() => {
                                this.getPicture();
                            }}
                        >
                            Get Picture
                        </ButtonWhite>
                    </ButtonContainer>
                    </Container2>
                    <Container2>
                        <Label>Recreate the Picture</Label>
                        <Form>
                            {/*buildingArea should be placed here*/}
                            <div id="drawingArea" className="box"
                                 style={{height: '500px', width: '500px', position: 'relative',
                                     overflow: 'auto',
                                     // overflow: 'hidden', //auto, scroll, hidden, visible
                                     padding: '0', background: "white", borderColor: "black", borderRadius: "5px"}}>

                                {/*<Draggable bounds="parent" {...dragHandlers}>*/}
                                {/*    <img src={stick1} height={100} />*/}
                                {/*</Draggable>*/}

                                {/*Sticks and Stones: ###################################################################################################################*/}
                                {this.state.sticksAndStones[0] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stick1} height={100} alt=""  /></Draggable>): ("")}
                                {this.state.sticksAndStones[1] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stick2} height={100} alt=""  /></Draggable>): ("")}
                                {this.state.sticksAndStones[2] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stick3} height={100} alt=""  /></Draggable>): ("")}
                                {this.state.sticksAndStones[3] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stick4} height={100} alt=""  /></Draggable>): ("")}

                                {this.state.sticksAndStones[4] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stick1r} height={20} alt=""  /></Draggable>): ("")}
                                {this.state.sticksAndStones[5] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stick2r} height={20} alt=""  /></Draggable>): ("")}
                                {this.state.sticksAndStones[6] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stick3r} height={20} alt=""  /></Draggable>): ("")}
                                {this.state.sticksAndStones[7] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stick4r} height={20} alt=""  /></Draggable>): ("")}

                                {this.state.sticksAndStones[8] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stone1} height={50} alt=""  /></Draggable>): ("")}
                                {this.state.sticksAndStones[9] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stone2} height={50} alt=""  /></Draggable>): ("")}
                                {this.state.sticksAndStones[10] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stone3} height={50} alt=""  /></Draggable>): ("")}
                                {this.state.sticksAndStones[11] ? (<Draggable bounds="parent" {...dragHandlers}><img src={stone4} height={50} alt=""  /></Draggable>): ("")}


                                {/*Coloured Cubes: ###################################################################################################################*/}
                                {this.state.colouredCubes[0] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeBlack} height={50} alt=""  /></Draggable>): ("")}
                                {this.state.colouredCubes[1] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeBlack} height={50} alt=""  /></Draggable>): ("")}
                                {this.state.colouredCubes[2] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeBlack} height={50} alt=""  /></Draggable>): ("")}

                                {this.state.colouredCubes[3] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeBlue} height={50} alt=""  /></Draggable>): ("")}
                                {this.state.colouredCubes[4] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeBlue} height={50} alt=""  /></Draggable>): ("")}
                                {this.state.colouredCubes[5] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeBlue} height={50} alt=""  /></Draggable>): ("")}

                                {this.state.colouredCubes[6] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeBrown} height={50} alt=""  /></Draggable>): ("")}
                                {this.state.colouredCubes[7] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeBrown} height={50} alt=""  /></Draggable>): ("")}
                                {this.state.colouredCubes[8] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeBrown} height={50} alt=""  /></Draggable>): ("")}

                                {this.state.colouredCubes[9] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeGreen} height={50} alt=""  /></Draggable>): ("")}
                                {this.state.colouredCubes[10] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeGreen} height={50} alt=""  /></Draggable>): ("")}
                                {this.state.colouredCubes[11] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeGreen} height={50} alt=""  /></Draggable>): ("")}

                                {this.state.colouredCubes[12] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeGrey} height={50} alt=""  /></Draggable>): ("")}
                                {this.state.colouredCubes[13] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeGrey} height={50} alt=""  /></Draggable>): ("")}
                                {this.state.colouredCubes[14] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeGrey} height={50} alt=""  /></Draggable>): ("")}

                                {this.state.colouredCubes[15] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeRed} height={50} alt=""  /></Draggable>): ("")}
                                {this.state.colouredCubes[16] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeRed} height={50} alt=""  /></Draggable>): ("")}
                                {this.state.colouredCubes[17] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeRed} height={50} alt=""  /></Draggable>): ("")}

                                {this.state.colouredCubes[18] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeWhite} height={50} alt=""  /></Draggable>): ("")}
                                {this.state.colouredCubes[19] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeWhite} height={50} alt=""  /></Draggable>): ("")}
                                {this.state.colouredCubes[20] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeWhite} height={50} alt=""  /></Draggable>): ("")}

                                {this.state.colouredCubes[21] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeYellow} height={50} alt=""  /></Draggable>): ("")}
                                {this.state.colouredCubes[22] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeYellow} height={50} alt=""  /></Draggable>): ("")}
                                {this.state.colouredCubes[23] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cubeYellow} height={50} alt=""  /></Draggable>): ("")}


                                {/*Blocks: ###################################################################################################################*/}
                                {this.state.blocks[0] ? (<Draggable bounds="parent" {...dragHandlers}><img src={arch} height={60} alt=""  /></Draggable>): ("")}
                                {this.state.blocks[1] ? (<Draggable bounds="parent" {...dragHandlers}><img src={archR1} height={100} alt=""  /></Draggable>): ("")}
                                {this.state.blocks[2] ? (<Draggable bounds="parent" {...dragHandlers}><img src={archR2} height={100} alt=""  /></Draggable>): ("")}

                                {this.state.blocks[3] ? (<Draggable bounds="parent" {...dragHandlers}><img src={circle} height={75} alt=""  /></Draggable>): ("")}
                                {this.state.blocks[4] ? (<Draggable bounds="parent" {...dragHandlers}><img src={square} height={75} alt=""  /></Draggable>): ("")}
                                {this.state.blocks[5] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cuboid1} height={150} alt=""  /></Draggable>): ("")}

                                {this.state.blocks[6] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cuboid2} height={150} alt=""  /></Draggable>): ("")}
                                {this.state.blocks[7] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cuboid1R} height={35} alt=""  /></Draggable>): ("")}
                                {this.state.blocks[8] ? (<Draggable bounds="parent" {...dragHandlers}><img src={cuboid2R} height={77} alt=""  /></Draggable>): ("")}

                                {this.state.blocks[9] ? (<Draggable bounds="parent" {...dragHandlers}><img src={triangle} height={70} alt=""  /></Draggable>): ("")}
                                {this.state.blocks[10] ? (<Draggable bounds="parent" {...dragHandlers}><img src={triangleR} height={70} alt=""  /></Draggable>): ("")}

                                {/*Cards: ###################################################################################################################*/}
                                {this.state.cards[0] ? (<Draggable bounds="parent" {...dragHandlers}><img src={ball} height={100} alt=""  /></Draggable>): ("")}
                                {this.state.cards[1] ? (<Draggable bounds="parent" {...dragHandlers}><img src={bird} height={100} alt=""  /></Draggable>): ("")}
                                {this.state.cards[2] ? (<Draggable bounds="parent" {...dragHandlers}><img src={bulb} height={100} alt=""  /></Draggable>): ("")}
                                {this.state.cards[3] ? (<Draggable bounds="parent" {...dragHandlers}><img src={car} height={100} alt=""  /></Draggable>): ("")}
                                {this.state.cards[4] ? (<Draggable bounds="parent" {...dragHandlers}><img src={clock} height={100} alt=""  /></Draggable>): ("")}

                                {this.state.cards[5] ? (<Draggable bounds="parent" {...dragHandlers}><img src={clover} height={100} alt=""  /></Draggable>): ("")}
                                {this.state.cards[6] ? (<Draggable bounds="parent" {...dragHandlers}><img src={face} height={100} alt=""  /></Draggable>): ("")}
                                {this.state.cards[7] ? (<Draggable bounds="parent" {...dragHandlers}><img src={fire} height={100} alt=""  /></Draggable>): ("")}
                                {this.state.cards[8] ? (<Draggable bounds="parent" {...dragHandlers}><img src={flash} height={100} alt=""  /></Draggable>): ("")}
                                {this.state.cards[9] ? (<Draggable bounds="parent" {...dragHandlers}><img src={flower} height={100} alt=""  /></Draggable>): ("")}

                                {this.state.cards[10] ? (<Draggable bounds="parent" {...dragHandlers}><img src={heart} height={100} alt=""  /></Draggable>): ("")}
                                {this.state.cards[11] ? (<Draggable bounds="parent" {...dragHandlers}><img src={house} height={100} alt=""  /></Draggable>): ("")}
                                {this.state.cards[12] ? (<Draggable bounds="parent" {...dragHandlers}><img src={poop} height={100} alt=""  /></Draggable>): ("")}
                                {this.state.cards[13] ? (<Draggable bounds="parent" {...dragHandlers}><img src={ring} height={100} alt=""  /></Draggable>): ("")}
                                {this.state.cards[14] ? (<Draggable bounds="parent" {...dragHandlers}><img src={shark} height={100} alt=""  /></Draggable>): ("")}

                                {this.state.cards[15] ? (<Draggable bounds="parent" {...dragHandlers}><img src={shirt} height={100} alt=""  /></Draggable>): ("")}
                                {this.state.cards[16] ? (<Draggable bounds="parent" {...dragHandlers}><img src={skull} height={100} alt=""  /></Draggable>): ("")}
                                {this.state.cards[17] ? (<Draggable bounds="parent" {...dragHandlers}><img src={snail} height={100} alt=""  /></Draggable>): ("")}
                                {this.state.cards[18] ? (<Draggable bounds="parent" {...dragHandlers}><img src={snow} height={100} alt=""  /></Draggable>): ("")}
                                {this.state.cards[19] ? (<Draggable bounds="parent" {...dragHandlers}><img src={sun} height={100} alt=""  /></Draggable>): ("")}

                                {/*Laces: ###################################################################################################################*/}
                                {this.state.laces[0] ? (<Draggable bounds="parent" {...dragHandlers}><img src={l1} height={90} alt=""  /></Draggable>): ("")}
                                {this.state.laces[1] ? (<Draggable bounds="parent" {...dragHandlers}><img src={l2} height={90} alt=""  /></Draggable>): ("")}
                                {this.state.laces[2] ? (<Draggable bounds="parent" {...dragHandlers}><img src={l3} height={90} alt=""  /></Draggable>): ("")}
                                {this.state.laces[3] ? (<Draggable bounds="parent" {...dragHandlers}><img src={l4} height={90} alt=""  /></Draggable>): ("")}

                                {this.state.laces[4] ? (<Draggable bounds="parent" {...dragHandlers}><img src={l5} height={90} alt=""  /></Draggable>): ("")}
                                {this.state.laces[5] ? (<Draggable bounds="parent" {...dragHandlers}><img src={l6} height={90} alt=""  /></Draggable>): ("")}
                                {this.state.laces[6] ? (<Draggable bounds="parent" {...dragHandlers}><img src={l7} height={90} alt=""  /></Draggable>): ("")}
                                {this.state.laces[7] ? (<Draggable bounds="parent" {...dragHandlers}><img src={l8} height={90} alt=""  /></Draggable>): ("")}

                                {this.state.laces[8] ? (<Draggable bounds="parent" {...dragHandlers}><img src={l9} height={90} alt=""  /></Draggable>): ("")}
                                {this.state.laces[9] ? (<Draggable bounds="parent" {...dragHandlers}><img src={l10} height={90} alt=""  /></Draggable>): ("")}
                                {this.state.laces[10] ? (<Draggable bounds="parent" {...dragHandlers}><img src={l11} height={90} alt=""  /></Draggable>): ("")}
                                {this.state.laces[11] ? (<Draggable bounds="parent" {...dragHandlers}><img src={l12} height={90} alt=""  /></Draggable>): ("")}

                                {this.state.laces[12] ? (<Draggable bounds="parent" {...dragHandlers}><img src={l13} height={90} alt=""  /></Draggable>): ("")}
                                {this.state.laces[13] ? (<Draggable bounds="parent" {...dragHandlers}><img src={l14} height={90} alt=""  /></Draggable>): ("")}
                                {this.state.laces[14] ? (<Draggable bounds="parent" {...dragHandlers}><img src={l15} height={90} alt=""  /></Draggable>): ("")}
                                {this.state.laces[15] ? (<Draggable bounds="parent" {...dragHandlers}><img src={l16} height={90} alt=""  /></Draggable>): ("")}

                                {this.state.laces[16] ? (<Draggable bounds="parent" {...dragHandlers}><img src={l17} height={90} alt=""  /></Draggable>): ("")}
                                {this.state.laces[17] ? (<Draggable bounds="parent" {...dragHandlers}><img src={l18} height={90} alt=""  /></Draggable>): ("")}
                                {this.state.laces[18] ? (<Draggable bounds="parent" {...dragHandlers}><img src={l19} height={90} alt=""  /></Draggable>): ("")}
                                {this.state.laces[19] ? (<Draggable bounds="parent" {...dragHandlers}><img src={l20} height={90} alt=""  /></Draggable>): ("")}
                            </div>

                        </Form>
                    <ButtonContainer>
                        <ButtonWhite
                            width="100%"
                            onClick={() => {
                                this.takeshot();
                            }}
                        >
                            Submit
                        </ButtonWhite>
                    </ButtonContainer>
                    </Container2>
                    <Container2>
                        <Label>SetNr</Label>
                        <EllipseH> {this.state.materialSet} </EllipseH>
                        <Form>
                            {/*{this.showMaterialset}, the correct material set should be displayed to the user*/}
                            {/*display the set of togglebuttons for the SticksnStones:*/}
                            {this.state.materialSet===1 ? (
                                <Container fluid style={{ width: '300px' }}>
                                    {/*https://www.npmjs.com/package/react-grid-system*/}
                                    {/*https://sealninja.github.io/react-grid-system/#col*/}
                                    <Row justify="around" style={{ height: '120px' }}>
                                        <img src={stick1} height={100} alt="" onClick={() => {this.toggleSticksAndStones(0)}} />
                                        <img src={stick2} height={100} alt="" onClick={() => {this.toggleSticksAndStones(1)}}/>
                                        <img src={stick3} height={100} alt="" onClick={() => {this.toggleSticksAndStones(2)}}/>
                                        <img src={stick4} height={100} alt="" onClick={() => {this.toggleSticksAndStones(3)}}/>
                                    </Row>

                                    <Row justify="around" style={{ height: '120px' }}>
                                        <img src={stick1r} height={25} alt="" onClick={() => {this.toggleSticksAndStones(4)}} />
                                        <img src={stick2r} height={25} alt="" onClick={() => {this.toggleSticksAndStones(5)}}/>
                                        <img src={stick3r} height={25} alt="" onClick={() => {this.toggleSticksAndStones(6)}}/>
                                        <img src={stick4r} height={25} alt="" onClick={() => {this.toggleSticksAndStones(7)}}/>
                                    </Row>

                                    <Row justify="around" style={{ height: '100' }}>
                                        <img src={stone1} height={50} alt="" onClick={() => {this.toggleSticksAndStones(8)}} />
                                        <img src={stone2} height={50} alt="" onClick={() => {this.toggleSticksAndStones(9)}}/>
                                        <img src={stone3} height={50} alt="" onClick={() => {this.toggleSticksAndStones(10)}}/>
                                        <img src={stone4} height={50} alt="" onClick={() => {this.toggleSticksAndStones(11)}}/>
                                    </Row>
                                </Container>
                            ): (<div></div>)}

                            {/*display the set of togglebuttons for the ColouredCubes:*/}
                            {this.state.materialSet===2 ? (
                                <Container fluid style={{ width: '200px' }}>
                                    <Row justify="around" style={{ height: '60px' }}>
                                        <img src={cubeBlack} height={50} alt="" onClick={() => {this.toggleColouredCubes(0)}} />
                                        <img src={cubeBlack} height={50} alt="" onClick={() => {this.toggleColouredCubes(1)}}/>
                                        <img src={cubeBlack} height={50} alt="" onClick={() => {this.toggleColouredCubes(2)}}/>
                                    </Row>
                                    <Row justify="around" style={{ height: '60px' }}>
                                        <img src={cubeBlue} height={50} alt="" onClick={() => {this.toggleColouredCubes(3)}} />
                                        <img src={cubeBlue} height={50} alt="" onClick={() => {this.toggleColouredCubes(4)}}/>
                                        <img src={cubeBlue} height={50} alt="" onClick={() => {this.toggleColouredCubes(5)}}/>
                                    </Row>
                                    <Row justify="around" style={{ height: '60px' }}>
                                        <img src={cubeBrown} height={50} alt="" onClick={() => {this.toggleColouredCubes(6)}} />
                                        <img src={cubeBrown} height={50} alt="" onClick={() => {this.toggleColouredCubes(7)}}/>
                                        <img src={cubeBrown} height={50} alt="" onClick={() => {this.toggleColouredCubes(8)}}/>
                                    </Row>
                                    <Row justify="around" style={{ height: '60px' }}>
                                        <img src={cubeGreen} height={50} alt="" onClick={() => {this.toggleColouredCubes(9)}} />
                                        <img src={cubeGreen} height={50} alt="" onClick={() => {this.toggleColouredCubes(10)}}/>
                                        <img src={cubeGreen} height={50} alt="" onClick={() => {this.toggleColouredCubes(11)}}/>
                                    </Row>
                                    <Row justify="around" style={{ height: '60px' }}>
                                        <img src={cubeGrey} height={50} alt="" onClick={() => {this.toggleColouredCubes(12)}} />
                                        <img src={cubeGrey} height={50} alt="" onClick={() => {this.toggleColouredCubes(13)}}/>
                                        <img src={cubeGrey} height={50} alt="" onClick={() => {this.toggleColouredCubes(14)}}/>
                                    </Row>
                                    <Row justify="around" style={{ height: '60px' }}>
                                        <img src={cubeRed} height={50} alt="" onClick={() => {this.toggleColouredCubes(15)}} />
                                        <img src={cubeRed} height={50} alt="" onClick={() => {this.toggleColouredCubes(16)}}/>
                                        <img src={cubeRed} height={50} alt="" onClick={() => {this.toggleColouredCubes(17)}}/>
                                    </Row>
                                    <Row justify="around" style={{ height: '60px' }}>
                                        <img src={cubeWhite} height={50} alt="" onClick={() => {this.toggleColouredCubes(18)}} />
                                        <img src={cubeWhite} height={50} alt="" onClick={() => {this.toggleColouredCubes(19)}}/>
                                        <img src={cubeWhite} height={50} alt="" onClick={() => {this.toggleColouredCubes(20)}}/>
                                    </Row>
                                    <Row justify="around" style={{ height: '60px' }}>
                                        <img src={cubeYellow} height={50} alt="" onClick={() => {this.toggleColouredCubes(21)}} />
                                        <img src={cubeYellow} height={50} alt="" onClick={() => {this.toggleColouredCubes(22)}}/>
                                        <img src={cubeYellow} height={50} alt="" onClick={() => {this.toggleColouredCubes(23)}}/>
                                    </Row>
                                </Container>
                            ): (<div></div>)}

                            {/*display the set of Blocks:*/}
                            {this.state.materialSet===3 ? (
                                <Container fluid style={{ width: '300px' }}>
                                    <Row justify="around" style={{ height: '110px' }}>
                                        <img src={archR1} height={100} alt="" onClick={() => {this.toggleBlocks(1)}}/>
                                        <img src={arch} height={60} alt="" onClick={() => {this.toggleBlocks(0)}} />
                                        <img src={archR2} height={100} alt="" onClick={() => {this.toggleBlocks(2)}}/>
                                    </Row>
                                    <Row justify="around" style={{ height: '100px' }}>
                                        <img src={circle} height={75} alt="" onClick={() => {this.toggleBlocks(3)}} />
                                        <img src={square} height={75} alt="" onClick={() => {this.toggleBlocks(4)}}/>
                                    </Row>
                                    <Row justify="around" style={{ height: '200px' }}>
                                        <img src={cuboid1} height={150} alt="" onClick={() => {this.toggleBlocks(5)}} />
                                        <img src={cuboid2} height={150} alt="" onClick={() => {this.toggleBlocks(6)}}/>
                                    </Row>
                                    <Row justify="around" style={{ height: '100px' }}>
                                        <img src={cuboid1R} height={35} alt="" onClick={() => {this.toggleBlocks(7)}} />
                                    </Row>
                                    <Row justify="around" style={{ height: '100px' }}>
                                        <img src={cuboid2R} height={77} alt="" onClick={() => {this.toggleBlocks(8)}}/>
                                    </Row>
                                    <Row justify="around" style={{ height: '100px' }}>
                                        <img src={triangle} height={70} alt="" onClick={() => {this.toggleBlocks(9)}} />
                                        <img src={triangleR} height={70} alt="" onClick={() => {this.toggleBlocks(10)}} />
                                    </Row>
                                </Container>
                            ): (<div></div>)}

                            {/*display the set of Cards:*/}
                            {this.state.materialSet===4 ? (
                                <Container fluid style={{ width: '300px' }}>
                                    <Row justify="around" style={{ height: '100px' }}>
                                        <img src={ball} height={100} alt="" onClick={() => {this.toggleCards(0)}} />
                                        <img src={bird} height={100} alt="" onClick={() => {this.toggleCards(1)}} />
                                        <img src={bulb} height={100} alt="" onClick={() => {this.toggleCards(2)}} />
                                        <img src={car} height={100} alt="" onClick={() => {this.toggleCards(3)}} />
                                    </Row>
                                    <Row justify="around" style={{ height: '100px' }}>
                                        <img src={clock} height={100} alt="" onClick={() => {this.toggleCards(4)}} />
                                        <img src={clover} height={100} alt="" onClick={() => {this.toggleCards(5)}} />
                                        <img src={face} height={100} alt="" onClick={() => {this.toggleCards(6)}} />
                                        <img src={fire} height={100} alt="" onClick={() => {this.toggleCards(7)}} />
                                    </Row>
                                    <Row justify="around" style={{ height: '100px' }}>
                                        <img src={flash} height={100} alt="" onClick={() => {this.toggleCards(8)}} />
                                        <img src={flower} height={100} alt="" onClick={() => {this.toggleCards(9)}} />
                                        <img src={heart} height={100} alt="" onClick={() => {this.toggleCards(10)}} />
                                        <img src={house} height={100} alt="" onClick={() => {this.toggleCards(11)}} />
                                    </Row>
                                    <Row justify="around" style={{ height: '100px' }}>
                                        <img src={poop} height={100} alt="" onClick={() => {this.toggleCards(12)}} />
                                        <img src={ring} height={100} alt="" onClick={() => {this.toggleCards(13)}} />
                                        <img src={shark} height={100} alt="" onClick={() => {this.toggleCards(14)}} />
                                        <img src={shirt} height={100} alt="" onClick={() => {this.toggleCards(15)}} />
                                    </Row>
                                    <Row justify="around" style={{ height: '100px' }}>
                                        <img src={skull} height={100} alt="" onClick={() => {this.toggleCards(16)}} />
                                        <img src={snail} height={100} alt="" onClick={() => {this.toggleCards(17)}} />
                                        <img src={snow} height={100} alt="" onClick={() => {this.toggleCards(18)}} />
                                        <img src={sun} height={100} alt="" onClick={() => {this.toggleCards(19)}} />
                                    </Row>
                                </Container>
                            ): (<div></div>)}

                            {/*display the set of Laces:*/}
                            {this.state.materialSet===5 ? (
                                <Container fluid style={{ width: '400px' }}>
                                    <Row justify="around" style={{ height: '100px' }}>
                                        <img src={l1} height={90} alt="" onClick={() => {this.toggleLaces(0)}} />
                                        <img src={l2} height={90} alt="" onClick={() => {this.toggleLaces(1)}} />
                                        <img src={l3} height={90} alt="" onClick={() => {this.toggleLaces(2)}} />
                                        <img src={l4} height={90} alt="" onClick={() => {this.toggleLaces(3)}} />
                                    </Row>
                                    <Row justify="around" style={{ height: '100px' }}>
                                        <img src={l5} height={90} alt="" onClick={() => {this.toggleLaces(4)}} />
                                        <img src={l6} height={90} alt="" onClick={() => {this.toggleLaces(5)}} />
                                        <img src={l7} height={90} alt="" onClick={() => {this.toggleLaces(6)}} />
                                        <img src={l8} height={90} alt="" onClick={() => {this.toggleLaces(7)}} />
                                    </Row>
                                    <Row justify="around" style={{ height: '100px' }}>
                                        <img src={l9} height={90} alt="" onClick={() => {this.toggleLaces(8)}} />
                                        <img src={l10} height={90} alt="" onClick={() => {this.toggleLaces(9)}} />
                                        <img src={l11} height={90} alt="" onClick={() => {this.toggleLaces(10)}} />
                                        <img src={l12} height={90} alt="" onClick={() => {this.toggleLaces(11)}} />
                                    </Row>
                                    <Row justify="around" style={{ height: '100px' }}>
                                        <img src={l13} height={90} alt="" onClick={() => {this.toggleLaces(12)}} />
                                        <img src={l14} height={90} alt="" onClick={() => {this.toggleLaces(13)}} />
                                        <img src={l15} height={90} alt="" onClick={() => {this.toggleLaces(14)}} />
                                        <img src={l16} height={90} alt="" onClick={() => {this.toggleLaces(15)}} />
                                    </Row>
                                    <Row justify="around" style={{ height: '100px' }}>
                                        <img src={l17} height={90} alt="" onClick={() => {this.toggleLaces(16)}} />
                                        <img src={l18} height={90} alt="" onClick={() => {this.toggleLaces(17)}} />
                                        <img src={l19} height={90} alt="" onClick={() => {this.toggleLaces(18)}} />
                                        <img src={l20} height={90} alt="" onClick={() => {this.toggleLaces(19)}} />
                                    </Row>
                                </Container>
                            ): (<div></div>)}

                        </Form>
                    <ButtonContainer>
                        <ButtonWhite
                            disabled={this.state.materialSet!== null}
                            width="100%"
                            onClick={() => {
                                this.getMaterialSet();
                            }}
                        >
                            Get Material Set
                        </ButtonWhite>
                    </ButtonContainer>
                    </Container2>
                </FormContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(GameviewUser);
