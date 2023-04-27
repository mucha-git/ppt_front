import React, { useContext } from "react";
import { View } from "../../../views/elements/components/View";
import MuiButton from "../../../_components/MuiButton";
import { AppContext } from "../../../_helpers/context";
import { MuiBtnType } from "../../../_helpers/MuiBtnType";

function NavigationElement({ row }) {
  const { views } = useContext(AppContext);
  const view = views.find((v) => v.id == row.destinationViewId);
  return row.viewId == view.viewId? <View row={view} />: <div><MuiButton text={view.title} type="button" className={"font-weight-bold cursor-default"} icon={MuiBtnType.ArrowRight} /></div>;
}

export { NavigationElement };
