import React from 'react';

export const kolumny = {
    KolumnaTitle,
    KolumnaPinSrc,
    KolumnaAkcje
}

function KolumnaTitle(){   return {
    dataField: "name",
    text: "Nazwa",
    sort: true,
    /*filter: textFilter({
        placeholder: "Szukaj...",
    }),*/
    headerClasses: "header-class",
}}

function KolumnaPinSrc(){return{
        dataField: "pinSrc",
        text: "Pinezka",
        formatter: (cel, row) => {
            return <img src={row.pinSrc} height={row.height} width={row.width} />;
        },
        headerClasses: "header-class",
    }}

function KolumnaAkcje(akcje){return{
        dataField: "id",
        text: "Akcje",
        formatter: akcje,
        headerClasses: "header-class",
        headerStyle: { width: "110px" },
        events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
              e.stopPropagation();
            },
        },
    }}