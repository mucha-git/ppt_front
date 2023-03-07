import React, { useState, useContext} from "react";
import { viewsService } from "@/_services";
import { ScreenType } from "../../_helpers/ScreenType";
import { NavLink } from "react-router-dom";
import { AppContext } from '../../_helpers/context';

function Actions(props) {
    const { updateViews } = useContext(AppContext);
    const addButtonPath = () => {
        switch (props.row.screenType) {
            case ScreenType[1].value: return `${props.path}/dodaj`
            case ScreenType[2].value: return `/elements/dodaj`
        }
    }
    return (
        <div className={"buttons"}>
                <button
                    className="btn m-1 btn-danger"
                    onClick={() => {
                        viewsService._delete(props.cell).then(() => {
                            updateViews(props.row.yearId)
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
            <NavLink to={{pathname: addButtonPath(), state: {yearId: props.row.yearId, parentViewId: props.row.id} }} className="nav-item center-divs">
            <button className="btn m-1 btn-success">
              Dodaj podelement
            </button>
          </NavLink>
        </div>
    );

}

export { Actions };