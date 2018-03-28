import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import SuperAdminDashBoard from '../views/Pages/SuperAdmin/dashboard';
import UserSettings from "../views/Pages/user-settings";
import SuperAdminDevices from "../views/Pages/SuperAdmin/devices";
import SuperAdminAdminUsers from "../views/Pages/SuperAdmin/admin-users";
import SuperAdminNewAdminUser from "../views/Pages/SuperAdmin/new-admin-user";
import SuperAdminNewDevice from "../views/Pages/SuperAdmin/new-device";

class SuperAdminLayout extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/auth/super-admin/dashboard" component={SuperAdminDashBoard}></Route>
                    <Route exact path="/auth/super-admin/devices/new" component={SuperAdminNewDevice}></Route>
                    <Route path="/auth/super-admin/devices" component={SuperAdminDevices}></Route>
                    <Route exact path="/auth/super-admin/admin-users/new" component={SuperAdminNewAdminUser}></Route>
                    <Route path="/auth/super-admin/admin-users" component={SuperAdminAdminUsers}></Route>
                    <Route path="/auth/super-admin/settings" component={UserSettings}></Route>
                    <Redirect from="/auth/super-admin" to="/auth/super-admin/dashboard"/>
                </Switch>
            </div>
        )
    }
}
export default SuperAdminLayout;
