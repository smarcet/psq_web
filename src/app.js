import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import T from 'i18n-react';
import Full from './containers/Full';
import AuthorizedRoute from './routes/autorized-route';
import DefaultRoute from './routes/default-route';
import Login from './views/Pages/Login';
import { connect } from 'react-redux'
import { onUserAuth, doLogin, getUserInfo } from './actions/auth-actions'
import Page404 from './views/Pages/Page404';

let language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;

// language would be something like es-ES or es_ES
// However we store our files with format es.json or en.json
// therefore retrieve only the first 2 digits

if (language.length > 2) {
    language = language.split("-")[0];
    language = language.split("_")[0];
}

console.log(`user language is ${language}`);

T.setTexts(require(`./i18n/${language}.json`));

class App extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <AuthorizedRoute isLoggedUser={this.props.isLoggedUser}
                                         path='/auth'
                                         currentMember={this.props.member}
                                         component={Full} />
                        <Route path="/404" component={Page404} />
                        <DefaultRoute isLoggedUser={this.props.isLoggedUser} component={Login} doLogin={this.props.doLogin}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
};

const mapStateToProps = ({ loggedUserState }) => ({
    isLoggedUser: loggedUserState.isLoggedUser,
    member: loggedUserState.member,
});

export default connect(mapStateToProps, {
    onUserAuth,
    getUserInfo,
    doLogin
})(App)

