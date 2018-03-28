import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import UserDashBoard from "../views/Pages/User/dashboard";
import UserSettings from "../views/Pages/user-settings";

class UserLayout extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/auth/user/dashboard" component={UserDashBoard}></Route>
                    <Route path="/auth/user/settings" component={UserSettings}></Route>
                    <Redirect from="/auth/user" to="/auth/user/dashboard"/>
                </Switch>
            </div>
        )
    }
}
export default UserLayout;
