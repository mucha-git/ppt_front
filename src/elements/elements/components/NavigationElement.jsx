import React, { useContext } from "react";
import { View } from "../../../views/elements/components/View";
import MuiButton from "../../../_components/MuiButton";
import { AppContext } from "../../../_helpers/context";
import { MuiBtnType } from "../../../_helpers/MuiBtnType";

function NavigationElement({ row }) {
  const { views } = useContext(AppContext);
  const view = views.find((v) => v.id == row.destinationViewId);
  function setText(view) {
    let text = view.title
    if(view.viewId != null){
      text = setText(view.view) + " / " + text;
    }
    return text
  }
  if (view == null) return <div></div>
  return row.viewId == view.viewId? <View row={view} />: <div><MuiButton text={setText(view)} type="button" className={"font-weight-bold cursor-default"} icon={MuiBtnType.ArrowRight} /></div>;
}

export { NavigationElement };
