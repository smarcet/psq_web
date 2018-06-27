import {createAction, getRequest, deleteRequest, putRequest, postRequest} from "../base-actions";
import {authErrorHandler, START_LOADING, STOP_LOADING} from "../base-actions";

export const RETRIEVED_ADMIN_USERS = 'RETRIEVED_ADMIN_USERS';
export const DELETED_ADMIN_USER = 'DELETED_ADMIN_USER';
export const RETRIEVED_ADMIN_USER = 'RETRIEVED_ADMIN_USER';
export const UPDATED_ADMIN_USER = 'UPDATED_ADMIN_USER';
export const RETRIEVED_AVAILABLE_DEVICES = 'RETRIEVED_AVAILABLE_DEVICES';
export const RETRIEVED_OWNED_DEVICES = 'RETRIEVED_OWNED_DEVICES';
export const UNLINKED_DEVICE = 'UNLINKED_DEVICE';
export const LINK_DEVICE = 'LINK_DEVICE';
export const NEW_ADMIN_USER = 'NEW_ADMIN_USER';

export const getAdminUsersByPage = (currentPage = 1, pageSize = 5, searchTerm = '', ordering = '') => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { token }           = loggedUserState;
    let apiBaseUrl          = process.env['API_BASE_URL'];

    if(ordering == ''){
        ordering = 'id';
    }

    let params = {
        token : token,
        page: currentPage,
        page_size : pageSize,
        ordering  : ordering
    };

    if(searchTerm != ''){
        params['search'] = searchTerm;
    }


    getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_ADMIN_USERS),
        `${apiBaseUrl}/admin-users`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const getAdminUserById = (userId) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];


    let params = {
        token: token,
    };

    return getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_ADMIN_USER),
        `${apiBaseUrl}/admin-users/${userId}`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const getAvailableDevices = (searchTerm = '', naxResults = 5) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
        search: searchTerm
    };

    return getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_AVAILABLE_DEVICES),
        `${apiBaseUrl}/devices`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const getUserOwnedDevices =(userId) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    return getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_OWNED_DEVICES),
        `${apiBaseUrl}/admin-users/${userId}/owned-devices`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const unLinkDevice = (userId, device) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    return deleteRequest(
        createAction(START_LOADING),
        createAction(UNLINKED_DEVICE)({deviceId:device.id}),
        `${apiBaseUrl}/admin-users/${userId}/owned-devices/${device.id}`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const linkDevice = (userId, device) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    return putRequest(
        createAction(START_LOADING),
        createAction(LINK_DEVICE)(device),
        `${apiBaseUrl}/admin-users/${userId}/owned-devices/${device.id}`,
        {},
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const createNewAdminUser = (newAdminUser) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    return postRequest(
        createAction(START_LOADING),
        createAction(NEW_ADMIN_USER),
        `${apiBaseUrl}/admin-users`,
        newAdminUser,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const deleteAdminUser = (userId) =>  (dispatch, getState) => {

    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    return deleteRequest(
        createAction(START_LOADING),
        createAction(DELETED_ADMIN_USER)({userId:userId}),
        `${apiBaseUrl}/admin-users/${userId}`,
        {},
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const resendUserVerification  = (userId) =>  (dispatch, getState) => {

    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    return postRequest(
        createAction(START_LOADING),
        null,
        `${apiBaseUrl}/users/${userId}/verification/resend`,
        {},
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}
