import React, { useContext } from "react";
import BootstrapTable from "@murasoftware/react-bootstrap-table-next";
import { NavLink } from "react-router-dom";
import paginationFactory from "@murasoftware/react-bootstrap-table2-paginator";
import filterFactory, {textFilter} from "@murasoftware/react-bootstrap-table2-filter";
import {kolumny} from './MapsColumns'
import {Actions} from './MapsActions';
import { AppContext } from '../../_helpers/context';
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";

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
      <MuiButton icon={MuiBtnType.Add} text="Dodaj nową mapę" className="p-2 pr-4 pl-4" />
    </NavLink>
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