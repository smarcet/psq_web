import {createAction, postRequest} from "./base-actions";
import {authErrorHandler, START_LOADING, STOP_LOADING} from "./base-actions";

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