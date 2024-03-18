import React from "react";
import DefaultTableView from "../../_components/DefaultTableView";

export const kolumny = {
  KolumnaImgSrc,
  KolumnaAkcje,
};

function KolumnaImgSrc() {
  return {
    dataField: "imgSrc",
    text: "Logo",
    formatter: (cell, row) => {
      return (
        <DefaultTableView text={row.yearTopic} displayOrder={false}>
          <div className="d-flex justify-content-start">
            <div className="ml-2">
              <div>
                <strong>Rocznik: </strong>
                {row.year}
              </div>
              <div>
                <strong>Aktywny: </strong>
                <span className={row.isActive ? "text-success" : "text-danger"}>
                  {row.isActive ? "Tak" : "Nie"}
                </span>
              </div>
            </div>
          </div>
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
    headerClasses: "header-class",
    headerStyle: { width: "170px" },
  };
}
