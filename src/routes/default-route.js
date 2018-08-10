
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

class DefaultRoute extends React.Component {

    render() {
        const { currentUser , doLogin, allowedRoles, component: Component, ...rest } = this.props;
        console.log('DefaultRoute');
        return (
            <Route {...rest} render={props => {
                if(currentUser == null){
                    return (<Component {...props} doLogin={doLogin}/>);
                }
                if(allowedRoles.includes(currentUser.role)) {
                    console.log("redirecting to /auth");
                    return (<Redirect
                        exact
                        to={{
                            pathname: '/auth',
                            state: {from: props.location}
                        }}
                    />)
                }
                return (<Redirect
                    to={{
                        pathname: '/404',
                    }}
                />);

            }} />
        )
    }
}


export default DefaultRoute;