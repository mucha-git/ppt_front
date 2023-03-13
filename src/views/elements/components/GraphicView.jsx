import React from "react";
import MuiButton from "../../../_components/MuiButton";
import { MuiBtnType } from "../../../_helpers/MuiBtnType";

function GraphicView({row}){
    return (
        <div>
        <div className="d-flex align-items-center">
            <div>
                <MuiButton icon={MuiBtnType.DragAndDrop} />
            </div>
            <div>
                <h4>{row.title}</h4>
            </div>
        </div>
        <img src={row.imgSrc} width={"100%"} />
    </div>
        
    )
    }

export { GraphicView }