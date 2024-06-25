import config from "config";
import { accountService } from "@/_services";

export const fetchWrapper = {
  get,
  getNotifications,
  getAppInfo,
  post,
  postNotifications,
  put,
  patch,
  delete: _delete,
  deleteNotifications,
};

function get(url) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(url),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function getNotifications(url) {
  const user = accountService.userValue;
  const requestOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Basic ${user.oneSignalApiKey}`,
    },
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function getAppInfo(url) {
  const user = accountService.userValue;
  const requestOptions = {
    method: "GET",
    headers: {
      accept: "text/plain",
      Authorization: `Basic ${user.oneSignalApiKey}`,
      "content-type": "application/json",
    },
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    credentials: "include",
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function postNotifications(url, body) {
  const user = accountService.userValue;
  const requestOptions = {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Basic ${user.oneSignalApiKey}`,
      "content-type": "application/json",
    },
    //credentials: 'include',
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function patch(url, body) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url, body) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    body: JSON.stringify(body)
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function deleteNotifications(url) {
  const user = accountService.userValue;
  const requestOptions = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      Authorization: `Basic ${user.oneSignalApiKey}`,
    },
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = accountService.userValue;
  const isLoggedIn = user && user.jwtToken;
  const isApiUrl = url.startsWith(config.apiUrl);
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.jwtToken}` };
  } else {
    return {};
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if ([401, 403].includes(response.status) && accountService.userValue) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        accountService.logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
