import React, { useContext, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { NavLink } from "react-router-dom";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {textFilter} from "react-bootstrap-table2-filter";
import {kolumny} from './MapsColumns'
import {Actions} from './MapsActions';
import { Elements } from "./Elements";
import { AppContext } from '../../_helpers/context';
import { yearsService } from "../../_services";
import SendToApp from "../../_components/SendToApp";

function MapsTable({ yearId, path }) {
    const { maps } = useContext(AppContext);
    function viewFilter(e) {
        return e.filter(v => v.yearId == yearId)
      }

const akcje = (cell, row, rowIndex) => {
        return (
          <Actions cell={cell} row={row} path={path} />
        );
      };

    const columns = [
        //kolumny.KolumnaTitle(textFilter),
        //kolumny.KolumnaHeaderText(textFilter),
        //kolumny.KolumnaWidok(),
        //kolumny.KolumnaType(selectFilter),
        //kolumny.KolumnaScreenType(selectFilter),
        kolumny.KolumnaMapSrc(),
        //kolumny.KolumnaParentView(selectFilter, viewFilter(views)),
        kolumny.KolumnaAkcje(akcje)
      ]

      
    

    const emptyTable = () => {
        return (
          <div>
              <p>
                Brak Map
              </p>
          </div>
        );
      };

      /*const rowsNotToExpand = () => {
        let rows = viewFilter(views).filter(r => r.type != "Text" && r.type != "Graphic").map(e => e.id)
        return rows
      }*/

    /*const expandRow = {
        parentClassName: "parent-expand-foo",
        className: "blue-light",
        onlyOneExpanding: true,
        nonExpandable: rowsNotToExpand(),
        renderer: (row) => (
            <Elements view={row} path={path} />
        )
      };
*/


  return (
    <div>
    <NavLink to={{pathname: `${path}/dodaj`, state: {yearId: yearId } }} className="nav-item center-divs">
          <button className="button edytuj m-2">
            Dodaj nową mapę
          </button>
        </NavLink>
        <SendToApp />
    <BootstrapTable
    bootstrap4
    keyField="id"
    data={viewFilter(maps)}
    columns={columns}
    filter={filterFactory()}
    filterPosition="top"
    filtersClasses="top-filter-class"
    hover
    condensed
    noDataIndication={emptyTable}
    pagination={paginationFactory()}
    //expandRow={expandRow}
  />
  </div>
  );
}

export { MapsTable };