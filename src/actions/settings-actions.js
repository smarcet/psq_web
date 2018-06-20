import {authErrorHandler, createAction, putRequest, postFile, START_LOADING, STOP_LOADING} from "./base-actions";
export const UPDATED_MY_USER_INFO = 'UPDATED_MY_USER_INFO';
export const UPDATED_MY_USER_INFO_PIC = 'UPDATED_MY_USER_INFO_PIC';
export const updateMyUserInfo = (user) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    return putRequest(
        createAction(START_LOADING),
        createAction(UPDATED_MY_USER_INFO)(user),
        `${apiBaseUrl}/users/me`,
        user,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const updateMyUserPic = (file) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    return postFile(
        'pic',
        createAction(START_LOADING),
        null,
        `${apiBaseUrl}/users/me/pic`,
        file,
        {},
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch(createAction(UPDATED_MY_USER_INFO_PIC)(payload));
    });
}