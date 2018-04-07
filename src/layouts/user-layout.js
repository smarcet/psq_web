import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import UserDashBoard from "../views/Pages/User/dashboard";
import UserSettings from "../views/Pages/user-settings";
import UserExams from "../views/Pages/User/exams";
import UserStatistics from "../views/Pages/User/statistics";
import UserVideos from "../views/Pages/User/videos";
import UserNews from "../views/Pages/User/news";
import UserViewExam from "../views/Pages/User/view-exam";

class UserLayout extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/auth/user/dashboard" component={UserDashBoard}></Route>
                    <Route path="/auth/user/exams/:exam_id" component={UserViewExam}></Route>
                    <Route path="/auth/user/exams" component={UserExams}></Route>
                    <Route path="/auth/user/statistics" component={UserStatistics}></Route>
                    <Route path="/auth/user/videos" component={UserVideos}></Route>
                    <Route path="/auth/user/news" component={UserNews}></Route>
                    <Route path="/auth/user/settings" component={UserSettings}></Route>
                    <Redirect from="/auth/user" to="/auth/user/dashboard"/>
                </Switch>
            </div>
        )
    }
}
export default UserLayout;
