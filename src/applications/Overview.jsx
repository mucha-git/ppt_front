import React from "react";
import { ApplicationsTable } from "./elements/ApplicationsTable";
import MuiButton from "../_components/MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";
import { accountService } from "../_services";
import { Role, history } from "../_helpers";

function Overview({ match }) {
  const { path } = match;
  const user = accountService.userValue;
  return (
    <div className="p-4 box-shadow-main">
      <div className="container">
        <div>
          <h2>Aplikacje</h2>
        </div>
        {user.role == Role.Admin && (
          <div className="d-flex justify-content-end">
            <div className="d-flex align-items-center">
              <MuiButton
                icon={MuiBtnType.Add}
                text="Dodaj nową aplikację"
                className="p-2 pr-4 pl-4"
                onClick={() => history.push({ pathname: `${path}/dodaj` })}
              />
            </div>
          </div>
        )}
        <ApplicationsTable path={path} />
      </div>
    </div>
  );
}

export { Overview };
