import React from "react";
import { oneSignalService } from "@/_services";
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";

function Actions(props) {
    return (
        <div className={"buttons"}>
            {!props.row.canceled && props.row.completed_at == null && <MuiButton 
                icon={MuiBtnType.Delete} 
                onClick={() => {
                    oneSignalService._delete(props.cell).then(() => {
                        props.row.canceled = true
                    });
                }} 
            /> 
            }
        </div>
    );

}

export { Actions };