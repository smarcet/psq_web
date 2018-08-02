import {SET_STREAM_DATA, STREAM_VALIDATED} from "../actions/stream-player-actions";
import {LOGOUT_USER} from "../actions/auth-actions";
import {VALIDATE} from "../actions/base-actions";

const DEFAULT_STATE = {
    device_id : 0,
    exercise_id: 0,
    user_id: 0,
    exercise_max_duration: 0,
    signature: null,
    expires: 0,
    exercise: null,
    device: null,
    user: null,
    validLink: true,
}

const StreamPlayerReducer = (state = {...DEFAULT_STATE}, action) => {
    const { type, payload } = action

    switch(type){
        case SET_STREAM_DATA:{
            return {...state, payload}
        }
        break;
        case VALIDATE:{
            return {...state, validLink:false}
        }
        case STREAM_VALIDATED:
            return {...state,
                exercise: payload.response.exercise,
                device: payload.response.device,
                user: payload.response.user,
                validLink: true,
            }
            break;
        case LOGOUT_USER:
            return {...DEFAULT_STATE};
        default:
            return state;
            break;
    }
}

export default StreamPlayerReducer;