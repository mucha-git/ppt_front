import React, { useState, useContext} from "react";
import { mapPinsService } from "@/_services";
import { NavLink } from "react-router-dom";
import { AppContext } from '../../_helpers/context';

function Actions(props) {
    const { updateMapPins } = useContext(AppContext);
    return (
        <div className={"buttons"}>
                <button
                    className="button usun"
                    onClick={() => {
                        mapPinsService._delete(props.cell).then(() => {
                            updateMapPins(props.row.yearId)
                        });
                    }}
                >
                    Usuń
                </button>
            <NavLink
                to={{
                    pathname: `${props.path}/edytuj`,
                    state: {row: props.row},
                }}
            >
                <button className="button edytuj">Edytuj</button>
            </NavLink>
        </div>
    );

}

export { Actions };