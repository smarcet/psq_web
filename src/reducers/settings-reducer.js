import { LOGOUT_USER } from '../actions/auth-actions';

const DEFAULT_STATE = {


}

const settingsReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action

    switch(type){
        case LOGOUT_USER:
            return DEFAULT_STATE;
        default:
            return state;
            break;
    }
}

export default settingsReducer;