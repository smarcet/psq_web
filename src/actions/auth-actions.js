import T from "i18n-react/dist/i18n-react";
import {createAction, getRequest, startLoading, stopLoading} from "./base-actions";
import swal from "sweetalert2";
import {authErrorHandler, apiBaseUrl} from "./base-actions";

export const SET_LOGGED_USER                = 'SET_LOGGED_USER';
export const LOGOUT_USER                    = 'LOGOUT_USER';
export const REQUEST_USER_INFO              = 'REQUEST_USER_INFO';
export const RECEIVE_USER_INFO              = 'RECEIVE_USER_INFO';

export const doLogin = (username, password ) => (dispatch) => {

    console.log(`username ${username} - password ${password}`);

    if(username == 'superadmin' && password == '1qaz2wsx'){
        dispatch({
            type: SET_LOGGED_USER,
            payload: {accessToken : '123456', member : { first_name: "Jose" , last_name: "Perez", role: "superadmin"}}
        });
        return;
    }

    if(username == 'admin' && password == '1qaz2wsx'){
        dispatch({
            type: SET_LOGGED_USER,
            payload: {accessToken : '123456', member : { first_name: "Jose" , last_name: "Perez", role: "admin"}}
        });
        return;
    }

    if(username == 'user' && password == '1qaz2wsx'){
        dispatch({
            type: SET_LOGGED_USER,
            payload: { accessToken : '123456', member : { first_name: "Jose" , last_name: "Perez", role: "user"}}
        });
        return;
    }

    swal("ERROR", "User does not exists!" , "error");
    dispatch({
        type: LOGOUT_USER,
        payload: {}
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

export const getUserInfo = (history, backUrl) => (dispatch, getState) => {

    let { loggedUserState }     = getState();
    let { accessToken, member } = loggedUserState;
    if(member != null){
        console.log(`redirecting to ${backUrl}`)
        history.push(backUrl);
    }

    dispatch(startLoading());

    return getRequest(
        createAction(REQUEST_USER_INFO),
        createAction(RECEIVE_USER_INFO),
        `${apiBaseUrl}/api/v1/members/me?expand=groups&access_token=${accessToken}`,
        authErrorHandler
    )({})(dispatch, getState).then(() => {
            dispatch(stopLoading());

            let { member } = getState().loggedUserState;
            if( member == null || member == undefined){
                swal("ERROR", T.translate("errors.user_not_set"), "error");
                dispatch({
                    type: LOGOUT_USER,
                    payload: {}
                });
            }

            let allowedGroups = member.groups.filter((group, idx) => {
                return group.code === AdminGroupCode || group.code == SummitAdminGroupCode;
            })

            if(allowedGroups.length == 0){
                swal("ERROR", T.translate("errors.user_not_authz") , "error");
                dispatch({
                    type: LOGOUT_USER,
                    payload: {}
                });
            }
            console.log(`redirecting to ${backUrl}`)
            history.push(backUrl);
        }
    );
}