import React from "react";
import { View } from "./components/View";
import "./styles.css";

export const kolumny = {
  KolumnaWidok,
  KolumnaAkcje,
  KolumnaAkcjeMain,
  KolumnaOrder,
};

function KolumnaWidok() {
  return {
    dataField: "",
    text: "Podgląd",
    formatter: (cell, row) => {
      return <View row={row} />;
    },
    headerClasses: "header-class",
    editable: false,
  };
}

function KolumnaOrder() {
  return {
    dataField: "order",
    text: "Kol.",
    editorClasses: "pr-0",
    editCellClasses: "padding-order-edit",
    classes: "padding-order",
    headerClasses: "header-class",
    headerStyle: { width: "50px" },
    editable: true,
    events: {
      onClick: (e, column, columnIndex, row, rowIndex) => {
        e.stopPropagation();
      },
    },
  };
}

function KolumnaAkcje(akcje) {
  return {
    dataField: "id",
    text: "Akcje",
    formatter: akcje,
    classes: "height1 pt-3 pb-4",
    headerClasses: "header-class viewActions",
    //headerStyle: { width: "210px" },
    events: {
      onClick: (e, column, columnIndex, row, rowIndex) => {
        if (e.target.localName != "div") {
          e.stopPropagation();
        }
      },
    },
    editable: false,
  };
}

function KolumnaAkcjeMain(akcje) {
  return {
    dataField: "id",
    text: "Akcje",
    formatter: akcje,
    classes: "height1 pt-3 pb-4",
    headerClasses: "header-class viewActionsMain",
    //headerStyle: { width: "210px" },
    events: {
      onClick: (e, column, columnIndex, row, rowIndex) => {
        if (e.target.localName != "div") {
          e.stopPropagation();
        }
      },
    },
    editable: false,
  };
}
