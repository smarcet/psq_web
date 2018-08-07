import{ LOGOUT_USER } from '../../actions/auth-actions';
import {RETRIEVED_DASHBOARD_REPORT} from "../../actions/User/dashboard-actions";

const DEFAULT_STATE = {
    news_qty:0,
    new_videos_qty:0,
    exams_qty:0,
    exercises_qty: 0,
}

const userDashboardReducer = (state = {...DEFAULT_STATE}, action) => {
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

export default userDashboardReducer