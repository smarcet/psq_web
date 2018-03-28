import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import AdminDashBoard from "../views/Pages/Admin/dashboard";
import UserSettings from "../views/Pages/user-settings";

class AdminLayout extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/auth/admin/dashboard" component={AdminDashBoard}></Route>
                    <Route path="/auth/admin/settings" component={UserSettings}></Route>
                    <Redirect from="/auth/admin" to="/auth/admin/dashboard"/>
                </Switch>
            </div>
        )
    }
}
export default AdminLayout;
