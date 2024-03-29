import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, ClickAwayListener, Popper, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { MuiBtnType } from "../_helpers/MuiBtnType";

export default function MuiButton({
  id,
  icon,
  text,
  type = "submit",
  onClick = () => {},
  className = "",
  disabled = false,
  tooltip = "Operacja zabroniona",
  showTooltip = false,
  'data-testid': dataTestId,
}) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip
        arrow
        componentsProps={{ tooltip: { className: "m-0" } }}
        title={tooltip}
        placement="bottom"
        disableInteractive
        disableTouchListener={!disabled && !showTooltip}
        disableHoverListener={!disabled && !showTooltip}
        disableFocusListener={!disabled && !showTooltip}
      >
        <span style={{height: "fit-content"}}>
          <button
            id={id}
            className={
              disabled
                ? `btn m-1 rounded-1 cursor-default btn-disabled text-dark ${className}`
                : `btn m-1 rounded-1 ${icon && icon.color} ${className}`
            }
            onClick={(e) => (id == null ? onClick() : handleClick(e))}
            style={disabled ? { pointerEvents: "none" } : {}}
            type={type}
            disabled={disabled}
            data-testid={dataTestId}
          >
            {icon && icon.icon }
            {text && <span className="ml-1">{text}</span>}
          </button>
        </span>
      </Tooltip>
      {id && open && (
        <Popper
          style={{ zIndex: 1600 }}
          id={id}
          placement="bottom"
          open={open}
          anchorEl={anchorEl}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <ClickAwayListener
                  disableReactTree={true}
                  onClickAway={handleClose}
                >
                  <div className="p-2">
                    <div>Czy na pewno chcesz wykonać tę operację?</div>
                    <div>
                      <MuiButton
                        icon={MuiBtnType.Yes}
                        text={"Tak"}
                        data-testid={"popup-tak-button"}
                        onClick={() => {
                          onClick();
                          setOpen(false);
                        }}
                      />
                      <MuiButton
                        icon={MuiBtnType.No}
                        text={"Nie"}
                        type="button"
                        data-testid={"popup-nie-button"}
                        onClick={() => setOpen(false)}
                      />
                    </div>
                  </div>
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>
      )}
    </>
  );
}
