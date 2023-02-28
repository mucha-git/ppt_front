import React, { useContext, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { NavLink } from "react-router-dom";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {textFilter} from "react-bootstrap-table2-filter";
import {kolumny} from './PilgrimagesColumns'
import {Actions} from './PilgrimagesActions';
import { AppContext } from '../../_helpers/context';

function PilgrimagesTable({ path }) {
    const { pilgrimages, isSet } = useContext(AppContext);
    useEffect(() => {
        isSet()
    }, [])

const akcje = (cell, row, rowIndex) => {
        return (
          <Actions cell={cell} row={row} path={path} />
        );
      };

    const columns = [
        kolumny.KolumnaName(textFilter),
        kolumny.KolumnaIsActive(),
        kolumny.KolumnaLogoSrc(),
        kolumny.KolumnaAkcje(akcje)
      ]

    const emptyTable = () => {
        return (
          <div>
              <p>
                Brak Pielgrzymek
              </p>
          </div>
        );
      };
  return (
    <div>
    <NavLink to={{pathname: `${path}/dodaj`}} className="nav-item center-divs">
          <button className="button edytuj m-2">
            Dodaj nową pielgrzymkę
          </button>
        </NavLink>
    <BootstrapTable
    bootstrap4
    keyField="id"
    data={pilgrimages}
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

export { PilgrimagesTable };