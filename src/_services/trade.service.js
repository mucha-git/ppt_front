import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const baseUrl = `${config.apiUrl}/Trade`;

export const tradeService = {
    getTrades,
    updateTrade,
    getActualExchange,
    updateAllTrades
};

function getActualExchange() {
    return fetchWrapper.get(`${baseUrl}/getActualExchange`);
}

function getTrades() {
    return fetchWrapper.get(`${baseUrl}/getTrades`);
}

function updateTrade(params) {
    return fetchWrapper.patch(`${baseUrl}/front`, params);
}

function updateAllTrades(params) {
    return fetchWrapper.patch(`${baseUrl}/front/updateAll`, params);
}