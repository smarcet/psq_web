
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

class DefaultRoute extends React.Component {

    render() {
        const { isLoggedUser, doLogin, component: Component, ...rest } = this.props;
        return (
            <Route {...rest} render={props => {
                if(isLoggedUser)
                    return (<Redirect
                        exact
                        to={{
                            pathname: '/auth',
                            state: { from: props.location }
                        }}
                    />)

                return (<Component {...props} doLogin={doLogin}/>);
            }} />
        )
    }
}


export default DefaultRoute;