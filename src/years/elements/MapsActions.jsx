import React, { useState, useContext} from "react";
import { mapsService } from "@/_services";
import { NavLink } from "react-router-dom";
import { AppContext } from '../../_helpers/context';

function Actions(props) {
    const { updateMaps, views } = useContext(AppContext);
    return (
        <div className={"buttons"}>
                <button
                    className="btn m-1 btn-danger"
                    onClick={() => {
                        mapsService._delete(props.cell).then(() => {
                            updateMaps(props.row.yearId)
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
                <button className="btn m-1 btn-success">Edytuj</button>
            </NavLink>
        </div>
    );

}

export { Actions };