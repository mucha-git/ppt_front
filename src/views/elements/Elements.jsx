import React from "react";
import { ScreenType } from "../../_helpers/ScreenType";
import { ListScreen } from "./ScreenType/ListScreen";
import { TextScreen } from "./ScreenType/TextScreen";

function Elements({ view, path }) {
    const SubView = () => {
        switch (view.screenType) {
            case ScreenType[1].value: return <ListScreen view={view} path={path} />
            case ScreenType[2].value: return <TextScreen view={view} path={path} />
        }
    }

  return (
        <div className={"pt-20 pb-20"}>
            {SubView()}
        </div>
  );
}

export { Elements };