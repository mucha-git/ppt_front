import 'regenerator-runtime/runtime';

import React, { useContext } from "react";
import { SignalRContext } from "@/_helpers/context";
import { Status } from '@/_helpers';

function Instruments({loading, setPositionStatus}) {
    const signalRContext = useContext(SignalRContext);
    const { 
        trades, 
        actualInstrumentsExchange,
        browseOnMobile
    } = signalRContext;

    function setActiveStatusForInstrumentPositions(instrumentName){
        let tradesForInstrument = trades.filter((a) => a.symbol == instrumentName);
        tradesForInstrument.forEach(trade => {
            setPositionStatus(trade, Status.Active.id)
        });
    }

    function setCloseStatusForInstrumentPositions(instrumentName){
        let tradesForInstrument = trades.filter((a) => a.symbol == instrumentName);
        tradesForInstrument.forEach(trade => {
            setPositionStatus(trade, Status.Closed.id)
        });
    }

    function getProfitForInstrumentPositions(instrumentName){
        let tradesForInstrument = trades.filter((a) => a.symbol == instrumentName);
        return tradesForInstrument.length>0 ? tradesForInstrument.map(item => item.status === Status.Active.id?item.currentAmount: 0).reduce((prev, next) => prev + next) : 0
    }

    function getLotForInstrumentPositions(instrumentName){
        let tradesForInstrument = trades.filter((a) => a.symbol == instrumentName);
        return tradesForInstrument.length>0 ? tradesForInstrument.map(item => item.status === Status.Active.id?item.volume: 0).reduce((prev, next) => prev + next) : 0
    }

    function getActualInstrumentsExchange(){
        return(
            <table className={browseOnMobile? 'display-5 table': 'display-6 table'} style={{width: "100%"}}>
                <thead className="thead-light">
                    <tr>
                    <th>NAZWA</th>
                    {browseOnMobile?null:<th>BID</th>}
                    {browseOnMobile?null:<th>ASK </th>}                   
                    <th>LOT</th>                    
                    <th>PROFIT</th>                    
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                {actualInstrumentsExchange.map(t => {
                    var profit = getProfitForInstrumentPositions(t.nazwa);
                    var lot = getLotForInstrumentPositions(t.nazwa);
                    return (
                    <tr key={t.id}>
                        <td scope="row">{t.nazwa}</td>
                        {browseOnMobile?null:<td className={"font-weight-bold text-"+t.bidStatus}>{t.bid.toFixed(5)}</td>}
                        {browseOnMobile?null:<td className={"font-weight-bold text-"+t.askStatus}>{t.ask.toFixed(5)}</td>}
                        <td>{lot&&lot.toFixed(2)}</td>
                        <td className={profit<0?"col-md-auto text-danger":"col-md-auto text-success"}>{profit&&profit.toFixed(2)}</td>
                        <td className="table-responsive-sm"><button className={browseOnMobile?"display-5 btn btn-success btn-block btn-lg":"display-6 btn btn-success btn-block btn-lg"} onClick={() => setActiveStatusForInstrumentPositions(t.nazwa)} >AKTYWUJ WSZYSTKIE</button></td>
                        <td className="table-responsive-sm"><button className={browseOnMobile?"display-5 btn btn-danger btn-block btn-lg":"display-6 btn btn-danger btn-block btn-lg"} onClick={() => setCloseStatusForInstrumentPositions(t.nazwa)} >ZAMKNIJ WSZYSTKIE</button></td>
                    </tr>)
                }) 
                }
                </tbody>
            </table>
        )
    }

    return (
        <div>{!loading && trades && actualInstrumentsExchange ? getActualInstrumentsExchange() : "Ładowanie aktualnych par walutowych..."}</div>
    )
}

export { Instruments }; 