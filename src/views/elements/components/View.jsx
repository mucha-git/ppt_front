import React from 'react'
//import { TextView } from './TextView';
//mport { GraphicView } from './GraphicView'

import MuiButton from "../../../_components/MuiButton";
import { showView } from "../../../_helpers";
//import { ListType } from "../../../_helpers/ListType";
import { MuiBtnType } from "../../../_helpers/MuiBtnType";

function View({row}){
    return (
        <div>
            <div className="d-flex align-items-top">
                <div>
                    <MuiButton icon={MuiBtnType.DragAndDrop} />
                </div>
                <div className='mt-2'>
                    <h4>{row.title}</h4>
                    {showView(row)}
                </div>
            </div>
            
        </div> 
    )
    /*switch (row.type) {
        case "Text":
            return <TextView row={row} />
        case "Graphic":
            return <GraphicView row={row} />
        case "TextExternalLink":
            return <TextView row={row} />
        case "GraphicExternalLink":
            return <GraphicView row={row} />
        default:
            break;
    }
    return null*/
}

export {View}