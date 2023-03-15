import React from 'react'
import DefaultTableView from '../../../_components/DefaultTableView';
//import { TextView } from './TextView';
//mport { GraphicView } from './GraphicView'

import MuiButton from "../../../_components/MuiButton";
import { showView } from "../../../_helpers";
//import { ListType } from "../../../_helpers/ListType";
import { MuiBtnType } from "../../../_helpers/MuiBtnType";

function View({row}){
    return (<DefaultTableView text={row.title}>
        {showView(row)}
    </DefaultTableView>
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