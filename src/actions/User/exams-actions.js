import {createAction, getRequest} from "../base-actions";
import {authErrorHandler, START_LOADING, STOP_LOADING} from "../base-actions";
import {DEFAULT_PAGE_SIZE} from "../../constants";

export const RETRIEVED_MY_EXAMS_READ_ONLY = 'RETRIEVED_EXAMS_READ_ONLY';

export const getMyExamsByPage = (currentPage = 1, pageSize = DEFAULT_PAGE_SIZE, searchTerm = '', ordering = 'id') =>
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
            createAction(RETRIEVED_MY_EXAMS_READ_ONLY),
            `${apiBaseUrl}/exams`,
            authErrorHandler,
        )(params)(dispatch).then((payload) => {
            dispatch({
                type: STOP_LOADING,
                payload: {}
            });
        });
    }
