import React from 'react';
import { Element } from './components/Element';

export const kolumny = {
    KolumnaElement,
    KolumnaAkcje
}

function KolumnaElement(){   return {
        dataField: "",
        text: "Element",
        formatter: (cell, row) => {
            return <Element row={row} />
        },
        headerClasses: "header-class",
    }}



function KolumnaAkcje(akcje){return{
        dataField: "id",
        text: "Akcje",
        formatter: akcje,
        headerClasses: "header-class",
        headerStyle: { width: "130px" },
        events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
              e.stopPropagation();
            },
        },
    }}
