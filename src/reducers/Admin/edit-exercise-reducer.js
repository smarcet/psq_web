import { LOGOUT_USER } from "../../actions/auth-actions";
import {RETRIEVED_MY_AVAILABLE_DEVICES, RETRIEVED_MY_EXERCISE} from "../../actions/Admin/exercises-actions";

export const DEFAULT_EXERCISE = {
    id: 0,
    title: '',
    abstract: '',
    max_duration: '',
    type: 0,
    author: 0,
    allowed_devices: [],
}

const DEFAULT_STATE = {
    currentEditExercise: DEFAULT_EXERCISE,
    availableDevices: [],
}

const adminEditExerciseReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action;
    switch (type) {

        case RETRIEVED_MY_EXERCISE: return {
            ...state,
            currentEditExercise: action.payload.response,
        };
            break
        case RETRIEVED_MY_AVAILABLE_DEVICES: return {
            ...state,
            availableDevices: action.payload.response.results,
        };
            break
        case LOGOUT_USER: {
            return DEFAULT_STATE;
        }
        default:
            return state;
    }
}

export default adminEditExerciseReducer