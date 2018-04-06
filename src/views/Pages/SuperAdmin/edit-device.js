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
    InputGroup,
    InputGroupAddon,
    Input,
    Button} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import SuperAdminNewDevice from "./new-device";
import classnames from 'classnames';

class SuperAdminEditDevice extends Component {

    constructor(props) {
        super(props);
        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeTab: '1',
        };
    }


    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                ...this.state,
                activeTab: tab
            });
        }
    }

    render(){
        return(
            <Row>
                <Col xs="12" md="12" className="mb-4">
                    <Nav tabs>

                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggleTab('1'); }}>
                                <i className="icon-camrecorder"></i>
                                <span className={ this.state.activeTab === '1' ? "" : "d-none"}> Main Data </span>{'\u00A0'}

                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggleTab('2'); }}>
                                <i className="icon-user"></i>
                                <span className={ this.state.activeTab === '2' ? "" : "d-none"}>  Users </span>{'\u00A0'}
                            </NavLink>
                        </NavItem>

                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <SuperAdminNewDevice />
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col md="4">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <Button type="button" color="primary"><i className="fa fa-search"></i> Search</Button>
                                        </InputGroupAddon>
                                        <Input type="text" id="input1-group2" name="input1-group2" placeholder="Search User"/>
                                    </InputGroup>
                                </Col>
                                <Col md="3">
                                    <Button color="primary" className="add-entity-button"><i className="fa fa-link"></i>{'\u00A0'} Link User</Button>
                                </Col>
                            </Row>
                            <Row className="available-slots-container">
                                <Col md="4">
                                    <span>Available Slots <Badge pill color="secondary">2</Badge></span>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <Table responsive striped>
                                        <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>UserName</th>
                                            <th>First Name</th>
                                            <th>Surname</th>
                                            <th>&nbsp;</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>jperez@gmail.com</td>
                                            <td>Jose</td>
                                            <td>Perez</td>
                                            <td>
                                                <Button color="danger">Unlink</Button>{' '}
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

export default SuperAdminEditDevice;