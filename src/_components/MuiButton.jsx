import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from "@mui/material";
export default function MuiButton({icon, text, onClick, className = "", disabled = false, tooltip = "Operacja zabroniona", showTooltip = false}) {

  return (
    <Tooltip arrow title={tooltip} placement="bottom" disableInteractive disableTouchListener={!disabled && !showTooltip} disableHoverListener={!disabled && !showTooltip} disableFocusListener={!disabled && !showTooltip} >
      <span>
        <button 
          className={disabled? `btn m-1 rounded-1 cursor-default btn-disabled text-dark ${className}` : `btn m-1 rounded-1 ${icon && icon.color} ${className}` }
          onClick={onClick}
          style={disabled ? { pointerEvents: 'none' } : {}}
          type="submit"
          disabled={disabled}
          >
            {icon && icon.icon && <FontAwesomeIcon icon={icon.icon} />}
            {text && <span className="ml-1">{text}</span>}
        </button>
      </span>
    </Tooltip>
  );
}
