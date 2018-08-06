import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Footer from '../../components/Footer/';
import SuperAdminLayout from '../../layouts/superadmin-layout';
import AdminLayout from '../../layouts/admin-layout';
import UserLayout from '../../layouts/user-layout';
import {GUEST, STUDENT, SUPERVISOR, TEACHER} from "../../constants";
import {AjaxLoader} from "../../components/ajax-loader";

class Full extends Component {
    render() {
        let {currentUser} = this.props;

        if(currentUser.role == GUEST){
            console.log('Full.render: GUEST USER');
            return null;
        }
        return (

            <div className="app">
                <AjaxLoader show={this.props.loading} size={150}/>
                <Header currentUser={currentUser}/>
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <main className="main">
                        <Breadcrumb/>
                        <Container fluid>
                            <Switch>
                                if(currentUser.role == SUPERVISOR){
                                    <Route path="/auth/super-admin" component={SuperAdminLayout}/>
                                }
                                if(currentUser.role == TEACHER){
                                    <Route path="/auth/admin" component={AdminLayout}/>
                                }
                                if(currentUser.role == STUDENT) {
                                    <Route path="/auth/user" component={UserLayout}/>
                                }
                                <Route path="/auth" render={props => {
                                    if (currentUser.role == SUPERVISOR) {
                                        return (<Redirect
                                            exact
                                            to={{
                                                pathname: '/auth/super-admin',
                                                state: {from: props.location}
                                            }}
                                        />)
                                    }
                                    if (currentUser.role == TEACHER) {
                                        return (<Redirect
                                            exact
                                            to={{
                                                pathname: '/auth/admin',
                                                state: {from: props.location}
                                            }}
                                        />)
                                    }
                                    if (currentUser.role == STUDENT) {
                                        return (<Redirect
                                            exact
                                            to={{
                                                pathname: '/auth/user',
                                                state: {from: props.location}
                                            }}
                                        />)
                                    }

                                    console.log('Full.render: DEFAULT ROUTE /');
                                    return (<Redirect
                                        exact
                                        to={{
                                            pathname: '/',
                                            state: {from: props.location}
                                        }}
                                    />)
                                }}/>
                            </Switch>
                        </Container>
                    </main>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Full;
