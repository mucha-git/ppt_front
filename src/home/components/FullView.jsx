import 'regenerator-runtime/runtime';
import React, { useState, useEffect, useContext } from "react";
import { SignalRContext } from "@/_helpers/context";
import { Status } from '@/_helpers';
import { kolumny } from "../Columns";
import {
    isOnPlusOrMinusDependsOnIsBuying,
    getActualPipsDifference,
    getSpinnerOrButtonText,
    getSpinnerOrCloseButtonText,
    getActualPipsValueInMoney
  } from "@/_helpers";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {
    selectFilter,
    textFilter
  } from "react-bootstrap-table2-filter";

function FullView({loading, setPositionStatus, tradeIsUpdating, tradeIsClosing}) {
    const signalRContext = useContext(SignalRContext);
    const { 
        trades, 
        actualInstrumentsExchange,
        browseOnMobile
    } = signalRContext;

    function columns() {
        let cols = [
            kolumny.KolumnaIdPozycji("ID POZYCJI", textFilter),
            kolumny.KolumnaKupnoSprzedaz("KUPNO/SPRZEDAŻ", textFilter,formatForIsBuying),
            kolumny.KolumnaStatus("STATUS", selectFilter, formatForStatus),
            kolumny.KolumnaSymbol("SYMBOL", selectFilter),
            // kolumny.KolumnaTp("TP", textFilter),
            // kolumny.KolumnaSl("SL", textFilter),
            kolumny.KolumnaVolume("VOLUME", textFilter),
            kolumny.KolumnaProwizja("PROWIZJA", textFilter, formatForProwizja),
            kolumny.KolumnaValue("VALUE", textFilter),
            kolumny.KolumnaRealPips("REAL PIPS", textFilter, formatForRealPips),
            kolumny.KolumnaZyskStrata("PROFIT", textFilter, formatForZyskStrata),
            kolumny.KolumnaAkcja("AKCJA", akcjeForAkcja),
            kolumny.KolumnaLikwidacja("LIKWIDACJA", akcjeForLikwidacja),
        ];
        let colsForMobile = [
            kolumny.KolumnaStatus("STATUS", selectFilter, formatForStatus),
            kolumny.KolumnaSymbol("SYMBOL", selectFilter),
            kolumny.KolumnaVolume("VOLUME", textFilter),
            kolumny.KolumnaZyskStrata("PROFIT", textFilter, formatForZyskStrata),
            kolumny.KolumnaAkcja("AKCJA", akcjeForAkcja),
            kolumny.KolumnaLikwidacja("LIKWIDACJA", akcjeForLikwidacja),
        ];
        return browseOnMobile ? colsForMobile : cols;
    }

    let akcjeForAkcja = (cell, row, rowIndex) => {
        return (
            getButtonForStatus(row)
          );
    }  



    function getButtonForStatus(trade){
        if(trade.comment == "FastWay MT5" || trade.comment == "") return null
        if(trade.status == Status.Active.id && actualInstrumentsExchange && isOnPlusOrMinusDependsOnIsBuying(trade,getActualPipsDifference(trade, actualInstrumentsExchange)) > 0) {
            return <button className="btn btn-primary btn-block btn-lg" onClick={() => setPositionStatus(trade, Status.OnHold.id)} disabled={tradeIsUpdating || tradeIsClosing}>{getSpinnerOrButtonText(trade,"KSIĘGUJ POZYCJĘ", tradeIsUpdating)}</button> 
        }
        if(trade.status == Status.Closed.id) {
            return <button className="btn btn-warning btn-block btn-lg" onClick={() => setPositionStatus(trade, Status.OnHold.id)} disabled={tradeIsUpdating || tradeIsClosing}>{getSpinnerOrButtonText(trade,"PRZYWRÓĆ (ON_HOLD)", tradeIsUpdating)}</button>  
        }
        if(trade.status == Status.OnHold.id) {
            return <button className="btn btn-success btn-block btn-lg" onClick={() => setPositionStatus(trade, Status.Active.id)} disabled={tradeIsUpdating || tradeIsClosing}>{getSpinnerOrButtonText(trade,"AKTYWUJ POZYCJĘ", tradeIsUpdating)}</button>
        }
        return null
    }

    let akcjeForLikwidacja = (cell, row, rowIndex) => {
        return (
            getButtonForClose(row)
          );
    } 

    function getButtonForClose(trade) {
        if(trade.comment == "FastWay MT5" || trade.comment == "") return null
        if(trade.status == Status.Active.id || trade.status == Status.OnHold.id) {
            return <button className="btn btn-danger btn-block btn-lg" onClick={() => setPositionStatus(trade, Status.Closed.id)} disabled={tradeIsUpdating || tradeIsClosing}>{getSpinnerOrCloseButtonText(trade,"ZAMKNIJ POZYCJĘ", tradeIsClosing)}</button>
        }
        if(trade.status == Status.Closed.id) {
            return <button className="btn btn-dark btn-block btn-lg" disabled>ZAMKNIĘTA</button>
        }
        return null
    }
    
    let formatForRealPips = (cell, row, rowIndex) => {
        return actualInstrumentsExchange && isOnPlusOrMinusDependsOnIsBuying(row,getActualPipsDifference(row, actualInstrumentsExchange))
    }

    let formatForZyskStrata = (cell, row, rowIndex) => {
        return row.status == Status.Active.id ? actualInstrumentsExchange &&(getActualPipsValueInMoney(row, actualInstrumentsExchange)).toFixed(2)+"$":"-"
    }

    let formatForIsBuying = (cell, row, rowIndex) => {
        return row.isBuying ? "KUPNO":"SPRZEDAŻ"
    }

    let formatForStatus = (cell, row, rowIndex) => {
        return row.status == Status.Active.id ? Status.Active.value : row.status == Status.Closed.id ? Status.Closed.value : Status.OnHold.value
    }

    let formatForProwizja = (cell, row, rowIndex) => {
        return (-row.prowizja).toFixed(2)+"$"
    }

    return (
        <div>{!loading && trades && actualInstrumentsExchange? 
            <BootstrapTable 
            bootstrap4
            rowClasses={'display-6'}
            keyField='id' 
            data={ trades } 
            columns={ trades&&columns() } 
            filter={filterFactory()}
            // pagination={paginationFactory()}
            /> 
            : "Ładowanie pozycji..."}
            </div>
    )
}

export { FullView }; 