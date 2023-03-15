import React from "react";
import { TextEditor } from "../../../_components/Formik/Editor";

function GraphicWithTextElement({row}){
    const img = new Image()
    img.src = row.imgSrc
    let width = 50
    let height = width * img.height / img.width
    return (
        <div>
            <div className="left" >
                <img src={row.imgSrc} width={width} height={height} />
            </div>
            <div style={{width: '90%'}} className="left ml-2" >
                <TextEditor value={row.text} disabled={true} />
            </div>
            <div className="clear" />
        </div>
    )
    }

export { GraphicWithTextElement }