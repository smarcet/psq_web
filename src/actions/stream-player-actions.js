import {createAction, getRequest, stopLoading} from "./base-actions";
import {authErrorHandler, START_LOADING, STOP_LOADING} from "./base-actions";
import swal from "sweetalert2";
import T from "i18n-react/dist/i18n-react";

export const STREAM_VALIDATED = 'STREAM_VALIDATED';
export const SET_STREAM_DATA = 'SET_STREAM_DATA';
export const INVALID_STREAM_LINK = 'INVALID_STREAM_LINK';

export const customErrorHandler = (err, res) => (dispatch) => {
    let code = err.status;
    dispatch(stopLoading());

    let msg = '';

    switch (code) {
        case 403:
            swal("ERROR",
                T.translate("Not Authorized user"),
                "warning");
            break;
        case 400:
            swal("ERROR",
                T.translate("Invalid User"),
                "warning");
            break;
        case 401:
            swal("ERROR",
                T.translate("Not Authenticated User"),
                "error");
            dispatch({
                type: LOGOUT_USER,
                payload: {
                    persistStore: true
                }
            });
            break;
        case 404:
            msg = err.message;
            swal(
                T.translate("Not Found"),
                msg, "warning");
            break;
        case 412:
            for (var [key, value] of Object.entries(err.response.body)) {
                msg += '- ' + value + '<br>';
            }
            swal(
                T.translate("Validation error"),
                msg, "warning");
            dispatch({
                type: INVALID_STREAM_LINK,
                payload: {errors: err.response.body}
            });
            break;
        default:
            swal("ERROR",
                T.translate("Server Error"),
                "error");
    }
}

export const validateStream = (
    device_id,
    exercise_id,
    user_id,
    exercise_max_duration,
    signature,
    expires
) =>  (dispatch, getState) => {
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        device_id,
        exercise_id,
        user_id,
        exercise_max_duration,
        signature,
        expires
    };

    dispatch(createAction(SET_STREAM_DATA)(params));

    return getRequest(
        createAction(START_LOADING),
        createAction(STREAM_VALIDATED),
        `${apiBaseUrl}/streaming/validate`,
        customErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
        return payload
    });
}