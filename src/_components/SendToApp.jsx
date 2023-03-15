import React, {useContext} from "react";
import { yearsService } from "../_services";
import { AppContext } from "../_helpers/context";
import MuiButton from "./MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";

export default function SendToApp() {
    const {yearId} = useContext(AppContext);
    const saveChangesToApp = () => {
        yearsService.resetYearInRedis({yearId: yearId})
      }

  return (
    <MuiButton icon={MuiBtnType.Send} text={"Wyślij do aplikacji"} onClick={saveChangesToApp} className="p-2 pr-4 pl-4" />
  );
}
