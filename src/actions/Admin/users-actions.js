import {createAction, getRequest} from "../base-actions";
import {authErrorHandler, START_LOADING, STOP_LOADING} from "../base-actions";
import {DEFAULT_PAGE_SIZE} from "../../constants";

export const RETRIEVED_MY_USERS = 'RETRIEVED_MY_USERS';

export const getMyUsersByPage = (currentPage = 1, pageSize = DEFAULT_PAGE_SIZE, searchTerm = '', ordering = '') => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { token }           = loggedUserState;
    let apiBaseUrl          = process.env['API_BASE_URL'];

    if(ordering == ''){
        ordering = 'id';
    }

    let params = {
        token : token,
        page: currentPage,
        page_size : pageSize,
        ordering  : ordering
    };

    if(searchTerm != ''){
        params['search'] = searchTerm;
    }


    getRequest(
        createAction(START_LOADING),
        createAction(RETRIEVED_MY_USERS),
        `${apiBaseUrl}/users/created-by/me`,
        authErrorHandler,
    )(params)(dispatch).then((payload) => {
        dispatch({
            type: STOP_LOADING,
            payload: {}
        });
    });
}

