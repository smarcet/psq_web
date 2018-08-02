import { LOGOUT_USER , RECEIVE_USER_INFO, RECEIVE_AUTH} from '../actions/auth-actions';
import jwtDecode from 'jwt-decode';
import {UPDATED_MY_USER_INFO, UPDATED_MY_USER_INFO_PIC} from "../actions/settings-actions";
import {NEW_GUEST_USER} from "../actions/users-actions";

const DEFAULT_STATE = {
    isLoggedUser: false,
    token: null,
    decodedToken: null,
    currentUser: null,
    isValidGuestUser: false,
};

const loggedUserReducer = (state = DEFAULT_STATE, action) => {

    if (action.type === RECEIVE_AUTH) {
        let { response } = action.payload;
        window.token = response.token;
        return {...state, token: response.token, decodedToken: jwtDecode(response.token) };
    }
    if(action.type === LOGOUT_USER){
        window.accessToken = null;
        return DEFAULT_STATE
    }
    if(action.type === NEW_GUEST_USER){
        let { response } = action.payload;
        return {...state, isValidGuestUser: true, currentUser: response};
    }
    if(action.type === RECEIVE_USER_INFO){
        let { response } = action.payload;
        return {...state, isLoggedUser:true, currentUser: response};
    }
    if(action.type === UPDATED_MY_USER_INFO){
        let newUserInfo  = action.payload;
        return {...state,  currentUser: newUserInfo};
    }
    if(action.type === UPDATED_MY_USER_INFO_PIC){
        let {pic, pic_url}  =  action.payload.response ;
        return {...state,  currentUser: {...state.currentUser, pic, pic_url}};
    }
    return state
}

export default loggedUserReducer