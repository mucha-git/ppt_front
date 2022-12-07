import 'regenerator-runtime/runtime';

import React, { useState, useEffect, useContext } from "react";
import { SignalRContext } from "@/_helpers/context";
import { Status } from '@/_helpers';
import { tradeService } from '@/_services';
import {
    getActualPipsDifference,
    getActualPipsValueInMoney
  } from "@/_helpers";
import { FullView } from './components/FullView';
import { Buttons } from './components/Buttons';
import { Instruments } from './components/Instruments';
import { Total } from './components/Total';
import { ButtonsMobile } from './components/ButtonsMobile';

function Home() {
    const signalRContext = useContext(SignalRContext);
    const { 
        isSet, 
        trades, 
        setTrades,
        tradeToUpdate,
        setTradeToUpdate,
        actualInstrumentsExchange,
        groupView
    } = signalRContext;
    // const [trades, setTrades] = useState([]);
    const [tradeIsUpdating, setTradeIsUpdating] = useState();
    const [tradeIsClosing, setTradeIsClosing] = useState();
    const [loading, setLoading] = useState(false);
    const [totalVolume, setTotalVolume] = useState(0);
    const [totalProfit, setTotalProfit] = useState(0);
    

    useEffect(() => {
        async function fetchData() {
            await isSet()
        }
        fetchData();
        }, []
    );

    useEffect(() => {
        if (tradeToUpdate != null) {
            let afterUpdate = trades.map((a) => {
                if (a.id == tradeToUpdate.id) {
                    return tradeToUpdate;
                }
                return a;
            });
            // setTrades(afterUpdate);
            modifyTradesForViewInBotstrapTable2(afterUpdate);
            setTradeToUpdate(null);
        }
      }, [tradeToUpdate]
    );

    useEffect(() => {
            modifyTradesForViewInBotstrapTable2(trades);
        }, [actualInstrumentsExchange]
    );

    function modifyTradesForViewInBotstrapTable2(trades){
        if(trades){
            let newTrades = trades.map((a) => {
                a.buttonAkcjaId = a.id+"akcja"
                a.buttonLikwidacjaId = a.id+"likwidacja"
                a.prowizja = a.volume.toFixed(5)*7
                a.realPipsDifference = actualInstrumentsExchange ? getActualPipsDifference(a,actualInstrumentsExchange) : 0
                a.currentAmount = actualInstrumentsExchange ? parseFloat(getActualPipsValueInMoney(a,actualInstrumentsExchange).toFixed(2)) :0
                return a;
            });
            setTrades(newTrades);
            setTotalVolume(newTrades.length>0 ? newTrades.map(item => item.status == Status.Active.id?item.volume: 0).reduce((prev, next) => prev + next) : 0);
            setTotalProfit(newTrades.length>0 ? newTrades.map(item => item.status == Status.Active.id?item.currentAmount: 0).reduce((prev, next) => prev + next) : 0);
        } 
    }

    function updateTrade(trade){
        tradeService.updateTrade(trade).then(a => {           
            setTradeIsUpdating()        
            setTradeIsClosing() 
            setTrades(a.sort((a, b) => a.id - b.id)
            );
        })
    }

    function updateTradesStatus(status){
        var props = {status: status.id}
        tradeService.updateAllTrades(props).then(a => {           
            setTradeIsUpdating()        
            setTradeIsClosing() 
            setTrades(a.sort((a, b) => a.id - b.id)
            );
        })
    }

    function reloadTrades(){
        setLoading(true)
        tradeService.getTrades().then(a => {
            setTrades(a.sort((a, b) => a.id - b.id));
            setLoading(false)
        })
    }

    function setPositionStatus(trade, status){
        setTradeIsUpdating(trade.id) 
        updateTradeStatus(trade, status)
    }

    function updateTradeStatus(trade, status){
        //let instrument = actualInstrumentsExchange.find(element => element.nazwa == trade.symbol);
        //let updatedValue = trade.isBuying ? instrument.ask : instrument.bid

        let tradeUpdate = JSON.parse(JSON.stringify(trade))
        //if(status == Status.Active.id) tradeUpdate.value = updatedValue
        //if(status == Status.OnHold.id && trade.status == Status.Active.id) tradeUpdate.value = updatedValue
        //if(status == Status.Closed.id && trade.status == Status.Active.id) tradeUpdate.value = updatedValue
        tradeUpdate.status=status;
        updateTrade(tradeUpdate);
    }

    return (
        <div>
            <div className="sticky-top fixed-top text-white">
                <Total 
                    totalProfit={totalProfit} 
                    totalVolume={totalVolume} 
                />
                {groupView && <ButtonsMobile updateTradesStatus={(status) => updateTradesStatus(status)} />}
            </div>
            {!groupView && <button className="btn btn-secondary" style={{width:"200px"}} onClick={() => reloadTrades()}>ODŚWIEŻ</button>}
            <div className='row'>
                <div className='col'><center><Instruments loading={loading} setPositionStatus={(trade, status) => setPositionStatus(trade, status)} /></center></div>
                {!groupView && <div className='col'><Buttons loading={loading} updateTradesStatus={(status) => updateTradesStatus(status)} /></div>}
            </div>
            {!groupView && <FullView loading={loading} setPositionStatus={(trade, status) => setPositionStatus(trade, status)} tradeIsUpdating={tradeIsUpdating} tradeIsClosing={tradeIsClosing} />
                }
        </div>
    );
}

export { Home };