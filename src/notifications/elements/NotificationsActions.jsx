import React from "react";
import { oneSignalService } from "@/_services";
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";

function Actions(props) {
  return (
    <div className={"buttons d-flex"}>
      {!props.cell && props.row.completed_at == null && (
        <MuiButton
          icon={MuiBtnType.Delete}
          id={"delete-notification-" + props.row.id}
          showTooltip={true}
          tooltip={"Usuń powiadomienie"}
          onClick={() => {
            oneSignalService._delete(props.row.id).then(() => {
              props.setNotifications((prev) => {
                return prev.map((n) => {
                  if (n.id == props.row.id) {
                    let row = n;
                    row.canceled = true;
                    return row;
                  } else {
                    return n;
                  }
                });
              });
            });
          }}
        />
      )}
    </div>
  );
}

export { Actions };
