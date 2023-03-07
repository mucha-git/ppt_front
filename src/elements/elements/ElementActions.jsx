import React, { useContext} from "react";
import { elementsService } from "@/_services";
import { NavLink } from "react-router-dom";
import { AppContext } from '../../_helpers/context';

function Actions(props) {
    const { updateElements } = useContext(AppContext);
    return (
        <div className={"buttons"}>
                <button
                    className="btn m-1 btn-danger"
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
                <button className="btn m-1 btn-primary">Edytuj</button>
            </NavLink>
        </div>
    );

}

export { Actions };