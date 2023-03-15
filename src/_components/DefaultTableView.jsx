import React from "react";
import MuiButton from "./MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";

export default function DefaultTableView({text, displayOrder = true, children}) {
    
  return (
    <div className="pt-3 pb-3">
            <div className="d-flex align-items-top">
                {displayOrder && <div>
                    <MuiButton icon={MuiBtnType.DragAndDrop} />
                </div>}
                <div className={!displayOrder? 'mt-2 w-100 ml-3': "mt-2 w-100 " }>
                    <h4>{text}</h4>
                    {children}
                </div>
            </div>
            
        </div> 
  );
}
