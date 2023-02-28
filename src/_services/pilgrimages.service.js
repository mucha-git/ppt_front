import config from 'config';
import { fetchWrapper } from '@/_helpers';

const baseUrl = `${config.apiUrl}/pilgrimages`;

export const pilgrimagesService = {
    getPilgrimages,
    create,
    update,
    _delete
};

function getPilgrimages() {
    return fetchWrapper.get(baseUrl);
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

