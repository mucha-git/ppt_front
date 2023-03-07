import React, { useState, useContext} from "react";
import { mapPinsService } from "@/_services";
import { NavLink } from "react-router-dom";
import { AppContext } from '../../_helpers/context';

function Actions(props) {
    const { updateMapPins } = useContext(AppContext);
    return (
        <div className={"buttons"}>
                <button
                    className="btn m-1 btn-danger"
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
                <button className="btn m-1 btn-primary">Edytuj</button>
            </NavLink>
        </div>
    );

}

export { Actions };