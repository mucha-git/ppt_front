import React from "react";
import { ElementsTable } from "../../../elements/elements/ElementsTable";

function TextScreen({ view, path }) {

  return (
        <div className={"pt-20 pb-20"}>
          <div className="container">
            <ElementsTable parentViewId={view.id} yearId={view.yearId} path={path} />
          </div>
        </div>
  );
}

export { TextScreen };