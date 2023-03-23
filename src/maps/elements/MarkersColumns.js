import React from 'react';
import DefaultTableView from '../../_components/DefaultTableView';
import  { Type } from '@musicstory/react-bootstrap-table2-editor';

export const kolumny = {
    KolumnaTitle,
    KolumnaDescription,
    KolumnaPinId
}

function KolumnaTitle(){return{
        dataField: "title",
        text: "Tytuł",
        headerClasses: "header-class",
        editable: true,
        editor: {
            type: Type.TEXTAREA
          }
    }}

function KolumnaDescription(){return{
        dataField: "description",
        text: "Opis",
        headerClasses: "header-class",
        editable: true,
        editor: {
            type: Type.TEXTAREA,

          }
    }}

function KolumnaPinId(options){return{
        dataField: "pinId",
        text: "Pinezka",
        //classes: "height1 pt-3 pb-3",
        headerClasses: "header-class",
        formatter: (cell) => {
            console.log(options.find(f => f.id == cell)?.pinSrc)
            return <img src={options.find(f => f.id == cell)?.pinSrc} width={20} />
        },
        headerStyle: { width: "110px"},
        editable: true,
        editor: {
            type: Type.SELECT,
            options: options.map(m => { return {value: m.id, label: m.name}}) 
          }
    }}