import{ LOGOUT_USER } from '../../actions/auth-actions';
import {DELETED_NEWS, RETRIEVED_NEWS } from "../../actions/Admin/news-actions";

const DEFAULT_STATE = {
    items: [],
    count: 0,
}

const adminNewsReducer = (state = {...DEFAULT_STATE}, action) => {
    const { type, payload } = action;
    switch (type) {
        case RETRIEVED_NEWS: {
            return {
                ...state,
                items: action.payload.response.results,
                count: action.payload.response.count,
            };
        }
            break;
        case DELETED_NEWS: {
            let {newsId} = payload;
            return {
                ...state,
                count: state.count - 1,
                items: state.items.filter(item => item.id !== newsId),
            };
        }
            break;
        case LOGOUT_USER: {
            return {...DEFAULT_STATE};
        }
            break;
        default:
            return state;
    }
}

export default adminNewsReducer;