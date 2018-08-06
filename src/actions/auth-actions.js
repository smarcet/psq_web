import {createAction, getRequest, postRequest} from "./base-actions";
import {authErrorHandler} from "./base-actions";
import {getBackURL} from "../utils/methods";

export const SET_LOGGED_USER   = 'SET_LOGGED_USER';
export const LOGOUT_USER       = 'LOGOUT_USER';
export const REQUEST_USER_INFO = 'REQUEST_USER_INFO';
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';
export const REQUEST_AUTH      = 'REQUEST_AUTH';
export const RECEIVE_AUTH      = 'RECEIVE_AUTH';

export const doLogin = (history, username, password ) => (dispatch) => {

    let apiBaseUrl = process.env['API_BASE_URL'];

    postRequest(
        createAction(REQUEST_AUTH),
        createAction(RECEIVE_AUTH),
        `${apiBaseUrl}/token`,
        {
            "email": username,
            "password": password
        },
        authErrorHandler,
    )({})(dispatch).then((payload) => {
        let { response } = payload;
        let backUrl = getBackURL();
        return getRequest
        (
            createAction(REQUEST_USER_INFO),
            createAction(RECEIVE_USER_INFO),
            `${apiBaseUrl}/users/me?token=${response.token}`,
            authErrorHandler
        )({})(dispatch).then(payload => {
            console.log(`going to ${backUrl}`);
            if(backUrl != '' && backUrl != null)
                history.push(backUrl);
        });
    });

}

export const onUserAuth = (accessToken, idToken) => (dispatch) => {
    dispatch({
        type: SET_LOGGED_USER,
        payload: {accessToken, idToken}
    });
}

export const doLogout = () => (dispatch) => {
    dispatch({
        type: LOGOUT_USER,
        payload: {}
    });
}

export const doActivateUser = (formData) => (dispatch) => {
    let apiBaseUrl = process.env['API_BASE_URL'];
    return postRequest(
        null,
        null,
        `${apiBaseUrl}/users/activate/${formData.token}`,
        {
            "password": formData.password
        },
        authErrorHandler,
    )({})(dispatch).then((payload) => {

    });
}