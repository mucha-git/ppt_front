import React from "react";
import { YearsTable } from "./elements/YearsTable";
import { NavLink } from "react-router-dom";
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
          <h2>Roczniki</h2>
        </div>
        
        {user.role == Role.Manager && <div className="d-flex justify-content-end">
          <div>
            {/* <NavLink to={{pathname: `${path}/dodaj`, pilgrimageId: user.pilgrimageId }} className="nav-item center-divs"> */}
              <MuiButton 
                icon={MuiBtnType.Add} 
                text="Dodaj nowy rocznik" 
                className="p-2 pr-4 pl-4"
                onClick={() => history.push({pathname: `${path}/dodaj`, pilgrimageId: user.pilgrimageId })} />
            {/* </NavLink> */}
          </div>
        </div>
        }
        <YearsTable path={path} />
      </div>
    </div>
  );
}

export { Overview };