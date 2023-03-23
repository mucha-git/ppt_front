import React from "react";
import { NotificationsTable } from "./elements/NotificationsTable";

function Overview({ match }) {
  const { path } = match;
  return (
    <div className="p-4 box-shadow-main">
      <div className="container">
        <div>
          <h2>Powiadomienia</h2>
        </div>
        <NotificationsTable path={path} />
      </div>
    </div>
  );
}

export { Overview };