import React from "react";
import { Route, Switch } from "react-router-dom";
import { Overview } from "./Overview";
import { AddEdit } from "./AddEdit";
import { Copy } from "./Copy";

function Years({ match }) {
  const { path } = match;

  return (
    <div className="p-4">
      <div className="container">
        <Switch>
          <Route exact path={path} component={Overview} />
          <Route path={`${path}/dodaj`} component={AddEdit} />
          <Route path={`${path}/edytuj`} component={AddEdit} />
          <Route path={`${path}/kopiuj`} component={Copy} />
        </Switch>
      </div>
    </div>
  );
}

export { Years };
