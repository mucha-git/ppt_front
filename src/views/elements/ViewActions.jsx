import React, { useContext } from "react";
import { viewsService, alertService } from "@/_services";
import { ScreenType } from "../../_helpers/ScreenType";
import { AppContext } from "../../_helpers/context";
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";
import { ListType } from "../../_helpers/ListType";
import { history } from "../../_helpers";
import "./styles.css";

function Actions(props) {
  const { updateViews, views, elements } = useContext(AppContext);
  const addButtonPath = () => {
    switch (props.row.screenType) {
      case ScreenType[1].value:
        return `${props.path}/dodaj`;
      case ScreenType[2].value:
        return `/elements/dodaj`;
    }
  };

  const isInternalType = () => {
    return (
      props.row.type == ListType[0].value 
      || props.row.type == ListType[1].value 
      || props.row.type == ListType[2].value
    );
  };

  const isExpandable = () => {
    return (
      isInternalType() &&
      (elements.filter((e) => e.viewId == props.row.id).length > 0 ||
        views.filter((v) => v.viewId == props.row.id).length > 0)
    );
  };

  const expandButton = () => {
    let visability = isExpandable() ? "" : "invisible";
    if (props.expanded.find((a) => a == props.row.id) != undefined) {
      return (
        <div className={visability}>
          <MuiButton
            icon={MuiBtnType.ArrowUp}
            data-testid={`widoki-${props.row.id}.rozwin-button`}
            onClick={() => props.setExpanded(props.expanded.filter((x) => x !== props.row.id))}
          />
        </div>
      );
    } else {
      return (
        <div className={visability}>
          <MuiButton
            icon={MuiBtnType.ArrowDown}
            data-testid={`widoki-${props.row.id}.rozwin-button`}
            onClick={() => props.setExpanded([props.row.id].concat(props.expanded))}
          />
        </div>
      );
    }
  };

  return (
    <div className={"d-flex align-items-start colDirection h-100 "}>
      <div className="d-flex justify-content-end colDirection w-100 h-100">
        <div className="d-flex colDirection">
          {isInternalType() && (
            <MuiButton
              icon={MuiBtnType.Add}
              showTooltip={true}
              tooltip={"Dodaj podwidok/podelement"}
              data-testid={`widoki-${props.row.id}.dodajPodwidok-button`}
              onClick={() =>
                history.push({
                  pathname: addButtonPath(),
                  state: {
                    yearId: props.row.yearId,
                    parentViewId: props.row.id,
                    opened: props.expanded
                  },
                })
              }
            />
          )}

          <MuiButton
            icon={MuiBtnType.Edit}
            showTooltip={true}
            tooltip={"Edytuj widok"}
            data-testid={`widoki-${props.row.id}.edytujWidok-button`}
            onClick={() =>
              history.push({
                pathname: `${props.path}/edytuj`,
                state: { row: props.row, opened: props.expanded },
              })
            }
          />
          <MuiButton
            icon={MuiBtnType.Delete}
            id={"delete-view-" + props.cell}
            showTooltip={true}
            tooltip={"Usuń widok"}
            data-testid={`widoki-${props.row.id}.usunWidok-button`}
            onClick={() => {
              viewsService._delete({ yearId: props.row.yearId, id: props.cell}).then(() => {
                updateViews(props.row.yearId);
                alertService.success("Pomyslnie usunięto widok");
              });
            }}
          />
        </div>

        <div className="mt-auto">{expandButton()}</div>
      </div>
    </div>
  );
}

export { Actions };
