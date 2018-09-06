import {createAction, getRequest, deleteRequest, putRequest } from "../base-actions";
import {authErrorHandler, START_LOADING, STOP_LOADING} from "../base-actions";

export const RETRIEVED_DEVICES = 'RETRIEVED_DEVICES';
export const DELETED_DEVICE = 'DELETED_DEVICE';
export const DEVICE_VERIFIED = 'DEVICE_VERIFIED';
export const RETRIEVED_DEVICE = 'RETRIEVED_DEVICE';
export const RETRIEVED_AVAILABLE_ADMINS = 'RETRIEVED_AVAILABLE_ADMINS';
export const UPDATED_DEVICE = 'UPDATED_DEVICE';

export const getDevicesByPage = (currentPage = 1, pageSize = 10) => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { token }           = loggedUserState;
    let apiBaseUrl          = process.env['API_BASE_URL'];

    let params = {
        token : token,
        page: currentPage,
        page_size : pageSize,
    };

    getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_DEVICES),
        `${apiBaseUrl}/devices`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const updateDevice = (device) =>  (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { token }           = loggedUserState;
    let apiBaseUrl          = process.env['API_BASE_URL'];

    let params = {
        token : token,
    };

    if(device.owner != null && typeof device.owner === 'object')
        device.owner = device.owner.id;


    let deviceId = device.id;
    return putRequest(
        createAction(START_LOADING),
        createAction(UPDATED_DEVICE),
        `${apiBaseUrl}/devices/${deviceId}`,
        device,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
};

export const deleteDevice  = (deviceId) => (dispatch, getState) => {

    let { loggedUserState } = getState();
    let { token }           = loggedUserState;
    let apiBaseUrl          = process.env['API_BASE_URL'];

    let params = {
        token : token,
    };

    return deleteRequest(
        createAction(START_LOADING),
        createAction(DELETED_DEVICE)({deviceId}),
        `${apiBaseUrl}/devices/${deviceId}`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const verifyDevice = (deviceId, friendlyName) =>  (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { token }           = loggedUserState;
    let apiBaseUrl          = process.env['API_BASE_URL'];


    let params = {
        token : token,
    };

    return putRequest(
        createAction(START_LOADING),
        createAction(DEVICE_VERIFIED)({deviceId, friendlyName}),
        `${apiBaseUrl}/devices/${deviceId}/verify`,
        {
            friendly_name: friendlyName
        },
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });

    });
}


export const getDeviceById = (deviceId) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    return getRequest(
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

export const getAvailableAdmins = () => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    return getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_AVAILABLE_ADMINS),
        `${apiBaseUrl}/admin-users`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}