import { LOGOUT_USER } from "../../actions/auth-actions";
import { RETRIEVED_USER_GROUPS, RETRIEVED_USER_GROUP, NEW_USER_GROUP ,
    DELETED_USER_GROUP , UPDATED_USER_GROUP, RETRIEVED_USER_GROUPS_ALLOWED_USERS} from "../../actions/Admin/user-groups-actions";
import {RETRIEVED_MY_DEVICES} from "../../actions/Admin/devices-actions";

export const DEFAULT_GROUP = {
    id: 0,
    name: '',
    device: null,
    members: []
}

const DEFAULT_STATE = {
    currentEditGroup: {...DEFAULT_GROUP},
    matchedUsers: [],
    allowedDevices: [],
}

const adminEditUserGroupReducer = (state = {...DEFAULT_STATE}, action) => {
    const {type, payload} = action;
    switch (type) {
        case RETRIEVED_USER_GROUP: {
            return {
                ...state,
                currentEditGroup: action.payload.response,
            };
        }
            break
        case RETRIEVED_USER_GROUPS_ALLOWED_USERS:{
            return {
                ...state,
                matchedUsers: action.payload.response.results,
            };
        }
        case RETRIEVED_MY_DEVICES:{
            return {
                ...state,
                allowedDevices: action.payload.response.results,
            };
        }
        case RETRIEVED_USER_GROUPS: {
            return {...DEFAULT_STATE};
        }
            break;
        case NEW_USER_GROUP: {
            return {...DEFAULT_STATE};
        }
            break;
        case DELETED_USER_GROUP: {
            return {...DEFAULT_STATE};
        }
            break;
        case UPDATED_USER_GROUP: {
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

export default adminEditUserGroupReducer