import React, { useContext } from "react";
import { mapPinsService } from "@/_services";
import { AppContext } from "../../_helpers/context";
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";
import { history } from "../../_helpers";

function Actions(props) {
  const { updateMapPins, maps } = useContext(AppContext);
  return (
    <div className={"buttons d-flex"}>
      <MuiButton
        icon={MuiBtnType.Edit}
        tooltip={"Edytuj pinezkę"}
        showTooltip={true}
        onClick={() =>
          history.push({
            pathname: `${props.path}/edytuj`,
            state: { row: props.row },
          })
        }
      />
      <MuiButton
        icon={MuiBtnType.Delete}
        showTooltip={true}
        id={"delete-element-" + props.cell}
        disabled={maps.find((m) =>
          m.markers.find((ma) => ma.pinId == props.cell)
        )}
        tooltip={
          maps.find((m) => m.markers.find((ma) => ma.pinId == props.cell))
            ? "Nie można usunąć przypisanej pinezki"
            : "Usuń pinezkę"
        }
        onClick={() => {
          mapPinsService._delete(props.cell).then(() => {
            updateMapPins(props.row.yearId);
          });
        }}
      />
    </div>
  );
}

export { Actions };
