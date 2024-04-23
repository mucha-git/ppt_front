import config from "config";
import { fetchWrapper } from "@/_helpers";

const baseUrl = `${config.apiUrl}/gps`;

export const gpsService = {
  getGroups,
  getDevices
};

function getGroups() {
  return fetchWrapper.get(`${baseUrl}/groups`);
}

function getDevices(a){
  return fetchWrapper.get(`${baseUrl}/devices/${a}`);
}
