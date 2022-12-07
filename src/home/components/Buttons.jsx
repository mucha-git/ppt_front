import 'regenerator-runtime/runtime';

import React, { useContext } from "react";
import { SignalRContext } from "@/_helpers/context";
import { Status } from '@/_helpers';

function Buttons({loading, updateTradesStatus}) {
    const signalRContext = useContext(SignalRContext);
    const { 
        trades, 
        actualInstrumentsExchange,
        browseOnMobile
    } = signalRContext;


    function getButtons(){
        return <div className="col">
                    <div className="row"><button className={browseOnMobile?"display-3 m-1 btn btn-success btn-block btn-lg":"display-5 m-1 btn btn-success btn-block btn-lg"} onClick={() => updateTradesStatus(Status.Active)} >AKTYWUJ WSZYSTKIE</button></div>
                    <div className="row"><button className={browseOnMobile?"display-3 m-1 btn btn-danger btn-block btn-lg":"display-5 m-1 btn btn-danger btn-block btn-lg"} onClick={() => updateTradesStatus(Status.Closed)} >ZAMKNIJ WSZYSTKIE</button></div>
                    <div className="row"><button className={browseOnMobile?"display-3 m-1 btn btn-primary btn-block btn-lg":"display-5 m-1 btn btn-primary btn-block btn-lg"} onClick={() => updateTradesStatus(Status.OnHold)} >KSIĘGUJ WSZYSTKIE</button></div>
                    <div className="row"><button className={browseOnMobile?"display-3 m-1 btn btn-warning btn-block btn-lg":"display-5 m-1 btn btn-warning btn-block btn-lg"}onClick={() => updateTradesStatus(Status.OnHold)} >PRZYWRÓĆ WSZYSTKIE</button></div>
                </div>
    }

    return (
        <div>{!loading && trades && actualInstrumentsExchange ? getButtons(): null }</div>
    )
}

export { Buttons }; 