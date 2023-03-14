import React, { useContext, useEffect } from "react";
import BootstrapTable from "@murasoftware/react-bootstrap-table-next";
import { NavLink } from "react-router-dom";
import paginationFactory from "@murasoftware/react-bootstrap-table2-paginator";
import filterFactory, {textFilter} from "@murasoftware/react-bootstrap-table2-filter";
import {kolumny} from './PilgrimagesColumns'
import {Actions} from './PilgrimagesActions';
import { AppContext } from '../../_helpers/context';
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";

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
        kolumny.KolumnaName(),
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
      <div class="d-flex justify-content-center mt-3">
    <NavLink to={{pathname: `${path}/dodaj`}} className="nav-item center-divs">
      <MuiButton icon={MuiBtnType.Add} text="Dodaj nową pielgrzymkę" className="p-2 pr-4 pl-4" />
        </NavLink>
        </div>
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
    //noDataIndication={emptyTable}
    pagination={paginationFactory()}
    //expandRow={expandRow}

    rowClasses="rowClasses"
  />
  </div>
  );
}

export { PilgrimagesTable };