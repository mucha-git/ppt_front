import React from "react";
import DefaultTableView from "../../../_components/DefaultTableView";

import { showView } from "../../../_helpers";

function View({ row }) {
  return <DefaultTableView text={row.title}>{showView(row)}</DefaultTableView>;
}

export { View };
