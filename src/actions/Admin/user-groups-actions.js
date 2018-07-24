import {createAction, getRequest, deleteRequest, putRequest, postRequest} from "../base-actions";
import {authErrorHandler, START_LOADING, STOP_LOADING} from "../base-actions";
import {DEFAULT_PAGE_SIZE} from "../../constants";

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

}

export const updateUserGroup = (group) => (dispatch, getState) => {

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

export const searchAllowedUsers = (device) =>  (dispatch, getState) => {

}