import React, { useContext} from "react";
import { elementsService } from "@/_services";
import { NavLink } from "react-router-dom";
import { AppContext } from '../../_helpers/context';
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";

function Actions(props) {
    const { updateElements } = useContext(AppContext);
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
                    elementsService._delete(props.cell).then(() => {
                        updateElements(props.row.yearId)
                    });
                }} 
            />
        </div>
    );

}

export { Actions };