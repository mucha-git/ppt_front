import React from 'react';
import DefaultTableView from '../../_components/DefaultTableView';

export const kolumny = {
    KolumnaMapSrc,
    KolumnaAkcje
}

function KolumnaMapSrc(){return{
        dataField: "mapSrc",
        text: "Mapa",
        formatter: (cell, row) => {
            return <DefaultTableView text={row.name} displayOrder={false}>
                {(cell != null && cell.startsWith("http"))
                ? <iframe width={600} height={400} src={cell}></iframe> :
            "Aby wyświetlić podgląd mapy trzeba podać wartość pola src z udostępnienia mapy na stronie"
            }
            </DefaultTableView>
        },
        headerClasses: "header-class",
    }}

function KolumnaAkcje(akcje){return{
        dataField: "id",
        text: "Akcje",
        formatter: akcje,
        classes: "height1 pt-3 pb-3",
        headerClasses: "header-class",
        headerStyle: { width: "110px"}
    }}