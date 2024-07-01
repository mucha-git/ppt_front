import React, { useEffect, useState } from "react";
import BootstrapTable from "@murasoftware/react-bootstrap-table-next";
import { kolumny } from "./NotificationsColumns";
import { Actions } from "./NotificationsActions";
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";
import { oneSignalService } from "../../_services";
import { history } from "../../_helpers";
import { LinearProgress } from "@mui/material";

function NotificationsTable({ path }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const akcje = (cell, row, rowIndex) => {
    return (
      <Actions
        cell={cell}
        row={row}
        path={path}
        setNotifications={setNotifications}
      />
    );
  };

  useEffect(() => {
    oneSignalService.getNotifications().then((x) => {
      setNotifications(x.notifications);
      setIsLoaded(true);
    });
  }, []);

  const columns = [kolumny.KolumnaData(), kolumny.KolumnaAkcje(akcje)];

  return (
    <>
      <div className="d-flex justify-content-end">
        <div className="d-flex align-items-center">
          <MuiButton
            icon={MuiBtnType.Download}
            text={"Pobierz powiadomienia"}
            className={"p-2 pr-4 pl-4 webBtn"}
            disabled={!isLoaded}
            onClick={() =>{
              setIsLoaded(false)
              oneSignalService.getNotifications().then(x => setNotifications(x.notifications)).then(y => setIsLoaded(true))
            }
              
            }
          />
          <MuiButton
            icon={MuiBtnType.Download}
            text={""}
            className={"p-2 pr-4 pl-4 mobileBtn"}
            disabled={!isLoaded}
            onClick={() =>{
              setIsLoaded(false)
              oneSignalService.getNotifications().then(x => setNotifications(x.notifications)).then(y => setIsLoaded(true))
            }
              
            }
          />
        </div>
        <div className="d-flex align-items-center">
          <MuiButton
            icon={MuiBtnType.Add}
            text="Dodaj powiadomienie"
            className="p-2 pr-4 pl-4 webBtn"
            onClick={() => history.push({ pathname: `${path}/dodaj` })}
          />
          <MuiButton
            icon={MuiBtnType.Add}
            text=""
            className="p-2 pr-4 pl-4 mobileBtn"
            onClick={() => history.push({ pathname: `${path}/dodaj` })}
          />
        </div>
      </div>
      {isLoaded? (
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={notifications}
          columns={columns}
          filterPosition="top"
          filtersClasses="top-filter-class"
          hover
          condensed
          rowClasses="rowClasses"
        />
      ):
      <LinearProgress className="m-5" />
      }
    </>
  );
}

export { NotificationsTable };
