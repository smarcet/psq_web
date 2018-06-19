import { LOGOUT_USER } from "../../actions/auth-actions";

export const DEFAULT_ADMIN_USER = {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    role: 2,
}

const DEFAULT_STATE = {
    currentEditAdminUser: DEFAULT_ADMIN_USER,
    currentDevices : [],
    ownedDevices: [],
}

const superAdminNewAdminUserReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOGOUT_USER: {
            return DEFAULT_STATE;
        }
        default:
            return state;
    }
}

export default superAdminNewAdminUserReducer