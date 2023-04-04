import React, { useState, useContext} from "react";
import { mapsService } from "@/_services";
import { NavLink } from "react-router-dom";
import { AppContext } from '../../_helpers/context';
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";
import { history } from "../../_helpers";

function Actions(props) {
    const { updateMaps, elements } = useContext(AppContext);
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
                    tooltip={"Edytuj mapę"}
                    onClick={() => history.push({
                        pathname: `${props.path}/edytuj`,
                        state: {row: props.row},
                    })} />
            {/* </NavLink> */}
            <MuiButton 
                icon={MuiBtnType.Delete} 
                showTooltip={true}
                disabled={elements.find(e => e.type=="Map" && e.mapId == props.cell)}
                tooltip={elements.find(e => e.type=="Map" && e.mapId == props.cell)?"Nie można usunąć przypisanej mapy" : "Usuń mapę"}
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