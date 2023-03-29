import React from "react";
import { PilgrimagesTable } from "./elements/PilgrimagesTable";
import { NavLink } from "react-router-dom";
import MuiButton from "../_components/MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";
import { accountService, oneSignalService } from "../_services";
import { Role } from "../_helpers";
import moment from 'moment';

function Overview({ match }) {
  const { path } = match;
  const user = accountService.userValue;
  return (
    <div className="p-4 box-shadow-main">
      <div className="container">
        <div>
          <h2>Pielgrzymki</h2>
        </div>
        {user.role != Role.Admin &&
          <div>
            <MuiButton 
              icon={MuiBtnType.Send} 
              text={"Wyślij powiadomienie"} 
              className={"p-2 pr-4 pl-4"} 
              onClick={
                () => oneSignalService
                        .create({name: "nazwa", 
                                contents: { en:"wiadomość"}, 
                                headings: {en: "Nagłówek nowy" }, 
                                app_id: user.oneSignalAppId,
                                included_segments: ['Subscribed Users'],
                                send_after: moment(new Date()).add(3 , 'm').format() })} />
          </div>
        }
        {user.role != Role.Admin &&<div><MuiButton icon={MuiBtnType.Send} text={"pobierz powiadomienia"} className={"p-2 pr-4 pl-4"} onClick={() => oneSignalService.getNotifications()} /></div>}
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