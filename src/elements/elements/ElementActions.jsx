import React, { useContext} from "react";
import { elementsService } from "@/_services";
import { NavLink } from "react-router-dom";
import { AppContext } from '../../_helpers/context';

function Actions(props) {
    const { updateElements } = useContext(AppContext);
    return (
        <div className={"buttons"}>
                <button
                    className="button usun"
                    onClick={() => {
                        elementsService._delete(props.cell).then(() => {
                            updateElements(props.row.yearId)
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