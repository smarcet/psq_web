import { LOGOUT_USER } from "../../actions/auth-actions";
import {RETRIEVED_MY_DEVICES, RETRIEVED_DEVICE} from "../../actions/Admin/devices-actions";

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
        case LOGOUT_USER: {
            return DEFAULT_STATE;
        }
        default:
            return state;
    }
}

export default adminEditDevicesReducer;