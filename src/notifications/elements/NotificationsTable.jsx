import React, { useContext, useEffect, useState } from "react";
import BootstrapTable from "@murasoftware/react-bootstrap-table-next";
import paginationFactory from "@murasoftware/react-bootstrap-table2-paginator";
import filterFactory, {textFilter} from "@murasoftware/react-bootstrap-table2-filter";
import {kolumny} from './NotificationsColumns'
import {Actions} from './NotificationsActions';
import { NavLink } from "react-router-dom";
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";
import { accountService, oneSignalService } from "../../_services";
import moment from 'moment';

function NotificationsTable({ path }) {
  const user = accountService.userValue;
  const [notifications, setNotifications] = useState({notifications: []})
  const akcje = (cell, row, rowIndex) => {
      return (
        <Actions cell={cell} row={row} path={path} />
      );
    };
  
  useEffect(() => {
    oneSignalService.getNotifications().then(setNotifications)
  }, [])

  const columns = [
        kolumny.KolumnaData(),
        kolumny.KolumnaAkcje(akcje)
    ]

  return (
    <>
      <div className="d-flex justify-content-end">
        <div>
          <MuiButton 
            icon={MuiBtnType.Upload} 
            text={"Wyślij powiadomienie"} 
            className={"p-2 pr-4 pl-4"} 
            onClick={
              () => oneSignalService
                .create({name: "nazwa", 
                        contents: { en:"wiadomość"}, 
                        headings: {en: "Nagłówek nowy" }, 
                        app_id: user.oneSignalAppId,
                        included_segments: ['Subscribed Users'],
                        send_after: moment(Date.now()).add(3 , 'm').format() })
                .then(() => oneSignalService.getNotifications().then(setNotifications))} 
          />
        </div>
        <div>
          <MuiButton 
            icon={MuiBtnType.Download} 
            text={"pobierz powiadomienia"} 
            className={"p-2 pr-4 pl-4"} 
            onClick={() => oneSignalService.getNotifications().then(setNotifications)} 
          />
        </div>
        <div>
          <NavLink to={{pathname: `${path}/dodaj`}} className="nav-item center-divs">
            <MuiButton icon={MuiBtnType.Add} text="Dodaj powiadomienie" className="p-2 pr-4 pl-4" />
          </NavLink>
        </div>
      </div>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={notifications.notifications}
        columns={columns}
        filter={filterFactory()}
        filterPosition="top"
        filtersClasses="top-filter-class"
        hover
        condensed
        //pagination={paginationFactory()}
        rowClasses="rowClasses"
      />
    </>
  );
}

export { NotificationsTable };