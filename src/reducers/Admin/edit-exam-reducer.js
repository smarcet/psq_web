import {LOGOUT_USER} from "../../actions/auth-actions";
import {RETRIEVED_EXAM, RETRIEVED_EXAMS, UPDATED_EXAM} from "../../actions/Admin/exams-actions";


export const DEFAULT_EXAM = {
    id: 0,
    taker: null,
    device:null,
    videos:[],
    exercise: null,
}

const DEFAULT_STATE = {
    currentEditExam: DEFAULT_EXAM,
}

const adminExamReducer = (state = DEFAULT_STATE, action) => {
    const {type, payload} = action;
    switch (type) {
        case RETRIEVED_EXAM: {
            return {
                ...state,
                currentEditExam: action.payload.response,
            };
        }
            break
        case RETRIEVED_EXAMS: {
            return DEFAULT_STATE;
        }
            break;
        case RETRIEVED_EXAMS: {
            return DEFAULT_STATE;
        }
            break;
        case UPDATED_EXAM: {
            return DEFAULT_STATE;
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

export default adminExamReducer