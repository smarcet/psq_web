
import { createStore, applyMiddleware, compose} from 'redux';
import loggedUserReducer from './reducers/auth-reducer'
import baseReducer from './reducers/base-reducer'
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import superAdminDevicesReducer from "./reducers/superAdmin/devices-reducer";
import superAdminEditDevicesReducer from "./reducers/superAdmin/edit-device-reducer";
import superAdminAdminUsersReducer from "./reducers/superAdmin/admin-users-reducer";
import superAdminEditAdminUserReducer from "./reducers/superAdmin/edit-admin-user-reducer";
import superAdminNewAdminUserReducer from "./reducers/superAdmin/new-admin-user-reducer";

// default: localStorage if web, AsyncStorage if react-native

const config = {
    key: 'root_psq',
    storage,
}

const reducers = persistCombineReducers(config, {
    loggedUserState: loggedUserReducer,
    baseState: baseReducer,
    superAdminDevicesState: superAdminDevicesReducer,
    superAdminEditDevicesState: superAdminEditDevicesReducer,
    superAdminAdminUsersState: superAdminAdminUsersReducer,
    superAdminEditAdminUserState: superAdminEditAdminUserReducer,
    superAdminNewAdminUserState:superAdminNewAdminUserReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const onRehydrateComplete = () => {
    // repopulate access token on global access variable
    window.accessToken = store.getState().loggedUserState.accessToken;
}

export const persistor = persistStore(store, null, onRehydrateComplete);
export default store;