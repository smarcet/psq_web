import { LOGOUT_USER } from "../../actions/auth-actions";
import {RETRIEVED_EXERCISE_READ_ONLY} from "../../actions/User/exercises-actions";


const DEFAULT_STATE = {
    currentExercise: null
}

const userExerciseViewReducer = (state = {...DEFAULT_STATE}, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOGOUT_USER: {
            return {...DEFAULT_STATE};
        }
        case RETRIEVED_EXERCISE_READ_ONLY: {
            return {...state, currentExercise: payload.response }
        }
        default:
            return state;
    }
}

export default userExerciseViewReducer