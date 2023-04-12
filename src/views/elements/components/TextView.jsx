import React from "react";
import MuiButton from "../../../_components/MuiButton";
import { showView } from "../../../_helpers";
import { MuiBtnType } from "../../../_helpers/MuiBtnType";

function TextView({ row }) {
  return (
    <div>
      <div className="d-flex align-items-center">
        <div>
          <MuiButton icon={MuiBtnType.DragAndDrop} />
        </div>
        <div>
          <h4>{row.title}</h4>
        </div>
      </div>
      {showView(row)}
    </div>
  );
}

export { TextView };
