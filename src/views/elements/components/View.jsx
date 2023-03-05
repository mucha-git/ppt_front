import React from 'react'
import { TextView } from './TextView';
import { GraphicView } from './GraphicView'

function View({row}){
    console.log(row)
    switch (row.type) {
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
    return null
}

export {View}