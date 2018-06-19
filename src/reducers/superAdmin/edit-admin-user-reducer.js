import { LOGOUT_USER } from "../../actions/auth-actions";
import {
    RETRIEVED_ADMIN_USER, RETRIEVED_ADMIN_USERS,
    RETRIEVED_AVAILABLE_DEVICES, UPDATED_ADMIN_USER,
    RETRIEVED_OWNED_DEVICES,
    UNLINKED_DEVICE,
    LINK_DEVICE
} from "../../actions/superAdmin/admin-users-actions";

export const DEFAULT_ADMIN_USER = {
    id: 0,
    email: '',
    bio: '',
    first_name: '',
    last_name: '',
    role: 0,
    pic: null,
    is_active: false,
}

const DEFAULT_STATE = {
    currentEditAdminUser: DEFAULT_ADMIN_USER,
    currentDevices : [],
    ownedDevices: [],
}

const superAdminEditAdminUserReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case RETRIEVED_ADMIN_USERS:{
            return DEFAULT_STATE;
        }
        case RETRIEVED_ADMIN_USER:{
            return {
                ...state,
                currentEditAdminUser: action.payload.response,
            };
        }
        case RETRIEVED_AVAILABLE_DEVICES: {
            return {
                ...state,
                currentDevices : action.payload.response.results,
            };
        }
        case RETRIEVED_OWNED_DEVICES: {
            return {
                ...state,
                ownedDevices : action.payload.response.results,
            };
        }
        case LINK_DEVICE:{
                let device = payload;
                return {
                    ...state,
                    ownedDevices : [...state.ownedDevices, device],
                };
        }
        case UNLINKED_DEVICE:{
            let { deviceId } = payload;
            return {
                ...state,
                ownedDevices : state.ownedDevices.filter(item => item.id !== deviceId),
            };
        }
        case UPDATED_ADMIN_USER: return {
            ...state,
            currentEditAdminUser: action.payload.response,
        };
            break
        case LOGOUT_USER: {
            return DEFAULT_STATE;
        }
        default:
            return state;
    }
}

export default superAdminEditAdminUserReducer