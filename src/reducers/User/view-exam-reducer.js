import { LOGOUT_USER } from "../../actions/auth-actions";
import {RETRIEVED_MY_EXAM_READ_ONLY} from "../../actions/User/exams-actions";


const DEFAULT_STATE = {
    currentExam: null
}

const userExamViewReducer = (state = {...DEFAULT_STATE}, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOGOUT_USER: {
            return {...DEFAULT_STATE};
        }
        case RETRIEVED_MY_EXAM_READ_ONLY: {
            return {...state, currentExam: payload.response }
        }
        default:
            return state;
    }
}

export default userExamViewReducer