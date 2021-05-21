import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import Register from "../../register/Register";
import Dashboard from "../../dashboard/Dashboard";
import StartGame from "../../gameroom/StartGame";
import CreateGameroom from "../../gameroom/CreateGameroom";
import GameroomList from "../../gameroom/GameroomList";
import JoinGameroom from "../../gameroom/JoinGameroom";
import Game from "../../game/Game";
import GameviewUser from "../../game/GameviewUser";
import OverviewRecreations from "../../game/OverviewRecreations";
import Scoreboard from "../../scoreboard/Scoreboard";
import GameJoinedUser from "../../game/GameJoinedUser";
import {DashboardGuard} from "../routeProtectors/DashboardGuard";
import Winner from "../../winner/Winner";
import {GameGuard} from "../routeProtectors/GameGuard";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
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
                                <LoginGuard>
                                <Login />
                                </LoginGuard>
                            )}
                        />
                        <Route
                            path="/users"
                            exact
                            render={() => (
                                <LoginGuard>
                                <Register />
                                </LoginGuard>
                            )}
                        />
                        {/*######################################*/}
                        {/*DashboardGuards:*/}
                        <Route
                            path="/gamerooms"
                            exact
                            render={() => (
                                <DashboardGuard>
                                <CreateGameroom />
                                </DashboardGuard>
                            )}
                        />
                        <Route
                            path="/gamerooms/list"
                            exact
                            render={() => (
                                <DashboardGuard>
                                <GameroomList />
                                </DashboardGuard>
                            )}
                        />
                        <Route
                            path="/gamerooms/list/:roomId"
                            exact
                            render={() => (
                                <DashboardGuard>
                                <JoinGameroom />
                                </DashboardGuard>
                            )}
                        />
                        <Route
                            path={"/dashboard"}
                            exact
                            render={() =>
                                <DashboardGuard>
                                <Dashboard />
                                </DashboardGuard>}
                        />
                        <Route
                            path="/gamerooms/overview/:roomId"
                            exact
                            render={() => (
                                <DashboardGuard>
                                <StartGame />
                                </DashboardGuard>
                            )}
                        />
                        {/*######################################*/}
                        {/*GameGuards:*/}
                        <Route
                            exact
                            path={"/game"}
                            render={() =>
                                <GameGuard>
                                <Game />
                                </GameGuard>}
                        />
                        <Route
                            path="/game/:gameId/:userId"
                            exact
                            render={() => (
                                <GameGuard>
                                <GameviewUser />
                                </GameGuard>
                            )}
                        />
                        <Route
                            path="/game/recreations/overview/:gameId"
                            exact
                            render={() => (
                                <GameGuard>
                                <OverviewRecreations />
                                </GameGuard>
                            )}
                        />
                        <Route
                            path="/scoreboards/:gameId"
                            exact
                            render={() => (
                                <GameGuard>
                                <Scoreboard />
                                </GameGuard>
                            )}
                        />
                        <Route
                            path="/game/view/grid/:gameId"
                            exact
                            render={() => (
                                <GameGuard>
                                <GameJoinedUser />
                                </GameGuard>
                            )}
                        />
                        <Route
                            path="/game/ranking/winners/:gameId"
                            exact
                            render={() => (
                                <GameGuard>
                                    <Winner />
                                </GameGuard>
                            )}
                        />
                        <Route path="/" exact render={() => <Redirect to={"/login"} />} />
                    </div>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
