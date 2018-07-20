import{ LOGOUT_USER } from '../../actions/auth-actions';
import {DELETED_EXERCISE, RETRIEVED_MY_EXERCISES} from "../../actions/Admin/exercises-actions";

const DEFAULT_STATE = {
    items: [],
    count: 0,
}

const adminExercisesReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case RETRIEVED_MY_EXERCISES: {
            return {
                ...state,
                items: action.payload.response.results,
                count: action.payload.response.count,
            };
        }
            break;
        case DELETED_EXERCISE:{
            let {exerciseId} = payload;
            return {
                ...state,
                count: state.count - 1,
                items: state.items.filter(item => item.id !== exerciseId),
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

export default adminExercisesReducer