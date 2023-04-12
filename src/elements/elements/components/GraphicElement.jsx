import React from "react";

function GraphicElement({ row }) {
  return <img src={row.imgSrc} width={"100%"} />;
}

export { GraphicElement };
