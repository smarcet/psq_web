import{ LOGOUT_USER } from '../../actions/auth-actions';
import {RETRIEVED_EXAMS} from "../../actions/Admin/exams-actions";

const DEFAULT_STATE = {
    items: [],
    count: 0,
}

const adminExamsReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case RETRIEVED_EXAMS: {
            return {
                ...state,
                items: action.payload.response.results,
                count: action.payload.response.count,
            };
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

export default adminExamsReducer