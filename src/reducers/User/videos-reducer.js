import{ LOGOUT_USER } from '../../actions/auth-actions';
import {RETRIEVED_VIDEOS_READ_ONLY} from "../../actions/User/videos-actions";

const DEFAULT_STATE = {
    items: [],
    count: 0,
}

const userVideosReducer = (state = DEFAULT_STATE, action) => {
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
        case LOGOUT_USER: {
            return DEFAULT_STATE;
        }
            break;
        default:
            return state;
    }
}

export default userVideosReducer