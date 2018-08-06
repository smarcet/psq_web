import {createAction, getRequest, deleteRequest, putRequest, postRequest} from "./base-actions";
import {authErrorHandler, START_LOADING, STOP_LOADING} from "./base-actions";
import {DEFAULT_PAGE_SIZE} from "../constants";

export const RETRIEVED_VIDEOS_READ_ONLY = 'RETRIEVED_VIDEOS_READ_ONLY';
export const SHARED_VIDEO = 'SHARED_VIDEO';
export const ADD_VIDEO_VIEW = 'ADD_VIDEO_VIEW';

export const getVideosByPage = (currentPage = 1, pageSize = DEFAULT_PAGE_SIZE, searchTerm = '', ordering = 'id') =>
    (dispatch, getState) => {
        let {loggedUserState} = getState();
        let {token} = loggedUserState;
        let apiBaseUrl = process.env['API_BASE_URL'];

        let params = {
            token: token,
            page: currentPage,
            page_size: pageSize,
        };

        if (searchTerm != '') {
            params['search'] = searchTerm;
        }

        return getRequest(
            createAction(START_LOADING),
            createAction(RETRIEVED_VIDEOS_READ_ONLY),
            `${apiBaseUrl}/videos`,
            authErrorHandler,
        )(params)(dispatch).then((payload) => {
            dispatch({
                type: STOP_LOADING,
                payload: {}
            });
        });
    }

export const shareVideo = (video, user) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    return putRequest(
        createAction(START_LOADING),
        createAction(SHARED_VIDEO),
        `${apiBaseUrl}/videos/${video.id}/users/${user.id}/share`,
        {},
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });

}

export const addVideoView = (videoId) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    return putRequest(
        createAction(START_LOADING),
        createAction(ADD_VIDEO_VIEW)({videoId}),
        `${apiBaseUrl}/videos/${videoId}/play`,
        {},
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });

}