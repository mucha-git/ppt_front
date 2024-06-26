import React, { useContext } from "react";
import { applicationsService, alertService } from "@/_services";
import { AppContext } from "../../_helpers/context";
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";
import { accountService } from "../../_services";
import { Role, history } from "../../_helpers";
import "./styles.css";

function Actions(props) {
  const { updateApplications } = useContext(AppContext);
  const user = accountService.userValue;
  return (
    <div className={"buttons d-flex justify-content-end align-items-end colDirection"}>
      {user.role == Role.Admin && (
        <MuiButton
          icon={MuiBtnType.Delete}
          id={"delete-applications-" + props.cell}
          showTooltip={true}
          tooltip={"Usuń aplikację"}
          onClick={() => {
            applicationsService._delete({ id: props.cell}).then(() => {
              updateApplications();
              alertService.success("Pomyslnie usunięto aplikację");
            });
          }}
        />
      )}
      <MuiButton
        icon={MuiBtnType.Edit}
        showTooltip={true}
        tooltip={"Edytuj aplikację"}
        onClick={() =>
          history.push({
            pathname: `${props.path}/edytuj`,
            state: { row: props.row },
          })
        }
      />
    </div>
  );
}

export { Actions };
