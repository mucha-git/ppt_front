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
        formatter: (cell) => {
            return (cell != null && cell.startsWith("http"))
                ? <iframe width={600} height={400} src={cell}></iframe> :
            "Aby wyświetlić podgląd mapy trzeba podać wartość pola src z udostępnienia mapy na stronie";
        },
        headerClasses: "header-class",
    }}

function KolumnaAkcje(akcje){return{
        dataField: "id",
        text: "Akcje",
        formatter: akcje,
        headerClasses: "header-class",
        headerStyle: { width: "110px"},
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