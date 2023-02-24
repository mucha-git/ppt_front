import React from "react";

function GraphicView({row}){
    return (
        <img src={row.imgSrc} width={"100%"} />
    )
    }

export { GraphicView }