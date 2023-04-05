import React from 'react';
import DefaultTableView from '../../_components/DefaultTableView';

export const kolumny = {
    KolumnaName,
    KolumnaLogoSrc,
    KolumnaIsActive,
    KolumnaAkcje
}

function KolumnaName(){   return {
        dataField: "name",
        text: "Nazwa",
        sort: true,
        headerClasses: "header-class",
    }}

function KolumnaIsActive(){
    return {
        dataField: "isActive",
        text: "Czy aktywna",
        sort: true,
        formatter: (cellContent, row) => (
            <div className="checkbox disabled">
              <label>
                <input type="checkbox" checked={ row.isActive } disabled />
              </label>
            </div>
          ),
        headerClasses: "header-class",
    }}

function KolumnaLogoSrc(){return{
        dataField: "logoSrc",
        text: "Logo",
        formatter: (cell, row) => {
            return <DefaultTableView text={row.name} displayOrder={false}>
              <div><strong>Aktywna: </strong>{row.isActive? "Tak":"Nie"}</div>
              <div>{cell != null? <img src={cell} height={100} /> : "brak grafiki"}</div>
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
        headerStyle: { width: "110px" }
    }}

