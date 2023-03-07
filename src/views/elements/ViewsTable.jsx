import React, { useContext, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { NavLink } from "react-router-dom";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
    selectFilter,
  textFilter
} from "react-bootstrap-table2-filter";
import {kolumny} from './ViewsColumns'
import {Actions} from './ViewActions';
import { Elements } from "./Elements";
import { AppContext } from '../../_helpers/context';
import SendToApp from "../../_components/SendToApp";

function ViewsTable({ parentViewId, yearId, path }) {
    const { views } = useContext(AppContext);
    
    function viewFilter(e) {
        return e.filter(v => v.viewId == parentViewId)
      }

const akcje = (cell, row, rowIndex) => {
        return (
          <Actions cell={cell} row={row} path={path} />
        );
      };

    const columns = [
        kolumny.KolumnaWidok(),
        kolumny.KolumnaAkcje(akcje)
      ]

    const emptyTable = () => {
        return (
          <div>
              <p>
                Brak widoków
              </p>
          </div>
        );
      };

      const rowsNotToExpand = () => {
        let rows = viewFilter(views).filter(r => r.type != "Text" && r.type != "Graphic").map(e => e.id)

        return rows
      }

    const expandRow = {
        parentClassName: "parent-expand-foo",
        className: "blue-light",
        onlyOneExpanding: true,
        nonExpandable: rowsNotToExpand(),
        renderer: (row) => (
            <Elements view={row} path={path} />
        )
      };

      const options = {
        sizePerPageList: [{
          text: '25', value: 25
        }, {
          text: '50', value: 50
        }] 
      };

  return (
    <div>
    <NavLink to={{pathname: `${path}/dodaj`, state: {yearId: yearId, parentViewId: parentViewId} }} className="nav-item center-divs">
          <button className="btn m-1 btn-success">
            Dodaj nowy widok
          </button>
        </NavLink>
        <SendToApp />
    <BootstrapTable
    bootstrap4
    keyField="id"
    data={viewFilter(views)}
    columns={columns}
    filter={filterFactory()}
    filterPosition="top"
    filtersClasses="top-filter-class"
    hover
    condensed
    noDataIndication={emptyTable}
    pagination={paginationFactory(options)}
    expandRow={expandRow}
  />
  </div>
  );
}

export { ViewsTable };