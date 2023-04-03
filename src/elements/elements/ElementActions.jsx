import React, { useContext} from "react";
import { elementsService } from "@/_services";
import { NavLink } from "react-router-dom";
import { AppContext } from '../../_helpers/context';
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";
import { history } from "../../_helpers";

function Actions(props) {
    const { updateElements } = useContext(AppContext);
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
                    tooltip="Edytuj element"
                    onClick={() => history.push({
                        pathname: `${props.path}/edytuj`,
                        state: {row: props.row},
                    })} />
            {/* </NavLink> */}
            <MuiButton 
                icon={MuiBtnType.Delete} 
                showTooltip={true}
                tooltip="Usuń element"
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