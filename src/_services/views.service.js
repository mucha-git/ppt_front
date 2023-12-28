import config from "config";
import { fetchWrapper } from "@/_helpers";

const baseUrl = `${config.apiUrl}/views`;

export const viewsService = {
  getViews,
  create,
  update,
  _delete,
};

function getViews(year) {
  return fetchWrapper.get(`${baseUrl}/${year}`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function update(params) {
  return fetchWrapper.put(baseUrl, params);
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(params) {
  return fetchWrapper.delete(baseUrl, params);
}
