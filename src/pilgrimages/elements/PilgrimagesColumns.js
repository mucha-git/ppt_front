import React from 'react';

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
        //filter: textFilter({
        //    placeholder: "Szukaj...",
        //}),
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
        formatter: (cell) => {
            return cell != null
                ? <img src={cell} height={100} />
                : "brak grafiki";
        },
        headerClasses: "header-class",
    }}

function KolumnaAkcje(akcje){return{
        dataField: "id",
        text: "Akcje",
        formatter: akcje,
        headerClasses: "header-class",
        headerStyle: { width: "160px" },
        events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
              e.stopPropagation();
            },
        },
    }}

