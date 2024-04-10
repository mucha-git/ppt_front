import { Subject } from "rxjs";
import React from 'react';
import { filter } from "rxjs/operators";
import { enqueueSnackbar, closeSnackbar } from "notistack";
import MuiButton from "../_components/MuiButton" 
import { MuiBtnType } from "../_helpers/MuiBtnType";

const alertSubject = new Subject();
const defaultId = "default-alert";

export const alertService = {
  onAlert,
  success,
  error,
  info,
  warn,
  alert,
  clear,
};

export const AlertType = {
  Success: "Success",
  Error: "Error",
  Info: "Info",
  Warning: "Warning",
};

// enable subscribing to alerts observable
function onAlert(id = defaultId) {
  return alertSubject.asObservable().pipe(filter((x) => x && x.id === id));
}

// convenience methods
function success(message, options) {
  enqueueSnackbar(message, { variant: "success" });
}

function error(message, options) {
  enqueueSnackbar(message, { variant: "error" });
}

function info(message, options) {
  enqueueSnackbar(message, { ...options, variant: "info", style: { whiteSpace: 'pre-line' }, action:(snackbarId) => (
      <MuiButton icon={MuiBtnType.Close} onClick={() => closeSnackbar(snackbarId)} />
  ) });
}

function warn(message, options) {
  enqueueSnackbar(message, {  variant: "warning" });
}

// core alert method
function alert(alert) {
  alert.id = alert.id || defaultId;
  alert.autoClose = alert.autoClose === undefined ? true : alert.autoClose;
  alertSubject.next(alert);
}

// clear alerts
function clear(id = defaultId) {
  alertSubject.next({ id });
}
