import {createAction, getRequest, deleteRequest, putRequest, postRequest} from "../base-actions";
import {authErrorHandler, START_LOADING, STOP_LOADING} from "../base-actions";
import {DEFAULT_PAGE_SIZE, TEACHER} from "../../constants";

export const RETRIEVED_USERS = 'RETRIEVED_USERS';
export const NEW_USER = 'NEW_USER';
export const UPDATED_USER = 'UPDATED_USER';
export const DELETED_USER = 'DELETED_USER';

export const getMyUsersByPage = (currentPage = 1, pageSize = DEFAULT_PAGE_SIZE, searchTerm = '', ordering = '') => (dispatch, getState) => {
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
        createAction(RETRIEVED_USERS),
        `${apiBaseUrl}/users/created-by/me`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const createNewUser = (newUser) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    let endpoint = newUser.role == TEACHER ?`${apiBaseUrl}/admin-users` : `${apiBaseUrl}/raw-users`;

    return postRequest(
        createAction(START_LOADING),
        createAction(NEW_USER),
        endpoint,
        newUser,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const deleteUser = (userId, role) =>  (dispatch, getState) => {

    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };
    let endpoint = role == 1 ?  `${apiBaseUrl}/raw-users/${userId}` :  `${apiBaseUrl}/admin-users/${userId}`;
    return deleteRequest(
        createAction(START_LOADING),
        createAction(DELETED_USER)({userId:userId}),
        endpoint,
        {},
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}