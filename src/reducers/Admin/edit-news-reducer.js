import {LOGOUT_USER} from "../../actions/auth-actions";
import {
    RETRIEVED_NEW, RETRIEVED_NEWS, DELETED_NEWS, UPDATED_NEWS,
    ADDED_NEWS
} from "../../actions/Admin/news-actions";

export const DEFAULT_NEWS = {
    id: 0,
    title: '',
    body: '',
    created_by: null,
    created: null
}

const DEFAULT_STATE = {
    currentEditNews: {...DEFAULT_NEWS},
}

const adminEditNewsReducer = (state = {...DEFAULT_STATE}, action) => {
    const {type, payload} = action;
    switch (type) {
        case RETRIEVED_NEW: {
            return {
                ...state,
                currentEditNews: action.payload.response,
            };
        }
            break
        case RETRIEVED_NEWS: {
            return {...DEFAULT_STATE};
        }
            break;
        case ADDED_NEWS: {
            return {...DEFAULT_STATE};
        }
            break;
        case DELETED_NEWS: {
            return {...DEFAULT_STATE};
        }
            break;
        case UPDATED_NEWS: {
            return {...DEFAULT_STATE};
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

export default adminEditNewsReducer