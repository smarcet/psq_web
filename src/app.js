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

class App extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                    <Switch>
                        <AuthorizedRoute isLoggedUser={this.props.isLoggedUser}
                                         path='/auth'
                                         currentUser={this.props.currentUser}
                                         component={Full} />
                        <Route path="/404" component={Page404} />
                        <PropsRoute path="/users/validate/:token" component={ActivateUser} doActivateUser={this.props.doActivateUser}/>
                        <DefaultRoute isLoggedUser={this.props.isLoggedUser} component={Login} doLogin={this.props.doLogin}/>
                    </Switch>
            </BrowserRouter>
        );
    }
};

const mapStateToProps = ({ loggedUserState }) => ({
    isLoggedUser: loggedUserState.isLoggedUser,
    currentUser: loggedUserState.currentUser,
});

export default connect(mapStateToProps, {
    onUserAuth,
    doLogin,
    doActivateUser
})(App)

