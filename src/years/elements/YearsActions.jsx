import React, { useContext } from "react";
import { AppContext } from "../../_helpers/context";
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";
import { yearsService, alertService } from "../../_services";
import { history } from "../../_helpers";
import "./styles.css";

function Actions(props) {
  const { updateYears } = useContext(AppContext);
  return (
    <div className={"buttons d-flex colDirection"}>
      <MuiButton
        icon={MuiBtnType.CopyYear}
        showTooltip={true}
        tooltip={"Kopiuj wydarzenie"}
        onClick={() =>
          history.push({
            pathname: `${props.path}/kopiuj`,
            state: { row: props.row },
          })
        }
      />
      <MuiButton
        icon={MuiBtnType.Edit}
        showTooltip={true}
        tooltip={"Edytuj wydarzenie"}
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
            ? "Nie można usunąć aktywnego wydarzenia"
            : "Usuń wydarzenie"
        }
        disabled={props.row.isActive}
        onClick={() => {
          yearsService._delete({ id: props.cell}).then(() => {
            updateYears();
            alertService.success("Pomyslnie usunięto wydarzenie");
          });
        }}
      />
    </div>
  );
}

export { Actions };
