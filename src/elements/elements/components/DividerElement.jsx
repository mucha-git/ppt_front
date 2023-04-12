import React from "react";
import { margins } from "../../../_helpers/margins";
import { strokeThick } from "../../../_helpers/strokeThick";

function DividerElement({ row }) {
  return (
    <div className="w-100">
      <div
        style={{
          backgroundColor: row.color,
          margin: row.margin,
          height: row.height,
          maxWidth: "100%",
        }}
      />
      <div className="d-flex justify-content-around">
        <div>
          <strong>Kolor: </strong>
          <span style={{ width: 20, height: 20, backgroundColor: row.color }}>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </span>{" "}
          {row.color}
        </div>
        <div>
          <strong>Wysokość: </strong>
          {strokeThick.find((s) => s.value == row.height)?.key}
        </div>
        <div>
          <strong>Margines: </strong>
          {margins.find((m) => m.value == row.margin)?.key}
        </div>
      </div>
    </div>
  );
}

export { DividerElement };
