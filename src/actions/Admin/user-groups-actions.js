import {createAction, getRequest, deleteRequest, putRequest, postRequest} from "../base-actions";
import {authErrorHandler, START_LOADING, STOP_LOADING} from "../base-actions";
import {DEFAULT_PAGE_SIZE} from "../../constants";
import {RETRIEVED_MY_USERS} from "./users-actions";
import {DELETED_NEWS} from "./news-actions";
import {RETRIEVED_EXAM} from "./exams-actions";

export const RETRIEVED_USER_GROUPS = 'RETRIEVED_USER_GROUPS';
export const RETRIEVED_USER_GROUPS_ALLOWED_USERS = 'RETRIEVED_USER_GROUPS_ALLOWED_USERS';
export const RETRIEVED_USER_GROUP = 'RETRIEVED_USER_GROUP';
export const NEW_USER_GROUP = 'NEW_USER_GROUP';
export const DELETED_USER_GROUP = 'DELETED_USER_GROUP';
export const UPDATED_USER_GROUP = 'UPDATED_USER_GROUP';

export const getUserGroupsByPage = (currentPage = 1, pageSize = DEFAULT_PAGE_SIZE, searchTerm = '', ordering = 'id') => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { token } = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token : token,
        page: currentPage,
        page_size : pageSize,
    };

    return getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_USER_GROUPS),
        `${apiBaseUrl}/users/me/devices/all/user-groups`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const getUserGroup = (groupId) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    return getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_USER_GROUP),
        `${apiBaseUrl}/users/me/devices/all/user-groups/${groupId}`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const updateUserGroup = (group) => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { token, currentUser } = loggedUserState;
    let apiBaseUrl          = process.env['API_BASE_URL'];

    let params = {
        token : token,
    };

    // convert relations to pk

    group.members = group.members.map(i => i.id);
    group.device = group.device ? group.device.id : null;
    let groupId = group.id;

    return putRequest(
        createAction(START_LOADING),
        createAction(UPDATED_USER_GROUP),
        `${apiBaseUrl}/users/me/devices/all/user-groups/${groupId}`,
        group,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const createUserGroup = (group) => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { token, currentUser } = loggedUserState;
    let apiBaseUrl          = process.env['API_BASE_URL'];

    let params = {
        token : token,
    };

    // convert relations to pk

    group.members = group.members.map(i => i.id);

    return postRequest(
        createAction(START_LOADING),
        createAction(NEW_USER_GROUP),
        `${apiBaseUrl}/users/me/devices/all/user-groups`,
        group,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const searchAllowedUsers = (searchTerm, pageSize) =>  (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { token }           = loggedUserState;
    let apiBaseUrl          = process.env['API_BASE_URL'];

    let params = {
        token : token,
        page: 1,
        page_size : pageSize,
    };

    if(searchTerm != ''){
        params['search'] = searchTerm;
    }

    getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_USER_GROUPS_ALLOWED_USERS),
        `${apiBaseUrl}/users/created-by/me`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const deleteUserGroup = (group) =>  (dispatch, getState) => {

    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    let groupId = group.id;

    return deleteRequest(
        createAction(START_LOADING),
        createAction(DELETED_USER_GROUP)({groupId}),
        `${apiBaseUrl}/users/me/devices/all/user-groups/${groupId}`,
        {},
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}
