import React from "react";
import { MapsTable } from "../MapsTable";

function ListScreen({ view, path }) {

  return (
        <div className={"pt-20 pb-20"}>
          <div className="container">
            <MapsTable parentViewId={view.id} yearId={view.yearId} path={path}  />
          </div>
        </div>
  );
}

export { ListScreen };