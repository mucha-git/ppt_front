import React from "react";
import { YearsTable } from "./elements/YearsTable";
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
          <h2>Wydarzenia</h2>
        </div>

        {user.role == Role.Manager && (
          <div className="d-flex justify-content-end">
            <div className="d-flex align-items-center">
              <MuiButton
                icon={MuiBtnType.Add}
                text="Dodaj nowe wydarzenie"
                className="p-2 pr-4 pl-4"
                onClick={() =>
                  history.push({
                    pathname: `${path}/dodaj`,
                    pilgrimageId: user.pilgrimageId,
                  })
                }
              />
            </div>
          </div>
        )}
        <YearsTable path={path} />
      </div>
    </div>
  );
}

export { Overview };
