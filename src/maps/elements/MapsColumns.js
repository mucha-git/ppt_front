import React from 'react';
import {ScreenType} from '../../_helpers/ScreenType'
import {ListType} from '../../_helpers/ListType'
import { View } from './components/View'

export const kolumny = {
    KolumnaTitle,
    KolumnaMapSrc,
    KolumnaHeaderText,
    KolumnaType,
    KolumnaScreenType,
    KolumnaWidok,
    KolumnaAkcje,
    KolumnaParentView
}

function KolumnaWidok(){   return {
    dataField: "",
    text: "Podgląd",
    formatter: (cell, row) => {
        return <View row={row} />
    },
    headerClasses: "header-class",
}}

function KolumnaTitle(textFilter){   return {
        dataField: "name",
        text: "Tytuł",
        sort: true,
        filter: textFilter({
            placeholder: "Szukaj...",
        }),
        headerClasses: "header-class",
    }}

function KolumnaHeaderText(textFilter){   return {
        dataField: "headerText",
        text: "Nagłówek",
        sort: true,
        filter: textFilter({
            placeholder: "Szukaj...",
        }),
        headerClasses: "header-class",
    }}

function KolumnaType(selectFilter){
    var list = {}; 
    ListType.map(e => {
        list[e.value] = e.key;
    })
    return {
        dataField: "type",
        text: "Typ linku",
        sort: true,
        formatter: (cell) => list[cell],
        filter: selectFilter({
            options: list,
            placeholder: "Szukaj...",
        }),
        headerClasses: "header-class",
    }}

function KolumnaScreenType(selectFilter){
    var list = {}; 
    ScreenType.map(e => {
        if(e.value != null)list[e.value] = e.key;
    })
    return {
        dataField: "screenType",
        text: "Typ widoku",
        sort: true,
        formatter: (cell) => list[cell],
        filter: selectFilter({
            options: list,
            placeholder: "Wybierz",
        }),
        headerClasses: "header-class",
    }}

function KolumnaMapSrc(){return{
        dataField: "mapSrc",
        text: "Mapa",
        formatter: () => {
            //return cell != null
            //    ? <iframe width={600} height={400} src={"https://www.traseo.pl/mapa/265094/m/0/mc/0/i/0/g/0/ch/0/hd/1/ce/0/"} style={"border:1px solid #000;"}></iframe>
            return <iframe width={600} height={400} src={"https://www.traseo.pl/mapa/264094/m/0/mc/0/i/0/g/0/ch/0/hd/1/ce/0/"} ></iframe>;
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

function KolumnaParentView(selectFilter, views){  
    var obj = {}; 
    views.map(e => {
        obj[e.id] = e.title;
    })
    return {
        dataField: "viewId",
        text: "Widok",
        sort: true,
        formatter: (cell) => obj[cell],
        filter: selectFilter({
            options: obj,
            placeholder: "Wybierz",
        }),
        headerClasses: "header-class",
    }}