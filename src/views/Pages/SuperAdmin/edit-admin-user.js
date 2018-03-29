import React, {Component} from 'react';
import {Badge, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import SuperAdminNewAdminUser from "./new-admin-user";
import classnames from 'classnames';

class SuperAdminEditAdminUser extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.match.params.user_id);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render(){
        return (
            <Row>
                <Col xs="12" md="12" className="mb-4">
                    <Nav tabs>

                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}>
                                <i className="icon-user"></i>
                                <span className={ this.state.activeTab === '1' ? "" : "d-none"}> Profile </span>{'\u00A0'}

                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}>
                                <i className="icon-camrecorder"></i>
                                <span className={ this.state.activeTab === '2' ? "" : "d-none"}> Devices </span>{'\u00A0'}
                                <Badge pill color="success">10</Badge>
                            </NavLink>
                        </NavItem>

                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <SuperAdminNewAdminUser />
                        </TabPane>
                        <TabPane tabId="2">
                            2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                            officia deserunt mollit anim id est laborum.
                        </TabPane>

                    </TabContent>
                </Col>
            </Row>
        );
    }
}

export default SuperAdminEditAdminUser;