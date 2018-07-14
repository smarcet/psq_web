
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
import SettingsReducer from "./reducers/settings-reducer";
import adminDevicesReducer from "./reducers/Admin/devices-reducer";
import adminEditDevicesReducer from "./reducers/Admin/edit-device-reducer";
import adminUsersReducer from "./reducers/Admin/users-reducer";
import adminEditUserReducer from "./reducers/Admin/edit-user-reducer";
import adminExercisesReducer from "./reducers/Admin/exercises-reducer";
import adminEditExerciseReducer from "./reducers/Admin/edit-exercise-reducer";
import adminExamsReducer from "./reducers/Admin/exams-reducer";
import adminExamReducer from "./reducers/Admin/edit-exam-reducer";

// default: localStorage if web, AsyncStorage if react-native

const config = {
    key: 'root_psq',
    storage,
}

const reducers = persistCombineReducers(config, {
    loggedUserState: loggedUserReducer,
    baseState: baseReducer,
    // super admin
    superAdminDevicesState: superAdminDevicesReducer,
    superAdminEditDevicesState: superAdminEditDevicesReducer,
    superAdminAdminUsersState: superAdminAdminUsersReducer,
    superAdminEditAdminUserState: superAdminEditAdminUserReducer,
    superAdminNewAdminUserState:superAdminNewAdminUserReducer,
    // admin
    adminDevicesState: adminDevicesReducer,
    settingsState: SettingsReducer,
    adminEditDevicesState: adminEditDevicesReducer,
    adminUsersState: adminUsersReducer,
    adminEditUserState: adminEditUserReducer,
    adminExercisesState: adminExercisesReducer,
    adminEditExerciseState: adminEditExerciseReducer,
    adminExamsState: adminExamsReducer,
    adminExamState: adminExamReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const onRehydrateComplete = () => {
    // repopulate access token on global access variable
    window.accessToken = store.getState().loggedUserState.accessToken;
}

export const persistor = persistStore(store, null, onRehydrateComplete);
export default store;