import React, { useContext, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { NavLink } from "react-router-dom";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
    selectFilter,
  textFilter
} from "react-bootstrap-table2-filter";
import {kolumny} from './ElementsColumns'
import {Actions} from './ElementActions';
import { Elements } from "../../views/elements/Elements";
import { AppContext } from '../../_helpers/context';

function ElementsTable({ parentViewId, yearId, path }) {
    const { elements, views, isSet } = useContext(AppContext);
    useEffect(() => {
        isSet(yearId)
    }, [])
    function viewFilter(e) {
        return e.filter(v => v.viewId == parentViewId)
      }
      
const akcje = (cell, row, rowIndex) => {
        return (
          <Actions cell={cell} row={row} path={"/elements"} />
        );
      };

    const columns = [
        kolumny.KolumnaElement(),
        kolumny.KolumnaAkcje(akcje)
      ]

    const emptyTable = () => {
        return (
          <div>
              <p>
                Brak elementów
              </p>
          </div>
        );
      };

      const rowsNotToExpand = () => {
        let rows = viewFilter(elements).filter(r => r.type != "Navigation").map(e => e.id)
        return rows
      }

    const expandRowElement = {
        parentClassName: "parent-expand-foo",
        className: "blue-light",
        onlyOneExpanding: true,
        nonExpandable: rowsNotToExpand(),
        renderer: (row) => {
          let view = views.find(v => v.id == row.destinationViewId)
          return <Elements view={view} path={"/elements"} />
        }
      };

  return (
    <div>
    <NavLink to={{pathname: `/elements/dodaj`, state: {yearId: yearId, parentViewId: parentViewId} }} className="nav-item center-divs">
          <button className="button edytuj m-2">
            Dodaj nowy element
          </button>
        </NavLink>
    <BootstrapTable
    bootstrap4
    keyField="id"
    data={viewFilter(elements)}
    columns={columns}
    filter={filterFactory()}
    filterPosition="top"
    filtersClasses="top-filter-class"
    hover
    condensed
    noDataIndication={emptyTable}
    pagination={paginationFactory()}
    expandRow={expandRowElement}
  />
  </div>
  );
}

export { ElementsTable };