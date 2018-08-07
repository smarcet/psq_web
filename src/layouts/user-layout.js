import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import UserDashBoard from "../views/Pages/User/dashboard";
import UserSettings from "../views/Pages/user-settings";
import UserExams from "../views/Pages/User/exams";
import UserStatistics from "../views/Pages/User/statistics";
import UserVideos from "../views/Pages/User/videos";
import UserNews from "../views/Pages/User/news";
import UserViewExam from "../views/Pages/User/view-exam";
import UserExercises from "../views/Pages/User/exercises";
import UserViewExercise from "../views/Pages/User/view-exercise";

class UserLayout extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/auth/user/dashboard" component={UserDashBoard}></Route>
                    <Route path="/auth/user/exams/:exam_id" component={UserViewExam}></Route>
                    <Route path="/auth/user/exams" component={UserExams}></Route>
                    <Route path="/auth/user/exercises/:exercise_id" component={UserViewExercise}></Route>
                    <Route path="/auth/user/exercises" component={UserExercises}></Route>
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
