import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import {RegisterGuard} from "../routeProtectors/RegisterGuard";
import Register from "../../register/Register";
import Dashboard from "../../dashboard/Dashboard";
import StartGame from "../../gameroom/StartGame";
import CreateGameroom from "../../gameroom/CreateGameroom";
import GameroomList from "../../gameroom/GameroomList";
import JoinGameroom from "../../gameroom/JoinGameroom";
import Game from "../../game/Game";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */

/*Dashboard will need to be behind a guard later on!
*/
class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <div>
                        <Route
                            path="/login"
                            exact
                            render={() => (
                                <Login />
                            )}
                        />
                        <Route
                            path="/users"
                            exact
                            render={() => (
                                <Register />
                            )}
                        />
                        <Route
                            path="/gamerooms"
                            exact
                            render={() => (
                                <CreateGameroom />
                            )}
                        />
                        <Route
                            path="/gamerooms/list"
                            exact
                            render={() => (
                                <GameroomList />
                            )}
                        />
                        <Route
                            path="/gamerooms/list/:roomId"
                            exact
                            render={() => (
                                <JoinGameroom />
                            )}
                        />
                        <Route
                            exact
                            path={"/dashboard"}
                            render={() => <Dashboard />}
                        />
                        <Route
                            path="/gamerooms/overview/:roomId"
                            exact
                            render={() => (
                                <StartGame />
                            )}
                        />
                        <Route
                        />
                        <Route
                            exact
                            path={"/game"}
                            render={() => <Game />}
                        />
                        <Route
                        />

                        <Route path="/" exact render={() => <Redirect to={"/login"} />} />
                    </div>
                </Switch>
            </BrowserRouter>
        );
    }
}
/*
* Don't forget to export your component!
 */
export default AppRouter;
