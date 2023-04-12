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
      return <img src={row.imgSrc} width={"100%"} />;
    case ListType[2].value:
      return (
        <div>
          <strong>Link zewnętrzny: </strong>
          {row.externalUrl}
        </div>
      );
    case ListType[3].value:
      return (
        <div>
          <strong>Link zewnętrzny: </strong>
          {row.externalUrl}
          <img src={row.imgSrc} width={"100%"} />
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
