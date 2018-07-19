import { RETRIEVED_DEVICES, DELETED_DEVICE } from '../../actions/superAdmin/devices-actions';
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