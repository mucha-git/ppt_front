import React from "react";
import { TextElement } from "./TextElement";
import { GraphicWithTextElement } from "./GraphicWithTextElement";
import { GraphicElement } from "./GraphicElement";
import { YoutubePlayerElement } from "./YoutubePlayerElement";
import { DividerElement } from "./DividerElement";
import { MapElement } from "./MapElement";
import { NavigationElement } from "./NavigationElement";
import DefaultTableView from "../../../_components/DefaultTableView";
import { ElementType } from "../../../_helpers/ElementType";

function Element({ row }) {
  switch (row.type) {
    case "Text":
      return (
        <DefaultTableView text={ElementType.Text}>
          <TextElement row={row} />
        </DefaultTableView>
      );
    case "GraphicWithText":
      return (
        <DefaultTableView text={ElementType.GraphicWithText}>
          <GraphicWithTextElement row={row} />
        </DefaultTableView>
      );
    case "Graphic":
      return (
        <DefaultTableView text={ElementType.Graphic}>
          <GraphicElement row={row} />
        </DefaultTableView>
      );
    case "YoutubePlayer":
      return (
        <DefaultTableView text={ElementType.YoutubePlayer}>
          <YoutubePlayerElement row={row} />
        </DefaultTableView>
      );
    case "Divider":
      return (
        <DefaultTableView text={ElementType.Divider}>
          <DividerElement row={row} />
        </DefaultTableView>
      );
    case "Map":
      return (
        <DefaultTableView text={ElementType.Map}>
          <MapElement row={row} />
        </DefaultTableView>
      );
    case "Navigation":
      return (
        <DefaultTableView text={ElementType.Navigation}>
          <NavigationElement row={row} />
        </DefaultTableView>
      );
    case "View":
      return (
        <DefaultTableView text={ElementType.View}>
          <NavigationElement row={row} />
        </DefaultTableView>
      );
    default:
      break;
  }
  return null;
}

export { Element };
