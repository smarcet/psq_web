import {createAction, getRequest, deleteRequest, putRequest, postRequest} from "../base-actions";
import {authErrorHandler, START_LOADING, STOP_LOADING} from "../base-actions";
import {DEFAULT_PAGE_SIZE} from "../../constants";

export const RETRIEVED_EXERCISES_READ_ONLY = 'RETRIEVED_EXERCISES_READ_ONLY';

export const getExercisesByPage = (currentPage = 1, pageSize = DEFAULT_PAGE_SIZE, searchTerm = '', ordering = 'id') =>
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
            createAction(RETRIEVED_EXERCISES_READ_ONLY),
            `${apiBaseUrl}/exercises`,
            authErrorHandler,
        )(params)(dispatch).then((payload) => {
            dispatch({
                type: STOP_LOADING,
                payload: {}
            });
        });
    }