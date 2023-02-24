import React from 'react'
import { TextElement } from './TextElement';
import { GraphicWithTextElement } from './GraphicWithTextElement'
import { GraphicElement } from './GraphicElement'
import { YoutubePlayerElement } from './YoutubePlayerElement'
import { DividerElement } from './DividerElement'
import { MapElement } from './MapElement'
import { NavigationElement } from './NavigationElement'

function Element({row}){
    switch (row.type) {
        case "Text":
            return <TextElement row={row} />
        case "GraphicWithText":
            return <GraphicWithTextElement row={row} />
        case "Graphic":
            return <GraphicElement row={row} />
        case "YoutubePlayer":
            return <YoutubePlayerElement row={row} />
        case "Divider":
            return <DividerElement row={row} />
        case "Map":
            return <MapElement row={row} />
        case "Navigation":
            return <NavigationElement row={row} />
        default:
            break;
    }
    return null
}

export {Element}