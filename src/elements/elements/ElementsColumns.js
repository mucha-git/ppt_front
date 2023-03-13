import React from 'react';
import { Element } from './components/Element';

export const kolumny = {
    KolumnaElement,
    KolumnaAkcje,
    KolumnaOrder
}

function KolumnaElement(){   return {
        dataField: "",
        text: "Element",
        formatter: (cell, row) => {
            return <Element row={row} />
        },
        headerClasses: "header-class",
        editable: false,
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
        editable: false,
    }}

function KolumnaOrder(){   return {
        dataField: "order",
        text: "Kol.",
        editCellClasses: "pl-1 pt-2",
        classes: "p-3",
        headerClasses: "header-class",
        headerStyle: { width: "50px" },
        editable: true,
        events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
              e.stopPropagation();
            },
        },
    }}
