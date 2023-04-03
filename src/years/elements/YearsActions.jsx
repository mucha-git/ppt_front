import React, { useContext} from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from '../../_helpers/context';
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";
import { yearsService } from "../../_services";
import { history } from "../../_helpers"

function Actions(props) {
    const { updateYears } = useContext(AppContext);
    return (
        <div className={"buttons"}>
            {/* <NavLink
                to={{
                    pathname: `${props.path}/edytuj`,
                    state: {row: props.row},
                }}
            > */}
                <MuiButton 
                    icon={MuiBtnType.Edit}
                    showTooltip={true}
                    tooltip={"Edytuj rocznik"} 
                    onClick={() => history.push({
                    pathname: `${props.path}/edytuj`,
                    state: {row: props.row},
                })} />
            {/* </NavLink> */}
            <MuiButton 
                icon={MuiBtnType.Delete} 
                showTooltip={true}
                tooltip={"Usuń rocznik"}
                onClick={() => {
                    yearsService._delete(props.cell).then(() => {
                        updateYears()
                    });
                }} 
            />
        </div>
    );

}

export { Actions };