import React, { useContext, useEffect } from "react";
import BootstrapTable from "@murasoftware/react-bootstrap-table-next";
import paginationFactory from "@murasoftware/react-bootstrap-table2-paginator";
import { kolumny } from "./ApplicationsColumns";
import { Actions } from "./ApplicationsActions";
import { AppContext } from "../../_helpers/context";

function ApplicationsTable({ path }) {
  const { applications, groups, isSet } = useContext(AppContext);
  useEffect(() => {
    isSet();
  }, []);

  const akcje = (cell, row, rowIndex) => {
    return <Actions cell={cell} row={row} path={path} />;
  };

  const columns = [kolumny.KolumnaLogoSrc(groups), kolumny.KolumnaAkcje(akcje)];

  return (
    <BootstrapTable
      bootstrap4
      keyField="id"
      data={applications}
      columns={columns}
      hover
      condensed
      pagination={paginationFactory()}
      rowClasses="rowClasses"
    />
  );
}

export { ApplicationsTable };
