import{ LOGOUT_USER } from '../../actions/auth-actions';
import {RETRIEVED_DASHBOARD_REPORT} from "../../actions/superAdmin/dashboard-actions";

const DEFAULT_STATE = {
    users_per_month:[],
    devices_per_month:[],
    super_admin_user_qty:0,
    admin_user_qty:0,
    raw_user_qty:0,
    devices_qty: 0,
}

const superAdminDashboardReducer = (state = {...DEFAULT_STATE}, action) => {
    const { type, payload } = action;
    switch (type) {
        case RETRIEVED_DASHBOARD_REPORT: {
            return {
                ...state,
                ...payload.response,
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

export default superAdminDashboardReducer