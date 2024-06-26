import React from "react";
import DefaultTableView from "../../_components/DefaultTableView";
import "./styles.css";

export const kolumny = {
  KolumnaTitle,
  KolumnaPinSrc,
  KolumnaAkcje,
};

function KolumnaTitle() {
  return {
    dataField: "name",
    text: "Nazwa",
    sort: true,
    headerClasses: "header-class",
  };
}

function KolumnaPinSrc() {
  return {
    dataField: "pinSrc",
    text: "Pinezka",
    formatter: (cel, row) => {
      return (
        <DefaultTableView text={row.name} displayOrder={false}>
          <img src={row.pinSrc} height={row.height} width={row.width} />
        </DefaultTableView>
      );
    },
    headerClasses: "header-class",
  };
}

function KolumnaAkcje(akcje) {
  return {
    dataField: "id",
    text: "Akcje",
    formatter: akcje,
    classes: "height1 pt-3 pb-3",
    headerClasses: "header-class mapPinActions",
    //headerStyle: { width: "110px" },
  };
}
