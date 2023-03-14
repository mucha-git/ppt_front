import React, { useState, useContext} from "react";
import { pilgrimagesService } from "@/_services";
import { NavLink } from "react-router-dom";
import { AppContext } from '../../_helpers/context';
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";

function Actions(props) {
    const { updatePilgrimages } = useContext(AppContext);
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
                    pilgrimagesService._delete(props.cell).then(() => {
                        updatePilgrimages()
                    });
                }} 
            />
        </div>
    );

}

export { Actions };