import React, {useState, useRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, ClickAwayListener, Popper, Tooltip } from "@mui/material";
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { MuiBtnType } from "../_helpers/MuiBtnType";

export default function MuiButton({ id, icon, text, onClick, className = "", disabled = false, tooltip = "Operacja zabroniona", showTooltip = false}) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [disableTooltip, setDisableTooltip] = useState(!disabled && !showTooltip)
  const anchorRef = useRef(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Tooltip arrow title={tooltip} placement="bottom" disableInteractive disableTouchListener={disableTooltip} disableHoverListener={disableTooltip} disableFocusListener={disableTooltip} >
      <span>
        <button 
          id={id}
          className={disabled? `btn m-1 rounded-1 cursor-default btn-disabled text-dark ${className}` : `btn m-1 rounded-1 ${icon && icon.color} ${className}` }
          onClick={(e) => id == null? onClick(): handleClick(e)}
          style={disabled ? { pointerEvents: 'none' } : {}}
          type="submit"
          disabled={disabled}
          >
            {icon && icon.icon && <FontAwesomeIcon icon={icon.icon} />}
            {text && <span className="ml-1">{text}</span>}
        </button>
      </span>
    </Tooltip>
    {id && open && <Popper  
      style={{zIndex: 1600}} 
      id={id} 
      placement="bottom" 
      open={open} 
      anchorEl={anchorEl} 
      transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            <ClickAwayListener disableReactTree={true} onClickAway={handleClose}>
              <Typography sx={{ p: 2 }}>
                <div>Czy na pewno chcesz wykonać tą operację?</div>
                <div><MuiButton icon={MuiBtnType.Yes} text={"Tak"} onClick={() => {onClick(); setOpen(false)}} />
                <MuiButton icon={MuiBtnType.No} text={"Nie"} onClick={() => setOpen(false)} /></div>
              </Typography>
            </ClickAwayListener>
          </Paper>
        </Fade>
      )}
    </Popper>}
    </>
  );
}
