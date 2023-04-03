import React, { useState, useContext} from "react";
import { mapPinsService } from "@/_services";
import { NavLink } from "react-router-dom";
import { AppContext } from '../../_helpers/context';
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";
import { history } from "../../_helpers";

function Actions(props) {
    const { updateMapPins, maps } = useContext(AppContext);
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
                    tooltip={"Edytuj pinezkę"}
                    showTooltip={true}
                    onClick={() => history.push({
                        pathname: `${props.path}/edytuj`,
                        state: {row: props.row},
                    })} />
            {/* </NavLink> */}
            <MuiButton 
                icon={MuiBtnType.Delete} 
                showTooltip={true}
                disabled={maps.find( m => m.markers.find(ma => ma.pinId == props.cell))}
                tooltip={maps.find( m => m.markers.find(ma => ma.pinId == props.cell))? "Ta pinezka jest przypisana w mapie" : "Usuń pinezkę"}
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