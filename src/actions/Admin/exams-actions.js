import {createAction, getRequest, deleteRequest, putRequest } from "../base-actions";
import {authErrorHandler, START_LOADING, STOP_LOADING} from "../base-actions";
import {DEFAULT_PAGE_SIZE} from "../../constants";
export const RETRIEVED_EXAMS = 'RETRIEVED_EXAMS';
export const RETRIEVED_EXAM = 'RETRIEVED_EXAM';
export const UPDATED_EXAM = 'UPDATED_EXAM';

export const geExamsByPage = (currentPage = 1, pageSize = DEFAULT_PAGE_SIZE, searchTerm = '', ordering = 'id') => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { token, currentUser }           = loggedUserState;
    let apiBaseUrl          = process.env['API_BASE_URL'];

    let params = {
        token : token,
        page: currentPage,
        page_size : pageSize,
    };

    getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_EXAMS),
        `${apiBaseUrl}/exams`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}


export const getExamById = (examId) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    return getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_EXAM),
        `${apiBaseUrl}/exams/${examId}`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}


export const approveExam = (exam) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token, currentUser} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    let examId = exam.id;

    let payload = {
        evaluator: currentUser.id,
        notes : exam.notes,
        approved: true,
    };

    return putRequest(
        createAction(START_LOADING),
        createAction(UPDATED_EXAM),
        `${apiBaseUrl}/exams/${examId}`,
        payload,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

export const rejectExam = (exam) => (dispatch, getState) => {
    let {loggedUserState} = getState();
    let {token, currentUser} = loggedUserState;
    let apiBaseUrl = process.env['API_BASE_URL'];

    let params = {
        token: token,
    };

    let examId = exam.id;

    let payload = {
        evaluator: currentUser.id,
        notes : exam.notes,
        approved: false,
    };

    return putRequest(
        createAction(START_LOADING),
        createAction(UPDATED_EXAM),
        `${apiBaseUrl}/exams/${examId}`,
        payload,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}