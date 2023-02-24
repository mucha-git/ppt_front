import React from "react";

function DividerElement({row}){
    return (
        <div style={{backgroundColor: row.color, margin: row.margin, height: row.height, maxWidth: '100%'}} />
    )
    }

export { DividerElement }