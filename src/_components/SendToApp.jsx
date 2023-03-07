import React, {useContext} from "react";
import { yearsService } from "../_services";
import { AppContext } from "../_helpers/context";

export default function SendToApp() {
    const {yearId} = useContext(AppContext);
    const saveChangesToApp = () => {
        yearsService.resetYearInRedis({yearId: yearId})
      }

  return (
    <button className="btn m-1 btn-success" onClick={saveChangesToApp}>
        Wyślij zmiany do Aplikacji
    </button>
  );
}
