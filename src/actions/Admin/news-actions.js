import {createAction, getRequest, postRequest, putRequest, deleteRequest} from "../base-actions";
import {authErrorHandler, START_LOADING, STOP_LOADING} from "../base-actions";
import {DEFAULT_PAGE_SIZE} from "../../constants";

export const RETRIEVED_NEWS = 'RETRIEVED_NEWS';
export const RETRIEVED_NEW = 'RETRIEVED_NEW';
export const ADDED_NEWS = 'ADDED_NEWS';
export const DELETED_NEWS = 'DELETED_NEWS';
export const UPDATED_NEWS = 'UPDATED_NEWS';

export const getNewsByPage = (currentPage = 1, pageSize = DEFAULT_PAGE_SIZE, searchTerm = '', ordering = '') => (dispatch, getState) => {
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
        createAction(RETRIEVED_NEWS),
        `${apiBaseUrl}/news`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const getNewById = (newsId) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    return getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_NEW),
        `${apiBaseUrl}/news/${newsId}`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const addNews = (news) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token, currentUser} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    news.created_by = currentUser.id;

    return postRequest(
        createAction(START_LOADING),
        createAction(ADDED_NEWS)(news),
        `${apiBaseUrl}/news`,
        news,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const updateNews = (news) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    let newsId = news.id;

    return putRequest(
        createAction(START_LOADING),
        createAction(UPDATED_NEWS)(news),
        `${apiBaseUrl}/news/${newsId}`,
        news,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const deleteNews = (news) =>  (dispatch, getState) => {

    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    let newsId = news.id;

    return deleteRequest(
        createAction(START_LOADING),
        createAction(DELETED_NEWS)({newsId}),
        `${apiBaseUrl}/news/${newsId}`,
        {},
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}
