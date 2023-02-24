import React from "react";

function GraphicWithTextElement({row}){
    const img = new Image()
    img.src = row.imgSrc
    let width = 100
    let height = width * img.height / img.width
    return (
        <div>
            <div className="left" >
                <img src={row.imgSrc} width={width} height={height} />
            </div>
            <div className="left m-2" >
                {row.text}
            </div>
            <div className="clear" />
        </div>
    )
    }

export { GraphicWithTextElement }