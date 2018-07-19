import {authErrorHandler, createAction, getRequest, START_LOADING, STOP_LOADING} from "../base-actions";

export const RETRIEVED_DASHBOARD_REPORT = 'RETRIEVED_DASHBOARD_REPORT';

export const getSuperAdminDashBoardReport = () => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    return getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_DASHBOARD_REPORT),
        `${apiBaseUrl}/super-admins/dashboard-report`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}