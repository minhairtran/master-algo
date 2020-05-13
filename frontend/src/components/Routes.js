import React from "react";
import { Route, Switch } from "react-router-dom";
import PathfindingVisualizer from "../pages/Pathfinding";
import Home from "../pages/Home";
import Error from "../pages/Error";
import User from "../pages/User";
import Profile from "../pages/Profile";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/algorithm/:slug" component={PathfindingVisualizer} />
      <Route exact path="/login-and-register" component={User} />
      <Route exact path="/profile" component={Profile} />
      <Route component={Error} />
    </Switch>
  );
};

export default Routes;
