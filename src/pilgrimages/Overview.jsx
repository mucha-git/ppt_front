import React from "react";
import { PilgrimagesTable } from "./elements/PilgrimagesTable";

function Overview({ match }) {
  const { path } = match;

  return (
    <div className="p-4">
      <div className="container">
        <PilgrimagesTable path={path} />
      </div>
    </div>
  );
}

export { Overview };