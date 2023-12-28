import React, { useContext } from "react";
import { mapsService, alertService } from "@/_services";
import { AppContext } from "../../_helpers/context";
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";
import { history } from "../../_helpers";

function Actions(props) {
  const { updateMaps, elements } = useContext(AppContext);
  return (
    <div className={"buttons d-flex"}>
      <MuiButton
        icon={MuiBtnType.Edit}
        showTooltip={true}
        tooltip={"Edytuj mapę"}
        onClick={() =>
          history.push({
            pathname: `${props.path}/edytuj`,
            state: { row: props.row },
          })
        }
      />
      <MuiButton
        icon={MuiBtnType.Delete}
        id={"delete-maps-" + props.cell}
        showTooltip={true}
        disabled={elements.find(
          (e) => e.type == "Map" && e.mapId == props.cell
        )}
        tooltip={
          elements.find((e) => e.type == "Map" && e.mapId == props.cell)
            ? "Nie można usunąć przypisanej mapy"
            : "Usuń mapę"
        }
        onClick={() => {
          mapsService._delete({ yearId: props.row.yearId, id: props.cell}).then(() => {
            updateMaps(props.row.yearId);
            alertService.success("Pomyslnie usunięto mapę");
          });
        }}
      />
    </div>
  );
}

export { Actions };
