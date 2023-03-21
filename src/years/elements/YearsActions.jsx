import React, { useContext} from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from '../../_helpers/context';
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";
import { yearsService } from "../../_services";

function Actions(props) {
    const { updateYears } = useContext(AppContext);
    return (
        <div className={"buttons"}>
            <NavLink
                to={{
                    pathname: `${props.path}/edytuj`,
                    state: {row: props.row},
                }}
            >
                <MuiButton icon={MuiBtnType.Edit} />
            </NavLink>
            <MuiButton 
                icon={MuiBtnType.Delete} 
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