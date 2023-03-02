import React, {useContext} from "react";
import { yearsService } from "../_services";
import { AppContext } from "../_helpers/context";

export default function SendToApp() {
    const {yearId} = useContext(AppContext);
    const saveChangesToApp = () => {
        yearsService.resetYearInRedis({yearId: yearId})
      }

  return (
    <button className="button edytuj m-2" onClick={saveChangesToApp}>
        Wyślij zmiany do Aplikacji
    </button>
  );
}
