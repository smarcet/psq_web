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

class App extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                    <Switch>
                        <AuthorizedRoute isLoggedUser={this.props.isLoggedUser}
                                         path='/auth'
                                         currentUser={this.props.currentUser}
                                         loading={this.props.loading}
                                         component={Full} />
                        <Route path="/404" component={Page404} />
                        <Route exact path="/logout" component={Logout} />
                        <PropsRoute path="/register" component={Register} isLoggedUser={this.props.isLoggedUser} isValidGuestUser={this.props.isValidGuestUser}/>
                        <PropsRoute path="/guest/stream" component={StreamPlayer} isLoggedUser={this.props.isLoggedUser} isValidGuestUser={this.props.isValidGuestUser}/>
                        <PropsRoute path="/users/validate/:token" component={ActivateUser} doActivateUser={this.props.doActivateUser}/>
                        <DefaultRoute isLoggedUser={this.props.isLoggedUser} component={Login} doLogin={this.props.doLogin}/>
                    </Switch>
            </BrowserRouter>
        );
    }
};

const mapStateToProps = ({ loggedUserState, baseState }) => ({
    isLoggedUser: loggedUserState.isLoggedUser,
    isValidGuestUser: loggedUserState.isValidGuestUser,
    currentUser: loggedUserState.currentUser,
    loading: baseState.loading
});

export default connect(mapStateToProps, {
    onUserAuth,
    doLogin,
    doActivateUser
})(App)

