import { Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { enqueueSnackbar } from "notistack";

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
  enqueueSnackbar(message, { variant: "info" });
}

function warn(message, options) {
  enqueueSnackbar(message, { variant: "warning" });
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
