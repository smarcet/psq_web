import{ LOGOUT_USER } from '../actions/auth-actions';
import {CLEAR_EXERCISE_STATISTIC_DATA, RETRIEVED_EXERCISE_STATISTIC_DATA} from "../actions/statistics-actions";

const DEFAULT_STATE = {
    total_instances: 0,
    max_instances_per_day: 0,
    best_time: 0,
    best_time_per_day: [],
    instances_per_day: [],
}

const statisticsReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case RETRIEVED_EXERCISE_STATISTIC_DATA: {
            return {
                ...state,
                ...payload.response
            };
        }
            break;
        case CLEAR_EXERCISE_STATISTIC_DATA:
        case LOGOUT_USER: {
            return DEFAULT_STATE;
        }
            break;
        default:
            return state;
    }
}

export default statisticsReducer;