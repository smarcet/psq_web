import{ LOGOUT_USER } from '../actions/auth-actions';
import {CLEAR_EXERCISE_STATISTIC_DATA, RETRIEVED_EXERCISE_STATISTIC_DATA} from "../actions/statistics-actions";
import {RETRIEVED_ALLOWED_MY_USERS} from "../actions/Admin/users-actions";

const DEFAULT_STATE = {
    total_instances: 0,
    max_instances_per_day: 0,
    best_time: 0,
    best_time_per_day: [],
    instances_per_day: [],
    allowed_users: [],
}

const statisticsReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case RETRIEVED_EXERCISE_STATISTIC_DATA: {
            return {
                ...state,
                ...payload.response,
            };
        }
            break;
        case RETRIEVED_ALLOWED_MY_USERS: {
            return {
                ...state,
                allowed_users: action.payload.response.results,
            };
        }
            break;
        case CLEAR_EXERCISE_STATISTIC_DATA:
        {
            return {
                ...DEFAULT_STATE,
                allowed_users: state.allowed_users
            }
        }
        break;
        case LOGOUT_USER: {
            return DEFAULT_STATE;
        }
            break;
        default:
            return state;
    }
}

export default statisticsReducer;