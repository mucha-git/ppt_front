import config from 'config';
import { fetchWrapper } from '@/_helpers';
import { accountService } from '@/_services';

const baseUrl = `https://onesignal.com/api/v1/notifications`;

export const oneSignalService = {
    getNotifications,
    create,
    _delete,
};

function getNotifications() {
    let user = accountService.userValue
    return fetchWrapper.getNotifications(`${baseUrl}?app_id=${user.oneSignalAppId}&kind=1`);
}

function create(params) {
    return fetchWrapper.postNotifications(baseUrl, params);
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    let user = accountService.userValue
    return fetchWrapper.deleteNotifications(`${baseUrl}/${id}?app_id=${user.oneSignalAppId}`);
}