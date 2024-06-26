import React from "react";
import DefaultTableView from "../../_components/DefaultTableView";
import moment from "moment";
import "./styles.css";

export const kolumny = {
  KolumnaData,
  KolumnaStatus,
  KolumnaAkcje,
};

function KolumnaData() {
  return {
    dataField: "name",
    text: "Logo",
    formatter: (cell, row) => {
      return (
        <DefaultTableView text={cell} displayOrder={false}>
          <div>
            <strong>Tytuł: </strong>
            {row.headings?.en}
          </div>
          <div>
            <strong>Treść: </strong>
            {row.contents?.en}
          </div>
          <div>
            <strong>Zaplanowano na: </strong>
            {moment(new Date(row.send_after * 1000))
              .locale("pl")
              .format("LLL")}
          </div>
        </DefaultTableView>
      );
    },
    headerClasses: "header-class",
  };
}

function KolumnaStatus() {
  return {
    dataField: "canceled",
    text: "Status",
    formatter: (cell, row) => {
      return (
        <div>
          <p>
            <strong></strong>
            {!cell ? "Aktywne" : "Nieaktywne"}
          </p>
        </div>
      );
    },
    headerClasses: "header-class",
    headerStyle: { width: "100px" },
    classes: "pt-4",
  };
}

function KolumnaAkcje(akcje) {
  return {
    dataField: "canceled",
    text: "Akcje",
    formatter: (cell, row) =>
      row.canceled
        ? "Nieaktywne"
        : row.completed_at != null
        ? "Wysłano"
        : akcje(cell, row),
    classes: "height1 pt-3 pb-3",
    headerClasses: "header-class notificationActions",
    //headerStyle: { width: "100px" },
  };
}
