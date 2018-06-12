import { RETRIEVED_DEVICE, RETRIEVED_AVAILABLE_ADMINS, UPDATED_DEVICE, RETRIEVED_DEVICES } from "../../actions/superAdmin/devices-actions";
import { LOGOUT_USER } from "../../actions/auth-actions";

export const DEFAULT_DEVICE = {
    id: 0,
    serial: '',
    friendly_name: '',
    slots: 0,
    is_active: false,
    owner: null
}

const DEFAULT_STATE = {
    currentEditDevice: DEFAULT_DEVICE,
    availableAdminsList : [],
}

const superAdminEditDevicesReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
      case RETRIEVED_DEVICES:{
          return DEFAULT_STATE;
      }
      case RETRIEVED_DEVICE:{
            return {
                ...state,
                currentEditDevice: action.payload.response,
            };
        }
        case RETRIEVED_AVAILABLE_ADMINS: {
            return {
                ...state,
                availableAdminsList : action.payload.response.results,
            };
        }
        case UPDATED_DEVICE: return {
            ...state,
            currentEditDevice: action.payload.response,
        };
        break
        case LOGOUT_USER: {
            return DEFAULT_STATE;
        }
        default:
            return state;
    }
}

export default superAdminEditDevicesReducer