import React, { useContext, useEffect } from "react";
import BootstrapTable from "@murasoftware/react-bootstrap-table-next";
import paginationFactory from "@murasoftware/react-bootstrap-table2-paginator";
import { kolumny } from "./PilgrimagesColumns";
import { Actions } from "./PilgrimagesActions";
import { AppContext } from "../../_helpers/context";

function PilgrimagesTable({ path }) {
  const { pilgrimages, isSet } = useContext(AppContext);
  useEffect(() => {
    isSet();
  }, []);

  const akcje = (cell, row, rowIndex) => {
    return <Actions cell={cell} row={row} path={path} />;
  };

  const columns = [kolumny.KolumnaLogoSrc(), kolumny.KolumnaAkcje(akcje)];

  return (
    <BootstrapTable
      bootstrap4
      keyField="id"
      data={pilgrimages}
      columns={columns}
      hover
      condensed
      pagination={paginationFactory()}
      rowClasses="rowClasses"
    />
  );
}

export { PilgrimagesTable };
