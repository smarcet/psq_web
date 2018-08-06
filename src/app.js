import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Full from './containers/Full';
import AuthorizedRoute from './routes/autorized-route';
import DefaultRoute from './routes/default-route';
import Login from './views/Pages/Login';
import { connect } from 'react-redux'
import { onUserAuth, doLogin,  doActivateUser } from './actions/auth-actions'
import Page404 from './views/Pages/Page404';
import ActivateUser from "./views/Pages/ActivateUser/ActivateUser";
import PropsRoute from "./routes/props-route";
import StreamPlayer from "./views/Pages/StreamPlayer/stream-player";
import Register from "./views/Pages/Register";
import Logout from "./components/logout";
import {TEACHER, STUDENT, SUPERVISOR} from "./constants";

class App extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                    <Switch>
                        <AuthorizedRoute
                                         path='/auth'
                                         currentUser={this.props.currentUser}
                                         loading={this.props.loading}
                                         component={Full}
                                         allowedRoles={[SUPERVISOR, TEACHER, STUDENT]}/>
                        <PropsRoute path="/guest/stream" component={StreamPlayer}/>
                        <PropsRoute path="/register" component={Register}/>
                        <PropsRoute path="/users/validate/:token" component={ActivateUser} doActivateUser={this.props.doActivateUser}/>
                        <Route exact path="/logout" component={Logout} />
                        <Route path="/404" component={Page404} />
                        <DefaultRoute allowedRoles={[SUPERVISOR, TEACHER, STUDENT]} currentUser={this.props.currentUser} component={Login} doLogin={this.props.doLogin}/>
                    </Switch>
            </BrowserRouter>
        );
    }
};

const mapStateToProps = ({ loggedUserState, baseState }) => ({
    currentUser: loggedUserState.currentUser,
    loading: baseState.loading
});

export default connect(mapStateToProps, {
    onUserAuth,
    doLogin,
    doActivateUser
})(App)

