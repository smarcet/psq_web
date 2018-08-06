import{ LOGOUT_USER } from '../../actions/auth-actions';
import {RETRIEVED_VIDEOS_READ_ONLY} from "../../actions/videos-actions";
import {RETRIEVED_USERS_SHARE_SEARCH} from "../../actions/users-actions";

const DEFAULT_STATE = {
    items: [],
    count: 0,
    matchedUsers: [],
}

const adminVideosReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case RETRIEVED_VIDEOS_READ_ONLY: {
            return {
                ...state,
                items: action.payload.response.results,
                count: action.payload.response.count,
            };
        }
            break;
        case RETRIEVED_USERS_SHARE_SEARCH:{
            return {
                ...state,
                matchedUsers: action.payload.response.results,
            };
        }
        case LOGOUT_USER: {
            return DEFAULT_STATE;
        }
            break;
        default:
            return state;
    }
}

export default adminVideosReducer