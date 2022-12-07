import config from "config";
import { fetchWrapper } from "@/_helpers";

const baseUrl = `${config.apiUrl}/FrontClientSignalR`;

export const signalRService = {
  getConnectedUsers,
  updateTradesForAccount
};

function getConnectedUsers() {
  return fetchWrapper.get(`${baseUrl}/ConnectedUsers`);
}

function updateTradesForAccount() {
  return fetchWrapper.get(`${baseUrl}/UpdateTradesForAccount`);
}