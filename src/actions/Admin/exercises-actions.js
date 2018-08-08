import {createAction, getRequest, deleteRequest, putRequest, postRequest} from "../base-actions";
import {authErrorHandler, START_LOADING, STOP_LOADING} from "../base-actions";
import {DEFAULT_PAGE_SIZE} from "../../constants";

export const RETRIEVED_MY_EXERCISES = 'RETRIEVED_MY_EXERCISES';
export const RETRIEVED_MY_EXERCISE = 'RETRIEVED_MY_EXERCISE';
export const RETRIEVED_MY_AVAILABLE_DEVICES = 'RETRIEVED_MY_AVAILABLE_DEVICES';
export const ADDED_NEW_EXERCISE = 'ADDED_NEW_EXERCISE';
export const UPDATED_EXERCISE = 'UPDATED_EXERCISE';
export const DELETED_EXERCISE = 'DELETED_EXERCISE';
export const RETRIEVED_MY_AVAILABLE_TUTORIALS = 'RETRIEVED_MY_AVAILABLE_TUTORIALS';
export const SHARED_EXERCISE = 'SHARED_EXERCISE';

export const getMyExercisesByPage = (currentPage = 1, pageSize = DEFAULT_PAGE_SIZE, searchTerm = '', ordering = 'id') =>
    (dispatch, getState) => {
        let {loggedUserState} = getState();
        let {token} = loggedUserState;
        let apiBaseUrl = process.env['API_BASE_URL'];

        let params = {
            token: token,
            page: currentPage,
            page_size: pageSize,
        };

        if(searchTerm != ''){
            params['search'] = searchTerm;
        }

        getRequest(
            createAction(START_LOADING),
            createAction(RETRIEVED_MY_EXERCISES),
            `${apiBaseUrl}/admin-users/me/exercises`,
            authErrorHandler,
        )(params)(dispatch).then((payload) => {
            dispatch({
                type: STOP_LOADING,
                payload: {}
            });
        });
    }

export const getMyAvailableDevices = () => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
        page: 1,
        page_size : 9999999999,
    };

    return getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_MY_AVAILABLE_DEVICES),
        `${apiBaseUrl}/admin-users/me/devices`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const getMyAvailableTutorials = () => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
        page: 1,
        page_size : 9999999999,
    };

    getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_MY_AVAILABLE_TUTORIALS),
        `${apiBaseUrl}/tutorials`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const getMyExerciseById = (exerciseId) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    return getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_MY_EXERCISE),
        `${apiBaseUrl}/exercises/${exerciseId}`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const addNewExercise = (newExercise) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token, currentUser} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    newExercise.author = currentUser.id;
    // convert relations to pk

    newExercise.allowed_devices = newExercise.allowed_devices.map(i => i.id);
    newExercise.allowed_tutorials = newExercise.allowed_tutorials.map(i => i.id);

    return postRequest(
        createAction(START_LOADING),
        createAction(ADDED_NEW_EXERCISE)(newExercise),
        `${apiBaseUrl}/exercises`,
        newExercise,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const updateExercise = (exercise) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    exercise.author = exercise.author.id;
    let exerciseId = exercise.id;

    // convert relations to pk

    exercise.allowed_devices = exercise.allowed_devices.map(i => i.id);
    exercise.allowed_tutorials = exercise.allowed_tutorials.map(i => i.id);

    return putRequest(
        createAction(START_LOADING),
        createAction(UPDATED_EXERCISE)(exercise),
        `${apiBaseUrl}/exercises/${exerciseId}`,
        exercise,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const deleteExercise = (exercise) =>  (dispatch, getState) => {

    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];


    let params = {
        token: token,
    };

    let exerciseId = exercise.id;

    return deleteRequest(
        createAction(START_LOADING),
        createAction(DELETED_EXERCISE)({exerciseId}),
        `${apiBaseUrl}/exercises/${exerciseId}`,
        {},
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const shareExercise = (exercise, device) => (dispatch, getState) => {

    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];


    let params = {
        token: token,
    };

    let exerciseId = exercise.id;
    let deviceId = device.id;

    return putRequest(
        createAction(START_LOADING),
        createAction(SHARED_EXERCISE)({exerciseId}),
        `${apiBaseUrl}/exercises/${exerciseId}/devices/${deviceId}`,
        {},
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}
