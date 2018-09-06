import {RETRIEVED_DEVICES, DELETED_DEVICE, DEVICE_VERIFIED} from '../../actions/superAdmin/devices-actions';
import{ LOGOUT_USER } from '../../actions/auth-actions';

const DEFAULT_STATE = {
    items: [],
    count: 0,
}

const superAdminDevicesReducer = (state = {...DEFAULT_STATE}, action) => {
    const { type, payload } = action;
    switch (type) {
        case RETRIEVED_DEVICES: {
            return {
                ...state,
                items: action.payload.response.results,
                count: action.payload.response.count,
            };
        }
        break;
        case DEVICE_VERIFIED:{
            let { deviceId, friendlyName } = payload;
            return {
                ...state,
                items : state.items.map(item => {
                    if(item.id == deviceId)
                        return {...item, friendly_name:friendlyName, is_verified: true}
                    return item;
                }),
            };
        }
        break;
        case DELETED_DEVICE:{
            let { deviceId } = payload;
            return {
                ...state,
                count : state.count - 1,
                items : state.items.filter(item => item.id !== deviceId),
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

export default superAdminDevicesReducer