import React from "react";
import { Route, Switch } from "react-router-dom";
import { AddEdit } from "./AddEdit";

function Elements({ match }) {
  const { path } = match;

  return (
    <div className="p-4">
      <div className="container">
          <Switch>
            <Route path={`${path}/dodaj`} component={AddEdit} />
            <Route path={`${path}/edytuj`} component={AddEdit} />
          </Switch>
      </div>
    </div>
  );
}

export { Elements };