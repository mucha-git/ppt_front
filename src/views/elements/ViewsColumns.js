import React from 'react';
import {ScreenType} from '../../_helpers/ScreenType'
import {ListType} from '../../_helpers/ListType'
import { View } from './components/View'

export const kolumny = {
    KolumnaTitle,
    KolumnaImgSrc,
    KolumnaHeaderText,
    KolumnaType,
    KolumnaScreenType,
    KolumnaWidok,
    KolumnaAkcje,
    KolumnaParentView,
    KolumnaOrder
}

function KolumnaWidok(){   return {
    dataField: "",
    text: "Podgląd",
    formatter: (cell, row) => {
        return <View row={row} />
    },
    headerClasses: "header-class",
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

function KolumnaTitle(textFilter){   return {
        dataField: "title",
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

function KolumnaImgSrc(){return{
        dataField: "imgSrc",
        text: "Grafika",
        sort: true,
        formatter: (cell) => {
            return cell != null
                ? <img src={cell} width={100} height={30} />
                : "brak grafiki";
        },
        headerClasses: "header-class",
    }}

function KolumnaAkcje(akcje){return{
        dataField: "id",
        text: "Akcje",
        formatter: akcje,
        classes: "height1",
        headerClasses: "header-class",
        headerStyle: { width: "210px" },
        events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
              e.stopPropagation();
            },
        },
        editable: false,
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