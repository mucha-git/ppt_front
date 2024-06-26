import React from "react";
import DefaultTableView from "../../_components/DefaultTableView";
import "./styles.css";

export const kolumny = {
  KolumnaMapSrc,
  KolumnaAkcje,
};

function KolumnaMapSrc(devicesList) {
  return {
    dataField: "mapSrc",
    text: "Mapa",
    formatter: (cell, row) => {
      return (
        <DefaultTableView text={row.name} displayOrder={false}>
          <div>
            <strong>Urządzenie GPS: </strong>
            {row.deviceId? devicesList?.find(a => a.id == row.deviceId).name : "Brak urządzenia"}
          </div>
          <div>
            {cell != null && cell.startsWith("http") ? (
              <iframe width={450} height={300} src={cell}></iframe>
            ) : (
              "Aby wyświetlić podgląd mapy trzeba podać wartość pola src z udostępnienia mapy na stronie"
            )}
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
    headerClasses: "header-class mapActions",
    //headerStyle: { width: "110px" },
  };
}
