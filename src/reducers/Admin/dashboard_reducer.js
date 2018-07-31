import{ LOGOUT_USER } from '../../actions/auth-actions';
import {RETRIEVED_DASHBOARD_REPORT} from "../../actions/Admin/dashboard-actions";

const DEFAULT_STATE = {
    exams_evaluated_per_month:[],
    exams_evaluated_qty: 0,
    exams_approved_per_month:[],
    exams_approved_qty: 0,
    exams_reject_per_month:[],
    exams_reject_qty: 0,
    users_qty:0,
    devices_qty:0,
    pending_exams_qty:0,
    user_groups_qty: 0,
}

const adminDashboardReducer = (state = {...DEFAULT_STATE}, action) => {
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

export default adminDashboardReducer