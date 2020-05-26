import React from "react";
import { Route, Switch } from "react-router-dom";
import PathfindingVisualizer from "../pages/Pathfinding";
import Home from "../pages/Home";
import Error from "../pages/Error";
import User from "../pages/User";
import Profile from "../pages/Profile";

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/algorithms/:slug" component={PathfindingVisualizer} />
      <Route exact path="/login-and-register" component={User} />
      <Route
        exact
        path="/profile"
        component={() => <Profile dataset={props.dataset}/>}
      />
      <Route component={Error} />
    </Switch>
  );
};

export default Routes;
