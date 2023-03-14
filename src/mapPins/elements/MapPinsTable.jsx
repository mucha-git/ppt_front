import React, { useContext, useEffect } from "react";
import BootstrapTable from "@murasoftware/react-bootstrap-table-next";
import { NavLink } from "react-router-dom";
import paginationFactory from "@murasoftware/react-bootstrap-table2-paginator";
import filterFactory, {textFilter} from "@murasoftware/react-bootstrap-table2-filter";
import {kolumny} from './MapPinsColumns'
import {Actions} from './MapPinsActions';
import { AppContext } from '../../_helpers/context';
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";

function MapPinsTable({ yearId, path }) {
    const { mapPins } = useContext(AppContext);
    function viewFilter(e) {
        return e.filter(v => v.yearId == yearId)
      }

const akcje = (cell, row, rowIndex) => {
        return (
          <Actions cell={cell} row={row} path={path} />
        );
      };

    const columns = [
        kolumny.KolumnaTitle(),
        kolumny.KolumnaPinSrc(),
        kolumny.KolumnaAkcje(akcje)
      ]

      
    

    const emptyTable = () => {
        return (
          <div>
              <p>
                Brak Pinesek Map
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
      <div class="d-flex justify-content-center mt-3">
        <NavLink to={{pathname: `${path}/dodaj`, state: {yearId: yearId } }} className="nav-item center-divs">
          <MuiButton icon={MuiBtnType.Add} text="Dodaj nową pinezkę" className="p-2 pr-4 pl-4" />
        </NavLink>
      </div>
    <BootstrapTable
    bootstrap4
    keyField="id"
    data={viewFilter(mapPins)}
    columns={columns}
    filter={filterFactory()}
    filterPosition="top"
    filtersClasses="top-filter-class"
    hover
    condensed
    //noDataIndication={emptyTable}
    pagination={paginationFactory()}
    //expandRow={expandRow}
    rowClasses="rowClasses"
  />
  </div>
  );
}

export { MapPinsTable };