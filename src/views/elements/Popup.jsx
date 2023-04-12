import React from "react";
import Popup from "reactjs-popup";
import { AddEdit as AddEditView } from "../AddEdit";

function PopupWindow(props) {
  const { name, options, setLista, yearId } = props;

  const form = (close) => {
    switch (name) {
      case "destinationViewId":
        return (
          <div className="popup">
            <AddEditView
              popup={true}
              close={close}
              lista={options}
              setLista={setLista}
              yearId={yearId}
            />
          </div>
        );
      default:
        break;
    }
  };

  return name ? (
    <Popup
      style=""
      trigger={
        <button
          type="button"
          id={name}
          className={"btn m-1 btn-success m-0 w-35"}
        >
          +
        </button>
      }
      position="center left"
    >
      {(close) => form(close)}
    </Popup>
  ) : (
    <div />
  );
}
export { PopupWindow };
