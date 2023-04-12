import React, { useContext } from "react";
import { AppContext } from "../../_helpers/context";
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";
import { yearsService } from "../../_services";
import { history } from "../../_helpers";

function Actions(props) {
  const { updateYears } = useContext(AppContext);
  return (
    <div className={"buttons d-flex"}>
      <MuiButton
        icon={MuiBtnType.Edit}
        showTooltip={true}
        tooltip={"Edytuj rocznik"}
        onClick={() =>
          history.push({
            pathname: `${props.path}/edytuj`,
            state: { row: props.row },
          })
        }
      />
      <MuiButton
        icon={MuiBtnType.Delete}
        id={"delete-years-" + props.cell}
        showTooltip={true}
        tooltip={
          props.row.isActive
            ? "Nie można usunąć aktywnego rocznika"
            : "Usuń rocznik"
        }
        disabled={props.row.isActive}
        onClick={() => {
          yearsService._delete(props.cell).then(() => {
            updateYears();
          });
        }}
      />
    </div>
  );
}

export { Actions };
