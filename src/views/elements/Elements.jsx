import React from "react";
import { ScreenType } from "../../_helpers/ScreenType";
import { ListScreen } from "./ScreenType/ListScreen";
import { TextScreen } from "./ScreenType/TextScreen";

function Elements({ view, path, opened }) {
  const SubView = () => {
    switch (view.screenType) {
      case ScreenType[1].value:
        return <ListScreen view={view} path={path} opened={opened} />;
      case ScreenType[2].value:
        return <TextScreen view={view} path={path} opened={opened} />;
    }
  };

  return <div>{SubView()}</div>;
}

export { Elements };
