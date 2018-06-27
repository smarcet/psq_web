import {createAction, getRequest, deleteRequest, putRequest } from "../base-actions";
import {authErrorHandler, START_LOADING, STOP_LOADING} from "../base-actions";
import {RETRIEVED_ADMIN_USER} from "../superAdmin/admin-users-actions";
export const RETRIEVED_MY_DEVICES = 'RETRIEVED_MY_DEVICES';
export const RETRIEVED_DEVICE = 'RETRIEVED_DEVICE';

export const getMyDevicesByPage = (currentPage = 1, pageSize = 10, searchTerm = '', ordering = 'id') => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { token, currentUser }           = loggedUserState;
    let apiBaseUrl          = process.env['API_BASE_URL'];

    let params = {
        token : token,
        page: currentPage,
        page_size : pageSize,
    };

    getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_MY_DEVICES),
        `${apiBaseUrl}/admin-users/me/devices`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const getMyDeviceById = (deviceId) => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { token }           = loggedUserState;
    let apiBaseUrl          = process.env['API_BASE_URL'];

    let params = {
        token : token,
    };

    getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_DEVICE),
        `${apiBaseUrl}/devices/${deviceId}`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}
