import React from "react";
import { Redirect, Route} from 'react-router-dom'

class AuthorizedRoute extends React.Component {

    componentWillMount() {
    }

    render() {
        console.log('AuthorizedRoute.render');
        const { component: Component, currentUser, loading, allowedRoles, ...rest } = this.props;
        if(currentUser == null){
            let { location } = this.props;
            let backUrl = location.pathname;
            if(backUrl == "/logout")
                backUrl = null;
            if(backUrl != null && location.search != null && location.search != null){
                backUrl += location.search
            }
            if(backUrl != null && location.hash != null && location.hash != null){
                backUrl += location.hash
            }

            let pathname =  backUrl != null ? `/?BackUrl=${encodeURIComponent(backUrl)}`: '/';

            return (<Redirect
                to={{
                    pathname: pathname,
                    state: { from: location }
                }}
            />)

        }

        if(!allowedRoles.includes(currentUser.role)){
            return null;
        }

        return (
            <Route {...rest} render={ props => {


                return  <Component {...props} currentUser={currentUser} loading={loading}/>

            }} />
        )
    }
}

export default AuthorizedRoute;
