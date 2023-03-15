import React, { useContext } from "react";
import BootstrapTable from "@murasoftware/react-bootstrap-table-next";
import paginationFactory from "@murasoftware/react-bootstrap-table2-paginator";
import filterFactory, {textFilter} from "@murasoftware/react-bootstrap-table2-filter";
import {kolumny} from './MapsColumns'
import {Actions} from './MapsActions';
import { AppContext } from '../../_helpers/context';

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
        kolumny.KolumnaMapSrc(),
        kolumny.KolumnaAkcje(akcje)
      ]

  return (
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
    pagination={paginationFactory()}
    rowClasses="rowClasses"
  />
  );
}

export { MapsTable };