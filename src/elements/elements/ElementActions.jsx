import React, { useContext } from "react";
import { elementsService, alertService } from "@/_services";
import { AppContext } from "../../_helpers/context";
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";
import { history } from "../../_helpers";

function Actions(props) {
  const { updateElements } = useContext(AppContext);
  return (
    <div className={"buttons d-flex"}>
      <MuiButton
        icon={MuiBtnType.Edit}
        showTooltip={true}
        tooltip="Edytuj element"
        data-testid={`widoki-${props.row.id}.edytujElement-button`}
        onClick={() =>
          history.push({
            pathname: `${props.path}/edytuj`,
            state: { row: props.row, opened: props.opened },
          })
        }
      />
      <MuiButton
        icon={MuiBtnType.Delete}
        id={"delete-element-" + props.cell}
        showTooltip={true}
        tooltip="Usuń element"
        data-testid={`widoki-${props.row.id}.usunElement-button`}
        onClick={() => {
          elementsService._delete({ yearId: props.row.yearId, id: props.cell}).then(() => {
            updateElements(props.row.yearId);
            alertService.success("Pomyslnie usunięto element");
          });
        }}
      />
    </div>
  );
}

export { Actions };
