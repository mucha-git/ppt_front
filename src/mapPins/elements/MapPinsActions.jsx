import React, { useState, useContext} from "react";
import { mapPinsService } from "@/_services";
import { NavLink } from "react-router-dom";
import { AppContext } from '../../_helpers/context';
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";

function Actions(props) {
    const { updateMapPins } = useContext(AppContext);
    return (
        <div className={"buttons"}>
            <NavLink
                to={{
                    pathname: `${props.path}/edytuj`,
                    state: {row: props.row},
                }}
            >
                <MuiButton icon={MuiBtnType.Edit} onClick={() => {}} />
            </NavLink>
            <MuiButton 
                icon={MuiBtnType.Delete} 
                onClick={() => {
                    mapPinsService._delete(props.cell).then(() => {
                        updateMapPins(props.row.yearId)
                    });
                }} 
            />
        </div>
    );

}

export { Actions };