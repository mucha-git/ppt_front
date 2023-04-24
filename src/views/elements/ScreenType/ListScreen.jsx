import React from "react";
import { ViewsTable } from "../ViewsTable";

function ListScreen({ view, path, opened }) {
  return (
    <div>
      <div className="container">
        <ViewsTable parentViewId={view.id} yearId={view.yearId} path={path} opened={opened} />
      </div>
    </div>
  );
}

export { ListScreen };
