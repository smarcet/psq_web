import { LOGOUT_USER } from "../../actions/auth-actions";
import {
    RETRIEVED_MY_DEVICES,
    RETRIEVED_DEVICE,
    RETRIEVED_RAW_AND_ADMIN_USERS,
    LINKED_USER_2_DEVICE,
    UNLINKED_USER_2_DEVICE,
    RETRIEVED_ADMIN_USERS,
    LINKED_ADMIN_USER_2_DEVICE,
    UNLINKED_ADMIN_USER_2_DEVICE,
    CLEAN_ADMIN_USERS
} from "../../actions/Admin/devices-actions";

export const DEFAULT_DEVICE = {
    id: 0,
    serial: '',
    friendly_name: '',
    slots: 0,
    is_active: false,
    owner: null,
    admins: [],
    users: []
}

const DEFAULT_STATE = {
    currentEditDevice: DEFAULT_DEVICE,
    availableAdminsList : [],
    matchedDeviceUsers: [],
    matchedDeviceAdminUsers: [],
}

const adminEditDevicesReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case RETRIEVED_MY_DEVICES:{
            return DEFAULT_STATE;
        }
        case RETRIEVED_DEVICE:{
            return {
                ...state,
                currentEditDevice: action.payload.response,
            };
        }
        case RETRIEVED_RAW_AND_ADMIN_USERS:{
            return {
                ...state,
                matchedDeviceUsers: action.payload.response.results,
            };
        }
        case RETRIEVED_ADMIN_USERS:{
            return {
                ...state,
                matchedDeviceAdminUsers: action.payload.response.results,
            };
        }
        case CLEAN_ADMIN_USERS : {
            return {
                ...state,
                matchedDeviceAdminUsers: [],
            };
        }
        case LINKED_USER_2_DEVICE:{
            return {
                ...state,
                currentEditDevice: {...state.currentEditDevice,
                   users: [...state.currentEditDevice.users, payload]
                },
                matchedDeviceUsers: []
            };
        }
        case UNLINKED_USER_2_DEVICE:{
            let users = state.currentEditDevice.users.filter(item => item.id !== payload.id);
            return {
                ...state,
                currentEditDevice: {...state.currentEditDevice,
                    users: users
                },
                matchedDeviceUsers: []
            };
        }
        case LINKED_ADMIN_USER_2_DEVICE:{
            return {
                ...state,
                currentEditDevice: {...state.currentEditDevice,
                    admins: [...state.currentEditDevice.admins, payload]
                },
                matchedDeviceAdminUsers: []
            };
        }
        case UNLINKED_ADMIN_USER_2_DEVICE:{
            let admins = state.currentEditDevice.admins.filter(item => item.id !== payload.id);
            return {
                ...state,
                currentEditDevice: {...state.currentEditDevice,
                    admins: admins
                },
                matchedDeviceAdminUsers: []
            };
        }
        case LOGOUT_USER: {
            return DEFAULT_STATE;
        }
        default:
            return state;
    }
}

export default adminEditDevicesReducer;