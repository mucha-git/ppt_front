import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function MuiButton({icon, text, onClick, className = ""}) {

  return (
    <button 
      className={`btn m-1 rounded-1  ${icon && icon.color} ${className}` }
      onClick={onClick}
      type="submit"
      >
        {icon && <FontAwesomeIcon icon={icon.icon} />}
        {text && <span className="ml-1">{text}</span>}
    </button>
  );
}
