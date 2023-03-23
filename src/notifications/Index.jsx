import React from "react";
import { Route, Switch } from "react-router-dom";
import { Overview } from "./Overview";
import { AddEdit } from "./AddEdit";

function Notifications({ match }) {
  const { path } = match;

  return (
    <div className="p-4">
      <div className="container">
          <Switch>
            <Route exact path={path} component={Overview} />
            <Route path={`${path}/dodaj`} component={AddEdit} />
          </Switch>
      </div>
    </div>
  );
}

export { Notifications };