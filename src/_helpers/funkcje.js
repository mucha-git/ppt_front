import React from "react";
import { ListType } from "./ListType";
export function isWymagane() {
  return <span className="wymagane">*</span>;
}

export function showView(row) {
  switch (row.type) {
    case ListType[0].value:
      return <div></div>;
    case ListType[1].value:
      return <img src={row.imgSrc} data-testid={`widoki-${row.id}-img`} width={"100%"} />;
    case ListType[2].value:
      return (
        <div>
          <img src={row.imgSrc} data-testid={`widoki-${row.id}-img`} width={"10%"} className="mr-2" />
          <strong>{row.title}</strong>
        </div>
      );
    case ListType[3].value:
      return (
        <div>
          <strong>Link zewnętrzny: </strong>
          {row.externalUrl}
        </div>
      );

    case ListType[4].value:
      return (
        <div>
          <strong>Link zewnętrzny: </strong>
          {row.externalUrl}
          <img src={row.imgSrc} width={"100%"} />
        </div>
      );

    case ListType[5].value:
      return (
        <div className="flex-column">
          <div className="flex-row">
            <strong>Link zewnętrzny: </strong>
            {row.externalUrl}
          </div>
          <div className="flex-row">
            <img src={row.imgSrc} width={"10%"} className="mr-2" />
            {row.title}
          </div>
        </div>
      );
  }
}

export function arrayFromEnum(enumObject) {
  var all = [];
  for (var key in enumObject) {
    all.push({ value: key, key: enumObject[key] });
  }
  return all;
}

export function SetOpenedArray(array, newId){
  if(array.find( a => a == newId)) return array;
  return [newId].concat(array)
}

export const viewListForNavigation = (viewsList, parentId = null, list = [], sign = "") => {
  const currentLvl = viewsList.filter(e => e.viewId == parentId && !e.type.includes("External"))
  list.length == 0 && list.push({key: "<== MENU GŁÓWNE ==>", value: -1})
  currentLvl.forEach(element => {
    list.push({key: sign + element.title, value: element.id})
    list.concat(viewListForNavigation(viewsList, element.id, list, sign + "-> "))
  });
  return list
}
