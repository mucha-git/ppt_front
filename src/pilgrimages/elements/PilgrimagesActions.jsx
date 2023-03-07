import React, { useState, useContext} from "react";
import { pilgrimagesService } from "@/_services";
import { NavLink } from "react-router-dom";
import { AppContext } from '../../_helpers/context';

function Actions(props) {
    const { updatePilgrimages } = useContext(AppContext);
    return (
        <div className={"buttons"}>
                <button
                    className="btn m-1 btn-danger"
                    onClick={() => {
                        pilgrimagesService._delete(props.cell).then(() => {
                            updatePilgrimages()
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