
import { createStore, applyMiddleware, compose} from 'redux';
import loggedUserReducer from './reducers/auth-reducer'
import baseReducer from './reducers/base-reducer'
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import superAdminDevicesReducer from "./reducers/superAdmin/devices-reducer";
import superAdminEditDevicesReducer from "./reducers/superAdmin/edit-device-reducer";
import superAdminUsersReducer from "./reducers/superAdmin/users-reducer";
import superAdminEditUserReducer from "./reducers/superAdmin/edit-user-reducer";
import SettingsReducer from "./reducers/settings-reducer";
import adminDevicesReducer from "./reducers/Admin/devices-reducer";
import adminEditDevicesReducer from "./reducers/Admin/edit-device-reducer";
import adminUsersReducer from "./reducers/Admin/users-reducer";
import adminEditUserReducer from "./reducers/Admin/edit-user-reducer";
import adminExercisesReducer from "./reducers/Admin/exercises-reducer";
import adminEditExerciseReducer from "./reducers/Admin/edit-exercise-reducer";
import adminExamsReducer from "./reducers/Admin/exams-reducer";
import adminExamReducer from "./reducers/Admin/edit-exam-reducer";
import superAdminDashboardReducer from "./reducers/superAdmin/dashboard-reducer";
import adminUserGroupsReducer from "./reducers/Admin/user-groups-reducer";
import adminEditUserGroupReducer from "./reducers/Admin/edit-user-group-reducer";
import adminNewsReducer from "./reducers/Admin/news-reducer";
import adminEditNewsReducer from "./reducers/Admin/edit-news-reducer";
import adminDashboardReducer from "./reducers/Admin/dashboard_reducer";
import StreamPlayerReducer from "./reducers/stream-player-reducer";
import userExercisesReducer from "./reducers/User/exercises-reducer";
import userVideosReducer from "./reducers/User/videos-reducer";
import adminVideosReducer from "./reducers/Admin/videos-reducer";
import userExerciseViewReducer from "./reducers/User/view-exercise-reducer";
import userExamsReducer from "./reducers/User/exams-reducer";
import userDashboardReducer from "./reducers/User/dashboard-reducer";
import userExamViewReducer from "./reducers/User/view-exam-reducer";
import userNewsReducer from "./reducers/User/news-reducer";
import T from "i18n-react/dist/i18n-react";
import {getLanguage, USER_LOCALE_COOKIE_NAME} from "./constants";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

// default: localStorage if web, AsyncStorage if react-native

const config = {
    key: 'root_psq',
    storage,
}

const reducers = persistCombineReducers(config, {
    loggedUserState: loggedUserReducer,
    baseState: baseReducer,
    StreamPlayerState: StreamPlayerReducer,
    // super admin ( supervisor)
    superAdminDevicesState: superAdminDevicesReducer,
    superAdminEditDevicesState: superAdminEditDevicesReducer,
    superAdminUsersState: superAdminUsersReducer,
    superAdminEditUserState: superAdminEditUserReducer,
    superAdminDashboardState: superAdminDashboardReducer,
    // admin ( teacher )
    adminDevicesState: adminDevicesReducer,
    settingsState: SettingsReducer,
    adminEditDevicesState: adminEditDevicesReducer,
    adminUsersState: adminUsersReducer,
    adminEditUserState: adminEditUserReducer,
    adminExercisesState: adminExercisesReducer,
    adminEditExerciseState: adminEditExerciseReducer,
    adminExamsState: adminExamsReducer,
    adminExamState: adminExamReducer,
    adminUserGroupsState: adminUserGroupsReducer,
    adminEditUserGroupState : adminEditUserGroupReducer,
    adminNewsState: adminNewsReducer,
    adminEditNewsState: adminEditNewsReducer,
    adminDashboardState:adminDashboardReducer,
    adminVideosState: adminVideosReducer,
    // raw user ( student )
    userExercisesState: userExercisesReducer,
    userVideosState: userVideosReducer,
    userExerciseViewState: userExerciseViewReducer,
    userExamsState: userExamsReducer,
    userDashboardState: userDashboardReducer,
    userExamViewState: userExamViewReducer,
    userNewsState: userNewsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const onRehydrateComplete = () => {
    // repopulate access token on global access variable
    let currentUser = store.getState().loggedUserState.currentUser;
    if(currentUser != null){
        let language = getLanguage(currentUser.locale);
        if(language != null){
            bake_cookie(USER_LOCALE_COOKIE_NAME, language);
            console.log(`user language is ${language}`);
            T.setTexts(require(`./i18n/${language}.json`));
        }
    }
    window.accessToken = store.getState().loggedUserState.accessToken;
}

export const persistor = persistStore(store, null, onRehydrateComplete);
export default store;