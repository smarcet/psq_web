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
import AdmimEvaluateExam from "../views/Pages/Admin/evaluate-exam";
import AdminEditExercise from "../views/Pages/Admin/edit-exercise";
import AdminEditDevice from "../views/Pages/Admin/edit-device";
import AdminEditNewsItem from "../views/Pages/Admin/edit-news";
import AdminEditUser from "../views/Pages/Admin/edit-user";
import AdminEditUserGroup from "../views/Pages/Admin/edit-user-group";
import AdminVideos from '../views/Pages/Admin/videos';

class AdminLayout extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/auth/admin/dashboard" component={AdminDashBoard}></Route>
                    <Route path="/auth/admin/exams/:exam_id/evaluate" component={AdmimEvaluateExam}></Route>
                    <Route path="/auth/admin/exams" component={AdminExams}></Route>
                    <Route path="/auth/admin/exercises/new" component={AdminEditExercise}></Route>
                    <Route path="/auth/admin/exercises/:exercise_id" component={AdminEditExercise}></Route>
                    <Route path="/auth/admin/exercises" component={AdminExercises}></Route>
                    <Route path="/auth/admin/news/new" component={AdminEditNewsItem}></Route>
                    <Route path="/auth/admin/news/:news_id" component={AdminEditNewsItem}></Route>
                    <Route path="/auth/admin/news" component={AdminNews}></Route>
                    <Route path="/auth/admin/users/new" component={AdminEditUser}></Route>
                    <Route path="/auth/admin/users/:user_id" component={AdminEditUser}></Route>
                    <Route path="/auth/admin/users" component={AdminUsers}></Route>
                    <Route path="/auth/admin/devices/:device_id" component={AdminEditDevice}></Route>
                    <Route path="/auth/admin/devices" component={AdminDevices}></Route>
                    <Route path="/auth/admin/user-groups/new" component={AdminEditUserGroup}></Route>
                    <Route path="/auth/admin/user-groups/:group_id" component={AdminEditUserGroup}></Route>
                    <Route path="/auth/admin/user-groups" component={AdminUserGroups}></Route>
                    <Route path="/auth/admin/videos" component={AdminVideos}></Route>
                    <Route path="/auth/admin/settings" component={UserSettings}></Route>
                    <Redirect from="/auth/admin" to="/auth/admin/dashboard"/>
                </Switch>
            </div>
        )
    }
}
export default AdminLayout;
