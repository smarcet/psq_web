import {createAction, getRequest, deleteRequest, putRequest } from "../base-actions";
import {authErrorHandler, START_LOADING, STOP_LOADING} from "../base-actions";
import {DEFAULT_PAGE_SIZE} from "../../constants";

export const RETRIEVED_MY_DEVICES = 'RETRIEVED_MY_DEVICES';
export const RETRIEVED_DEVICE = 'RETRIEVED_DEVICE';
export const RETRIEVED_RAW_AND_ADMIN_USERS = 'RETRIEVED_RAW_AND_ADMIN_USERS';
export const LINKED_USER_2_DEVICE = 'LINKED_USER_2_DEVICE';
export const UNLINKED_USER_2_DEVICE = 'UNLINKED_USER_2_DEVICE';
export const LINKED_ADMIN_USER_2_DEVICE = 'LINKED_ADMIN_USER_2_DEVICE';
export const UNLINKED_ADMIN_USER_2_DEVICE = 'UNLINKED_ADMIN_USER_2_DEVICE';
export const RETRIEVED_ADMIN_USERS = 'RETRIEVED_ADMIN_USERS';
export const UPDATED_DEVICE = 'UPDATED_DEVICE';
export const RETRIEVED_ALL_DEVICES = 'RETRIEVED_ALL_DEVICES';

export const getMyDevicesByPage = (currentPage = 1, pageSize = DEFAULT_PAGE_SIZE, searchTerm = '', ordering = 'id') => (dispatch, getState) => {
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

export const getAllDevicesByPage = (currentPage = 1, pageSize = 10, searchTerm = '') => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { token }           = loggedUserState;
    let apiBaseUrl          = process.env['API_BASE_URL'];

    let params = {
        token : token,
        page: currentPage,
        page_size : pageSize,
    };

    if(searchTerm != ''){
        params['search'] = searchTerm;
    }

    getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_ALL_DEVICES),
        `${apiBaseUrl}/devices`,
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

export const searchAdminAndRawUsers = (searchTerm = '', naxResults = DEFAULT_PAGE_SIZE) => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { token }           = loggedUserState;
    let apiBaseUrl          = process.env['API_BASE_URL'];

    let params = {
        token : token,
        search: searchTerm,
        page: 1,
        page_size : naxResults,
    };

    getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_RAW_AND_ADMIN_USERS),
        `${apiBaseUrl}/users/non-super-admin`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const linkUser2Device = (device, user) => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { token }           = loggedUserState;
    let apiBaseUrl          = process.env['API_BASE_URL'];

    let params = {
        token : token,
    };

    return putRequest(
        createAction(START_LOADING),
        createAction(LINKED_USER_2_DEVICE)(user),
        `${apiBaseUrl}/devices/${device.id}/users/${user.id}`,
        {},
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const unLinkUser2Device = (device, user) => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { token }           = loggedUserState;
    let apiBaseUrl          = process.env['API_BASE_URL'];

    let params = {
        token : token,
    };

    return deleteRequest(
        createAction(START_LOADING),
        createAction(UNLINKED_USER_2_DEVICE)(user),
        `${apiBaseUrl}/devices/${device.id}/users/${user.id}`,
        {},
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const linkAdminUser2Device= (device, user) => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { token }           = loggedUserState;
    let apiBaseUrl          = process.env['API_BASE_URL'];

    let params = {
        token : token,
    };

    return putRequest(
        createAction(START_LOADING),
        createAction(LINKED_ADMIN_USER_2_DEVICE)(user),
        `${apiBaseUrl}/devices/${device.id}/admins/${user.id}`,
        {},
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const unLinkAdminUser2Device= (device, user) => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { token }           = loggedUserState;
    let apiBaseUrl          = process.env['API_BASE_URL'];

    let params = {
        token : token,
    };

    return deleteRequest(
        createAction(START_LOADING),
        createAction(UNLINKED_ADMIN_USER_2_DEVICE)(user),
        `${apiBaseUrl}/devices/${device.id}/admins/${user.id}`,
        {},
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const searchAdminUsers = (searchTerm = '', naxResults = 5) => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { token }           = loggedUserState;
    let apiBaseUrl          = process.env['API_BASE_URL'];

    let params = {
        token : token,
        search: searchTerm,
        page: 1,
        page_size : naxResults,
    };

    getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_ADMIN_USERS),
        `${apiBaseUrl}/users/admins`,
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

    let deviceId = device.id;
    return putRequest(
        createAction(START_LOADING),
        createAction(UPDATED_DEVICE),
        `${apiBaseUrl}/devices/${deviceId}`,
        {
            friendly_name : device.friendly_name,
            slots : device.slots,
            is_active : device.is_active,
        },
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
};