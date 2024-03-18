import "regenerator-runtime/runtime";

import React, { useContext, useEffect } from "react";
import { AppContext } from "../_helpers/context";
import { yearsService } from "../_services";
import MuiButton from "../_components/MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";

function Home() {
  const { isSet } = useContext(AppContext);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      await isSet();
      // ...
    }
    fetchData();
  }, []);
  return (
    <div>
      <div className="sticky-top fixed-top text-white">
      </div>
    </div>
  );
}

export { Home };
