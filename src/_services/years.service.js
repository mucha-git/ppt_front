import config from "config";
import { fetchWrapper } from "@/_helpers";

const baseUrl = `${config.apiUrl}/years`;

export const yearsService = {
  getYears,
  create,
  copy,
  update,
  _delete,
  resetYearInRedis,
};

function getYears() {
  return fetchWrapper.get(baseUrl);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function copy(params) {
  return fetchWrapper.post(`${baseUrl}/copy`, params);
}

function update(params) {
  return fetchWrapper.put(baseUrl, params);
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(params) {
  return fetchWrapper.delete(baseUrl, params);
}

function resetYearInRedis(params) {
  return fetchWrapper.post(`${baseUrl}/resetYearInRedis`, params);
}
