import config from "config";
import { fetchWrapper } from "@/_helpers";

const baseUrl = `${config.apiUrl}/pilgrimages`;

export const applicationsService = {
  getApplications,
  create,
  postMessage,
  update,
  _delete,
};

function getApplications() {
  return fetchWrapper.get(baseUrl);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function postMessage(params) {
  return fetchWrapper.post(`${baseUrl}/oneSignal`, params);
}

function update(params) {
  return fetchWrapper.put(baseUrl, params);
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(params) {
  return fetchWrapper.delete(baseUrl, params);
}
