import {
    authErrorHandler, createAction, putRequest, postFile, START_LOADING, STOP_LOADING,
    getRequest
} from "./base-actions";

export const RETRIEVED_EXERCISE_STATISTIC_DATA = 'RETRIEVED_EXERCISE_STATISTIC_DATA';

export const getStatisticsForExercise = (exercise, startDate, endDate) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    return getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_EXERCISE_STATISTIC_DATA),
        `${apiBaseUrl}/exercises/${exercise}/statistics/${startDate}/${endDate}`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}