import React, { createContext, useState } from "react";
import {
  tradeService
} from "@/_services";
import {browseOnMobile as mobile} from '../funkcje';

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const {
    set: initialSet,
    children,
    //SignalR
    connectionId: initialConnectionId,
    activeUsers: initialActiveUsers,
    closeSignalRConnection: initialCloseSignalRConnection,
    trades: initialTrades,
    actualInstrumentsExchange: initialInstrumentsExchange,

    tradeToUpdate:initialTradeToUpdate,
    //groupView
    groupView: initialGroupView,
    browseOnMobile: initialBrowseOnMobile
  } = props;

  // Use State to keep the values
  
  const [connectionId, setConnectionId] = useState(initialConnectionId);
  const [activeUsers, setActiveUsers] = useState(initialActiveUsers);

  const [trades, setTrades] = useState(initialTrades);
  const [actualInstrumentsExchange, setActualInstrumentsExchange] = useState(initialInstrumentsExchange);
  const [tradeToUpdate, setTradeToUpdate] = useState(initialTradeToUpdate);
  const [closeSignalRConnection, setCloseConnection] = useState(initialCloseSignalRConnection);

  const [set, setSet] = useState(initialSet);
  const [groupView, setGroupView] = useState(initialGroupView);
  const [browseOnMobile, setBrowseOnMobile] = useState(initialBrowseOnMobile);
  async function getTrades(){
    await tradeService.getTrades().then((e) => {
      //console.log("TREJDY ZAŁADOWANE DO CONTEXTU")
    setTrades(e);
    });
  }

  async function getActualInstrumentsExchange(){
    await tradeService.getActualExchange().then((e) => {
      setActualInstrumentsExchange(e)
    });
  }

  async function addContext(a) {
    await getTrades()
    await getActualInstrumentsExchange()
  }
  
  const setConnectionIdSignalR = (x) => {
    setConnectionId(x);
  };

  const setActiveUsersList = (x) => {
    setActiveUsers(x);
  };
  
  const setCloseSignalRConnection = (x) => {
    setCloseConnection(x);
  };

  const resetContext = () => {
    setConnectionId();
    setTrades([]);
    setTradeToUpdate();
    setActiveUsers([]);
    setCloseConnection(false);
    setSet(false);
    setGroupView(false);
    setBrowseOnMobile(mobile());
  };

  async function setContext() {
    await addContext();
    setBrowseOnMobile(mobile());
    setSet(true);
  }

  async function isSet() {
    if (!set) return await setContext();
  }

  // Make the context object:
  const usersContext = {
    connectionId,
    activeUsers,
    trades,
    tradeToUpdate,
    actualInstrumentsExchange,
    closeSignalRConnection,
    groupView,
    browseOnMobile,
    setContext,
    resetContext,
    setConnectionIdSignalR,
    setActiveUsersList,
    setCloseSignalRConnection,
    setActualInstrumentsExchange,
    setTrades,
    setTradeToUpdate,
    isSet,
    setSet,
    setGroupView,
    set,
  };

  // pass the value in provider and return
  return <Context.Provider value={usersContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

Provider.propTypes = {
 
};

Provider.defaultProps = {
 
};
