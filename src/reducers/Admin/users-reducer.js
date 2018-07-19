import{ LOGOUT_USER } from '../../actions/auth-actions';
import {RETRIEVED_MY_USERS} from "../../actions/Admin/users-actions";
import {DELETED_USER} from "../../actions/users-actions";

const DEFAULT_STATE = {
    items: [],
    count: 0,
}

const adminUsersReducer = (state = {...DEFAULT_STATE}, action) => {
    const { type, payload } = action;
    switch (type) {
        case RETRIEVED_MY_USERS: {
            return {
                ...state,
                items: action.payload.response.results,
                count: action.payload.response.count,
            };
        }
            break;
        case DELETED_USER: {
            let {userId} = payload;
            return {
                ...state,
                count: state.count - 1,
                items: state.items.filter(item => item.id !== userId),
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

export default adminUsersReducer;