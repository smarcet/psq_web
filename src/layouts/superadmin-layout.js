import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import SuperAdminDashBoard from '../views/Pages/SuperAdmin/dashboard';
import UserSettings from "../views/Pages/user-settings";
import SuperAdminDevices from "../views/Pages/SuperAdmin/devices";
import SuperAdminUsers from "../views/Pages/SuperAdmin/users";
import SuperAdminEditDevice from "../views/Pages/SuperAdmin/edit-device";
import SuperAdminEditUser from "../views/Pages/SuperAdmin/edit-user";

class SuperAdminLayout extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/auth/super-admin/dashboard" component={SuperAdminDashBoard}></Route>
                    <Route exact path="/auth/super-admin/devices/:device_id" component={SuperAdminEditDevice}></Route>
                    <Route path="/auth/super-admin/devices" component={SuperAdminDevices}></Route>
                    <Route exact path="/auth/super-admin/users/new" component={SuperAdminEditUser}></Route>
                    <Route exact path="/auth/super-admin/users/:user_id" component={SuperAdminEditUser}></Route>
                    <Route path="/auth/super-admin/users" component={SuperAdminUsers}></Route>
                    <Route path="/auth/super-admin/settings" component={UserSettings}></Route>
                    <Redirect from="/auth/super-admin" to="/auth/super-admin/dashboard"/>
                </Switch>
            </div>
        )
    }
}
export default SuperAdminLayout;
