import React, { useEffect, useState } from "react";
import BootstrapTable from "@murasoftware/react-bootstrap-table-next";
import { kolumny } from "./NotificationsColumns";
import { Actions } from "./NotificationsActions";
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";
import { oneSignalService } from "../../_services";
import { history } from "../../_helpers";

function NotificationsTable({ path }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoaded, setIsLoaded] = useState(notifications != []);
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
      setIsLoaded(x.notifications != []);
    });
  }, []);

  useEffect(() => {
    setIsLoaded(false);
    console.log(notifications);
    setIsLoaded(true);
  }, [notifications]);

  const columns = [kolumny.KolumnaData(), kolumny.KolumnaAkcje(akcje)];

  return (
    <>
      <div className="d-flex justify-content-end">
        <div className="d-flex align-items-center">
          <MuiButton
            icon={MuiBtnType.Download}
            text={"Pobierz powiadomienia"}
            className={"p-2 pr-4 pl-4"}
            onClick={() =>
              oneSignalService.getNotifications().then(setNotifications)
            }
          />
        </div>
        <div className="d-flex align-items-center">
          <MuiButton
            icon={MuiBtnType.Add}
            text="Dodaj powiadomienie"
            className="p-2 pr-4 pl-4"
            onClick={() => history.push({ pathname: `${path}/dodaj` })}
          />
        </div>
      </div>
      {isLoaded && (
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
      )}
    </>
  );
}

export { NotificationsTable };
