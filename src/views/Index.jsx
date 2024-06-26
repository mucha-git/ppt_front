import React from "react";
import { Route, Switch } from "react-router-dom";
import { Overview } from "./Overview";
import { AddEdit } from "./AddEdit";

function Views({ match }) {
  const { path } = match;

  return (
    <div className="pad-4">
      <div className="container">
        <Switch>
          <Route exact path={path} component={Overview} />
          <Route path={`${path}/dodaj`} component={AddEdit} />
          <Route path={`${path}/edytuj`} component={AddEdit} />
        </Switch>
      </div>
    </div>
  );
}

export { Views };
