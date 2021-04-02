import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import {RegisterGuard} from "../routeProtectors/RegisterGuard";
import Register from "../../register/Register";
import {GameroomGuard} from "../routeProtectors/GameroomGuard";
import Gameroom from "../../gameroom/Gameroom"
import Game from "../../game/Game";
import Dashboard from "../../dashboard/Dashboard";

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
                            path="/game"
                            render={() => (
                                <GameGuard>
                                    <GameRouter base={"/game"} />
                                </GameGuard>
                            )}
                        />
                        <Route
                            path="/login"
                            exact
                            render={() => (
                                <LoginGuard>
                                    <Login />
                                </LoginGuard>
                            )}
                        />
                        <Route
                            path="/register"
                            exact
                            render={() => (
                                <RegisterGuard>
                                    <Register />
                                </RegisterGuard>
                            )}
                        />
                        <Route
                            path="/gamerooms"
                            exact
                            render={() => (
                                <GameroomGuard>
                                    <Gameroom />
                                </GameroomGuard>
                            )}
                        />
                        <Route
                            exact
                            path={"/dashboard"}
                            render={() => <Dashboard />}
                        />
                        <Route
                        />
                        <Route path="/" exact render={() => <Redirect to={"/game"} />} />
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
