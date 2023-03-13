import React, { useState, useContext} from "react";
import { mapsService } from "@/_services";
import { NavLink } from "react-router-dom";
import { AppContext } from '../../_helpers/context';
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";

function Actions(props) {
    const { updateMaps } = useContext(AppContext);
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
                    mapsService._delete(props.cell).then(() => {
                        updateMaps(props.row.yearId)
                    });
                }} 
            />
        </div>
    );

}

export { Actions };