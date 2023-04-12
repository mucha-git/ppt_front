import React, { useContext } from "react";
import { pilgrimagesService } from "@/_services";
import { AppContext } from "../../_helpers/context";
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";
import { accountService } from "../../_services";
import { Role, history } from "../../_helpers";

function Actions(props) {
  const { updatePilgrimages } = useContext(AppContext);
  const user = accountService.userValue;
  return (
    <div className={"buttons d-flex"}>
      <MuiButton
        icon={MuiBtnType.Edit}
        showTooltip={true}
        tooltip={"Edytuj pielgrzymkę"}
        onClick={() =>
          history.push({
            pathname: `${props.path}/edytuj`,
            state: { row: props.row },
          })
        }
      />
      {user.role == Role.Admin && (
        <MuiButton
          icon={MuiBtnType.Delete}
          id={"delete-pilgrimages-" + props.cell}
          showTooltip={true}
          tooltip={"Usuń pielgrzymkę"}
          onClick={() => {
            pilgrimagesService._delete(props.cell).then(() => {
              updatePilgrimages();
            });
          }}
        />
      )}
    </div>
  );
}

export { Actions };
