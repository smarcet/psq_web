import React, {Component} from 'react';
import {
    Badge,
    Row,
    Col,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button} from 'reactstrap';
import SuperAdminNewAdminUser from "./new-admin-user";
import classnames from 'classnames';
import T from "i18n-react/dist/i18n-react";

class SuperAdminEditAdminUser extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.match.params.user_id);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            isOpenDropDown: false
        };
        this.toggleDropDown = this.toggleDropDown.bind(this);
    }

    toggleDropDown() {
        this.setState({ ...this.state,
            isOpenDropDown: !this.state.isOpenDropDown
        });
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                    ...this.state,
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
                                <span className={ this.state.activeTab === '2' ? "" : "d-none"}> Owned Devices </span>{'\u00A0'}
                                <Badge pill color="success">10</Badge>
                            </NavLink>
                        </NavItem>

                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <SuperAdminNewAdminUser />
                        </TabPane>
                        <TabPane tabId="2">
                            <Row className="search-container">
                                <Col xs="12" md="4">
                                    <ButtonDropdown className="dropdown-add" isOpen={ this.state.isOpenDropDown} toggle={() => { this.toggleDropDown(); }}>
                                        <DropdownToggle caret>
                                            -- SELECT A DEVICE --
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>device#3</DropdownItem>
                                            <DropdownItem>device#4</DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                </Col>
                                <Col xs="12" md="3">
                                    <Button color="primary" className="button-add"><i className="fa fa-link"></i>{'\u00A0'} Link Device</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <Table responsive striped>
                                        <thead>
                                        <tr>
                                            <th>{T.translate("superAdmin.devices.IdColTitle")}</th>
                                            <th>{T.translate("superAdmin.devices.SerialNbrColTitle")}</th>
                                            <th>{T.translate("superAdmin.devices.FriendlyNameColTitle")}</th>
                                            <th>{T.translate("superAdmin.devices.StatusColTitle")}</th>
                                            <th>&nbsp;</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>123456789</td>
                                            <td>Device #1</td>
                                            <td>
                                                <Badge color="success">Active</Badge>
                                            </td>
                                            <td>
                                                <Button outline color="danger">Unlink</Button>{' '}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>123456789</td>
                                            <td>Device #2</td>
                                            <td>
                                                <Badge color="secondary">Inactive</Badge>
                                            </td>
                                            <td>
                                                <Button outline color="danger">Unlink</Button>{' '}
                                            </td>
                                        </tr>

                                        </tbody>
                                    </Table>
                                    <Pagination>
                                        <PaginationItem disabled><PaginationLink previous href="#">Prev</PaginationLink></PaginationItem>
                                        <PaginationItem active>
                                            <PaginationLink href="#">1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink href="#">4</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink next href="#">Next</PaginationLink></PaginationItem>
                                    </Pagination>
                                </Col>
                            </Row>
                        </TabPane>

                    </TabContent>
                </Col>
            </Row>
        );
    }
}

export default SuperAdminEditAdminUser;