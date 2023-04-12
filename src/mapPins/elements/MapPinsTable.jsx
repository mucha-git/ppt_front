import React, { useContext } from "react";
import BootstrapTable from "@murasoftware/react-bootstrap-table-next";
import paginationFactory from "@murasoftware/react-bootstrap-table2-paginator";
import { kolumny } from "./MapPinsColumns";
import { Actions } from "./MapPinsActions";
import { AppContext } from "../../_helpers/context";

function MapPinsTable({ yearId, path }) {
  const { mapPins } = useContext(AppContext);
  function viewFilter(e) {
    return e.filter((v) => v.yearId == yearId);
  }

  const akcje = (cell, row, rowIndex) => {
    return <Actions cell={cell} row={row} path={path} />;
  };

  const columns = [kolumny.KolumnaPinSrc(), kolumny.KolumnaAkcje(akcje)];

  return (
    <div>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={viewFilter(mapPins)}
        columns={columns}
        hover
        condensed
        pagination={paginationFactory()}
        rowClasses="rowClasses"
      />
    </div>
  );
}

export { MapPinsTable };
