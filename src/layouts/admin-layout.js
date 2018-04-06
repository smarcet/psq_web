import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import AdminDashBoard from "../views/Pages/Admin/dashboard";
import UserSettings from "../views/Pages/user-settings";
import AdminExams from "../views/Pages/Admin/exams";
import AdminExercises from "../views/Pages/Admin/exercises";
import AdminNews from "../views/Pages/Admin/news";
import AdminUsers from "../views/Pages/Admin/users";
import AdminDevices from "../views/Pages/Admin/devices";
import AdminUserGroups from "../views/Pages/Admin/user-groups";

class AdminLayout extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/auth/admin/dashboard" component={AdminDashBoard}></Route>
                    <Route path="/auth/admin/exams" component={AdminExams}></Route>
                    <Route path="/auth/admin/exercises" component={AdminExercises}></Route>
                    <Route path="/auth/admin/news" component={AdminNews}></Route>
                    <Route path="/auth/admin/users" component={AdminUsers}></Route>
                    <Route path="/auth/admin/devices" component={AdminDevices}></Route>
                    <Route path="/auth/admin/user-groups" component={AdminUserGroups}></Route>
                    <Route path="/auth/admin/settings" component={UserSettings}></Route>
                    <Redirect from="/auth/admin" to="/auth/admin/dashboard"/>
                </Switch>
            </div>
        )
    }
}
export default AdminLayout;
