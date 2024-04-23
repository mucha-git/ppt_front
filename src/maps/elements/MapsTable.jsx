import React, { useContext, useEffect, useState } from "react";
import BootstrapTable from "@murasoftware/react-bootstrap-table-next";
import paginationFactory from "@murasoftware/react-bootstrap-table2-paginator";
import { kolumny } from "./MapsColumns";
import { Actions } from "./MapsActions";
import { AppContext } from "../../_helpers/context";

function MapsTable({ yearId, path }) {
  const { maps, devices } = useContext(AppContext);
  console.log(devices)
  const [filteredMaps, setFilteredMaps] = useState(viewFilter(maps));
  useEffect(() => {
    setFilteredMaps(viewFilter(maps));
  }, [maps]);
  function viewFilter(e) {
    return e.filter((v) => v.yearId == yearId);
  }

  const akcje = (cell, row, rowIndex) => {
    return <Actions cell={cell} row={row} path={path} />;
  };

  const columns = [kolumny.KolumnaMapSrc(devices), kolumny.KolumnaAkcje(akcje)];

  return (
    <BootstrapTable
      bootstrap4
      keyField="id"
      data={filteredMaps}
      columns={columns}
      hover
      condensed
      pagination={paginationFactory()}
      rowClasses="rowClasses"
    />
  );
}

export { MapsTable };
