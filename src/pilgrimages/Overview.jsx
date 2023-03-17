import React from "react";
import { PilgrimagesTable } from "./elements/PilgrimagesTable";
import { NavLink } from "react-router-dom";
import MuiButton from "../_components/MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";
import { accountService, pilgrimagesService } from "../_services";
import { Role } from "../_helpers";

function Overview({ match }) {
  const { path } = match;
  const user = accountService.userValue;
  return (
    <div className="p-4 box-shadow-main">
      <div className="container">
        <div>
          <h2>Pielgrzymki</h2>
        </div>
        {user.role != Role.Admin &&<div><MuiButton icon={MuiBtnType.Send} text={"Wyślij powiadomienie"} className={"p-2 pr-4 pl-4"} onClick={() => pilgrimagesService.postMessage({name: "nazwa", content: "wiadomość"})} /></div>}
        {user.role == Role.Admin && <div className="d-flex justify-content-end">
          <div>
            <NavLink to={{pathname: `${path}/dodaj`}} className="nav-item center-divs">
              <MuiButton icon={MuiBtnType.Add} text="Dodaj nową pielgrzymkę" className="p-2 pr-4 pl-4" />
            </NavLink>
          </div>
        </div>
        }
        <PilgrimagesTable path={path} />
      </div>
    </div>
  );
}

export { Overview };