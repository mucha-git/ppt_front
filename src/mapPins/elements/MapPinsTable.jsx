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
        //kolumny.KolumnaTitle(),
        kolumny.KolumnaPinSrc(),
        kolumny.KolumnaAkcje(akcje)
      ]

  return (
    <div>
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
    pagination={paginationFactory()}
    rowClasses="rowClasses"
  />
  </div>
  );
}

export { MapPinsTable };