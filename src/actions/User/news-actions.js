import {createAction, getRequest} from "../base-actions";
import {authErrorHandler, START_LOADING, STOP_LOADING} from "../base-actions";

export const RETRIEVED_NEWS_READ_ONLY = 'RETRIEVED_NEWS_READ_ONLY';

export const getTopNews = (top) =>
    (dispatch, getState) => {
        let {loggedUserState} = getState();
        let {token} = loggedUserState;
        let apiBaseUrl = process.env['API_BASE_URL'];

        let params = {
            token: token,
            page: 1,
            page_size: top,
            ordering: "-created"
        };


        getRequest(
            createAction(START_LOADING),
            createAction(RETRIEVED_NEWS_READ_ONLY),
            `${apiBaseUrl}/news`,
            authErrorHandler,
        )(params)(dispatch).then((payload) => {
            dispatch({
                type: STOP_LOADING,
                payload: {}
            });
        });
    }
