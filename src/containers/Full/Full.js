import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Logout from '../../components/logout';
import SuperAdminLayout from '../../layouts/superadmin-layout';
import AdminLayout from '../../layouts/admin-layout';
import UserLayout from '../../layouts/user-layout';

class Full extends Component {
  render() {
    let { currentMember } = this.props;
    return (
      <div className="app">
        <Header/>
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb/>
            <Container fluid>
              <Switch>
                <Route exact path="/auth/logout" component={Logout} />
                <Route path="/auth/super-admin" component={SuperAdminLayout} />
                <Route path="/auth/admin" component={AdminLayout} />
                <Route path="/auth/user" component={UserLayout} />
                <Route path="/auth" render={ props => {
                   if(currentMember.role == 'superadmin'){
                       return (<Redirect
                           exact
                           to={{
                               pathname: '/auth/super-admin',
                               state: { from: props.location }
                           }}
                       />)
                   }
                   if(currentMember.role == 'admin'){
                        return (<Redirect
                            exact
                            to={{
                                pathname: '/auth/admin',
                                state: { from: props.location }
                            }}
                        />)
                   }
                   if(currentMember.role == 'user'){
                        return (<Redirect
                            exact
                            to={{
                                pathname: '/auth/user',
                                state: { from: props.location }
                            }}
                        />)
                    }
                   return (<Redirect
                        exact
                        to={{
                            pathname: '/404',
                            state: { from: props.location }
                        }}
                    />)
                }} />
              </Switch>
            </Container>
          </main>
          <Aside/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Full;
