# SoPra FS21 - Pictures Client 

## Introduction
The goal of this project was to create an online version of the board game Pictures. 
The online version follows all main [Pictures game rules](https://www.riograndegames.com/wp-content/uploads/2020/04/Pictures_Rules_EN_web_1.2.pdf).
The project uses an external API [Pixabay](https://pixabay.com/api/docs/) to retrieve the images for the picture grid.
An additional feature implemented in the online version, in order to make it more challenging, is that winners of a game are restricted for the next game in terms of the material sets they get to recreate a picture.

The implementation was done as a part of the 'SoPra' course at the University of Zurich.

## Technologies
-   React JS - User interface
-   npm - Package management
-   Heroku - Deployment platform
-   SonarQube - Code analysis

## High-level Components


## Launch & Development

For your local development environment you'll need Node.js >= 8.10. You can download it [here](https://nodejs.org). All other dependencies including React get installed with:

### `npm install`

This has to be done before starting the application for the first time (only once).

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console (use Google Chrome!).

### `npm run test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

> For macOS user running into an 'fsevents' error: https://github.com/jest-community/vscode-jest/issues/423

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Illustrations

![login](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/Screenshots_Pictures/Login.PNG)

![registration](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/Screenshots_Pictures/Registration.png)

![create Gameroom](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/Screenshots_Pictures/Gameroom_Creation.png)

![join Gameroom](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/Screenshots_Pictures/Gameroom_Join.png)

![Gameroom overview](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/Screenshots_Pictures/Gameroom_Overview.png)

![setup](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/Screenshots_Pictures/Setup.png)

![gameplay](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/Screenshots_Pictures/Gameplay.png)

![recreations](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/Screenshots_Pictures/Recreations.png)

![scoreboard](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/Screenshots_Pictures/Scoreboard.png)

## Roadmap

1. Make the items to recreate the picture rotatable
2. Make the shoe lace items flexible

## Authors and acknowledgement


**Main contributors**:  

Michelle Reiter [@Elinriel](https://github.com/Elinriel)  
Roman Stadler [@Galva101](https://github.com/Galva101)  
Kirthan Gengatharan [@kirthan98](https://github.com/kirthan98)  
Norina Braun [@Strawberry17](https://github.com/Strawberry17)  
Ashly Kolenchery [@akolen](https://github.com/akolen)  

Special thanks to our supervisor Raphael Imfeld!

## License
MIT License

Copyright (c) [2021] [SoPra Group 05 - Pictures]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


