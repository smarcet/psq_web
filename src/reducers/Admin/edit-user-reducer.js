import {LOGOUT_USER} from "../../actions/auth-actions";
import {
    NEW_USER, DELETED_USER, RETRIEVED_USER, RETRIEVED_USERS,
    UPDATED_USER
} from "../../actions/users-actions";

export const DEFAULT_USER = {
    id: 0,
    email: '',
    bio: '',
    first_name: '',
    last_name: '',
    role: 0,
    pic: null,
    is_active: false,
    title: '',
    organization:'',
    enrollment: '',
    country: '',
    state: '',
    hand: 2,
}

const DEFAULT_STATE = {
    currentEditUser: {...DEFAULT_USER},
}

const adminEditUserReducer = (state = {...DEFAULT_STATE}, action) => {
    const {type, payload} = action;
    switch (type) {
        case RETRIEVED_USER: {
            return {
                ...state,
                currentEditUser: action.payload.response,
            };
        }
        break
        case RETRIEVED_USERS: {
            return {...DEFAULT_STATE};
        }
        break;
        case NEW_USER: {
            return {...DEFAULT_STATE};
        }
            break;
        case DELETED_USER: {
            return {...DEFAULT_STATE};
        }
            break;
        case UPDATED_USER: {
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

export default adminEditUserReducer