import React, { useContext, useEffect } from "react";
import BootstrapTable from "@murasoftware/react-bootstrap-table-next";
import paginationFactory from "@murasoftware/react-bootstrap-table2-paginator";
import filterFactory, {textFilter} from "@murasoftware/react-bootstrap-table2-filter";
import {kolumny} from './YearsColumns'
import {Actions} from './YearsActions';
import { AppContext } from '../../_helpers/context';

function YearsTable({ path }) {
    const { years, isSet } = useContext(AppContext);
    useEffect(() => {
        isSet()
    }, [])

const akcje = (cell, row, rowIndex) => {
        return (
          <Actions cell={cell} row={row} path={path} />
        );
      };

    const columns = [
        kolumny.KolumnaImgSrc(),
        kolumny.KolumnaAkcje(akcje)
      ]

  return (
    <BootstrapTable
    bootstrap4
    keyField="id"
    data={years}
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

export { YearsTable };