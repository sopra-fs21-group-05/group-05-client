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
The most important components of our Pictures implementation are:

- [AppRouter](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/src/components/shared/routers/AppRouter.js):
It handles the routing of the application and makes sure that only a logged in user can use the application and only users who have joined a gameroom can actually be in a game.

- [Dashboard](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/src/components/dashboard/Dashboard.js):
The Dashboard is where users decide if they want to create or join a gameroom, or log out again. It also represents the main entry point in case a problem occures within the application.

- [StartGame](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/src/components/gameroom/StartGame.js):
From here the actual game is started. 
This component lists all users that are in the gameroom and ensures that the game can be started only if there between three to five users in a gameroom. 
If a game is started by the creator of a gameroom, everyone gets redirected automatically to the game from here.

- [Game](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/src/components/game/Game.js):
The Game component sets up the game. 
Furthermore, at this point the external API is called and the grid for the game (5 rounds) is fetched.

- [GameViewUser](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/src/components/game/GameviewUser.js):
The GameViewUser component is where the actual gameplay happens. The user is assigned a set of Building Materials and a Picture here. 
With the given Set they can then recreate the picture by using simple Drag & Drop functionality. 
Furthermore, the recreation is submitted once the user clicks on submit.

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
These are the first pages of the application, that show up when you open the application. 
You can here register an account or login with an existing account, if have already registered one.
After the login, you get redirected to the dashboard, where you can decide, if you want to create or join a gameroom, or even log out again.

![login](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/Screenshots_Pictures/Login.PNG)

![registration](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/Screenshots_Pictures/Registration.png)

This page is shown if you want to create a gameroom. 
You can choose a roomname and a password in order to create a gameroom, and these will then be used by other players to access your room.

![create Gameroom](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/Screenshots_Pictures/Gameroom_Creation.png)

This page is shown if you want to join a gameroom. 
You can choose a gameroom by just clicking on the roomname in the list of available gamerooms. 
After that you will be promted to enter the password of the gameroom in order to join it.

![join Gameroom](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/Screenshots_Pictures/Gameroom_Join.png)

After creating or joining a gameroom, you will be seeing this page. 
Here, all players that are in the current gameroom are listed.
If there are between three to five players, the creator of the gameroom can start the game.
If the creator of the room leaves, a new creator is assigned randomly.

![Gameroom overview](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/Screenshots_Pictures/Gameroom_Overview.png)

Once the game has started, you will get to this page, where the grid for the ongoing game is fetched and presented. 

![setup](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/Screenshots_Pictures/Setup.png)

At this point of the application, you actually get to play the game. 
After getting your assigned picture and material set, you can try your best to recreate that picture.
Once you have done that, you can click on submit to submit the picture and proceed to the guessing part. 

![gameplay](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/Screenshots_Pictures/Gameplay.png)

Here, you have to find out which picture the other users have recreated.
After submitting your guesses to the rereations of each user, you have finished your round. 

![recreations](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/Screenshots_Pictures/Recreations.png)

Lastly, you get to see the scoreboard with the points of each user.
As soon as every reach this stage of the game, the creator of the gameroom can start the next round. 

![scoreboard](https://github.com/sopra-fs21-group-05/group-05-client/blob/main/Screenshots_Pictures/Scoreboard.png)

## Roadmap

1. Make the items to recreate the picture rotatable
2. Make the shoe lace items flexible
3. Players can "react" to other players recreations (e.g. through likes or emojis)
4. After each round, the correct solutions (recreations and corresponding grid coordinates) are displayed

## Authors and acknowledgement


**Main contributors**:  

Michelle Reiter [@Elinriel](https://github.com/Elinriel)  
Roman Stadler [@Galva101](https://github.com/Galva101)  
Kirthan Gengatharan [@kirthan98](https://github.com/kirthan98)  
Norina Braun [@Strawberry17](https://github.com/Strawberry17)  
Ashly Kolenchery [@akolen](https://github.com/akolen)  

Special thanks to our supervisor Raphael Imfeld!

## License
Apache License

Copyright [2021] [SoPra Group 05 - Pictures]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
