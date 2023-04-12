import React from "react";
import { ViewsTable } from "../ViewsTable";

function ListScreen({ view, path }) {
  return (
    <div>
      <div className="container">
        <ViewsTable parentViewId={view.id} yearId={view.yearId} path={path} />
      </div>
    </div>
  );
}

export { ListScreen };
