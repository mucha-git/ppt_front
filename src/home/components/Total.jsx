import 'regenerator-runtime/runtime';

import { SignalRContext } from "@/_helpers/context";
import React, {useContext} from "react";

function Total({totalProfit, totalVolume}) {
    const signalRContext = useContext(SignalRContext);
    const {
        browseOnMobile
    } = signalRContext;
    return (
        <div className={totalProfit<0?"m-2 pt-2 text-danger border border-danger background-red":"m-2 pt-2 text-success border border-success background-green"}><div className={browseOnMobile? 'display-3': 'display-5'}><center>LOT {totalVolume.toFixed(2)} / PROFIT {totalProfit.toFixed(2)}$</center></div></div>
    )
}

export { Total }; 