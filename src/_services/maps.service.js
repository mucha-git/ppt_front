import config from 'config';
import { fetchWrapper } from '@/_helpers';

const baseUrl = `${config.apiUrl}/maps`;

export const mapsService = {
    getMaps,
    getMapById,
    create,
    update,
    _delete
};

function getMaps(year) {
    return fetchWrapper.get(`${baseUrl}/${year}`);
}

function getMapById(id) {
    return fetchWrapper.get(`${baseUrl}/id/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(params) {
    return fetchWrapper.put(baseUrl, params);
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}

