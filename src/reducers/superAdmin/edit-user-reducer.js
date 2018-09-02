import { LOGOUT_USER } from "../../actions/auth-actions";
import {NEW_USER, RETRIEVED_USER, RETRIEVED_USERS} from "../../actions/users-actions";


const DEFAULT_USER = {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    role: 0,
    bio:'',
    title: '',
    organization:'',
    enrollment: '',
    country: '',
    state: '',
    hand: 2
}

const DEFAULT_STATE = {
    currentEditUser: {...DEFAULT_USER},
    currentDevices : [],
    ownedDevices: [],
}

const superAdminEditUserReducer = (state = {...DEFAULT_STATE}, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOGOUT_USER: {
            return {...DEFAULT_STATE};
        }
        case RETRIEVED_USER: {
            return {...state, currentEditUser: payload.response }
        }
        case RETRIEVED_USERS:{
            return {...DEFAULT_STATE};
        }
        case NEW_USER:{
            return {...DEFAULT_STATE};
        }
        default:
            return state;
    }
}

export default superAdminEditUserReducer