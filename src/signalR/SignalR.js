import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React, { useEffect, useState, useContext } from "react";
import config from "config";
import { accountService, signalRService, alertService } from "@/_services";
import { Role } from "@/_helpers";
import { SignalRContext } from "../_helpers/context";



export const SignalR = () => {
  const [ connection, setConnection ] = useState(null);
  // const [inputText, setInputText] = useState("");
  const { 
    setConnectionIdSignalR,
    setActiveUsersList,
    closeSignalRConnection, 
    trades,
    setActualInstrumentsExchange, 
    setTradeToUpdate,
    setTrades 
  } = useContext(SignalRContext);

  const baseUrl = `${config.apiUrl}/hubs`;

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(`${baseUrl}/frontClient`)
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection){
      closeSignalRConnection && connection.stop()
     }
  }, [closeSignalRConnection]);
  
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
           //console.log("SignalR Connected.");
//ALL USERS PART --->

          connection.send("AddUserWithConnectionId", accountService.userValue.id.toString());
          connection.send("GetAllConnectedUsers");
          // connection.send("GetScreenCaptureImageOfUser", accountService.userValue.id.toString());     

          connection.on("ConnectionID", (message) => {
            // alertService.info(message);
            setConnectionIdSignalR(message);
          });

          connection.on("UpdateTrade", (message) => {
            // alertService.info(message);
            //console.log('UpdateTrade', message)
            setTradeToUpdate(message);
          });

          connection.on("UpdateTrades", (message) => {
            // alertService.info(message);
            //console.log('UpdateTrades', message)
            setTrades(message);
          });

          connection.on("UpdateInstruments", (message) => {
            // alertService.info(message);
            //onsole.log('UpdateInstruments', message)
            setActualInstrumentsExchange(message);
          });

//ALL USERS PART <---

//ADMIN PART --->
          // if(accountService.isAuthorize([Role.Admin])) {
          //   connection.on("GetAllConnectedUsers", (message) => {
          //     setActiveUsersList(JSON.parse(message));
          //   }); 
          // }
        })
        .catch((error) => console.log(error));
//ADMIN PART <------

      }
  }, [connection]);

  return (
    <>
    </>
  );
};