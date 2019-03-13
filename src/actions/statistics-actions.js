import {
    authErrorHandler, createAction, putRequest, postFile, START_LOADING, STOP_LOADING,
    getRequest, authBasicErrorHandler
} from "./base-actions";

export const RETRIEVED_EXERCISE_STATISTIC_DATA = 'RETRIEVED_EXERCISE_STATISTIC_DATA';
export const CLEAR_EXERCISE_STATISTIC_DATA = 'CLEAR_EXERCISE_STATISTIC_DATA';

export const getStatisticsForExercise = (exercise, userId, startDate, endDate) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    dispatch({
        type: CLEAR_EXERCISE_STATISTIC_DATA,
        payload: {}
    });

    return getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_EXERCISE_STATISTIC_DATA),
        `${apiBaseUrl}/exercises/${exercise}/users-statistics/${userId}/${startDate}/${endDate}`,
        authBasicErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const clearStatistics = () => (dispatch) => {
    dispatch({
        type: CLEAR_EXERCISE_STATISTIC_DATA,
        payload: {}
    });
}