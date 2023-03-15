import React from "react";

function DividerElement({row}){
    return (
        <div className="w-100">
            <div style={{backgroundColor: row.color, margin: row.margin, height: row.height, maxWidth: '100%'}} />
            <div class="d-flex justify-content-around">
                <div><strong>Kolor: </strong>{row.color}</div>
                <div><strong>Wysokość: </strong>{row.height} px</div>
                <div><strong>Margines: </strong>{row.margin} px</div>
            </div>
        </div>
    )
    }

export { DividerElement }