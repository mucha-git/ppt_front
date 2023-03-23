import React from 'react';
import DefaultTableView from '../../_components/DefaultTableView';
import moment from 'moment'

export const kolumny = {
    KolumnaData,
    KolumnaAkcje
}

function KolumnaData(){return{
        dataField: "name",
        text: "Logo",
        formatter: (cell, row) => {
            return <DefaultTableView text={cell} displayOrder={false}>
              <div><strong>Aktywne: </strong>{!row.canceled? "Tak":"Nie"}</div>
              <div><strong>Tytuł: </strong>{row.headings?.en}</div>
              <div><strong>Treść: </strong>{row.contents?.en}</div>
              <div><strong>Zaplanowano na: </strong>{moment(new Date(row.send_after*1000)).locale('pl').format('LLL')}</div>
            </DefaultTableView>
        },
        headerClasses: "header-class",
    }}
    1679568517
function KolumnaAkcje(akcje){return{
        dataField: "id",
        text: "Akcje",
        formatter: akcje,
        classes: "height1 pt-3 pb-3",
        headerClasses: "header-class",
        headerStyle: { width: "70px" },
        events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
              e.stopPropagation();
            },
        },
    }}

