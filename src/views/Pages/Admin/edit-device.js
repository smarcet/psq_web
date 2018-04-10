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
    Input,
    Button} from 'reactstrap';

import {

    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Form,
    FormGroup,
    FormText,
    Label,

} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import 'sweetalert2/dist/sweetalert2.css';
import swal from 'sweetalert2';
import classnames from 'classnames';

class AdminEditDevice extends Component {

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

    onClickAddNewUser(event){
        this.props.history.push("/auth/admin/users/new");
        event.preventDefault();
    }

    onClickUnlinkUser(event, user){
        swal({
            title: 'Are you sure?',
            text: 'You are about to disassociate this user with current device',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, unlink it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                swal(
                    'Deleted!',
                    'Your user has been unlinked.',
                    'success'
                )
            }
        })
        event.preventDefault();
    }

    render(){
        let deviceId = this.props.match.params.device_id;
        let deviceTitle = `Edit Device # ${deviceId}`;
        let linkedUsers = [
            {
                id: 1,
                first_name: 'Juan',
                last_name: 'Perez',
                user_name: 'juanperez@gmail.com',
                role: 'STUDENT',
            }
        ];
        let linkedAdminUsers = [
            {
                id: 1,
                first_name: 'Jose',
                last_name: 'Gomez',
                user_name: 'jgomez@gmail.com',
                role: 'TEACHER',
            }
        ];
        return(
            <Row>
                <Col xs="12" md="12" className="mb-4">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggleTab('1'); }}>
                                <i className="fa fa-video-camera"></i>
                                <span className={ this.state.activeTab === '1' ? "" : "d-none"}> {T.translate("editDevice.mainTab")} </span>{'\u00A0'}
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggleTab('2'); }}>
                                <i className="fa fa-user"></i>
                                <span className={ this.state.activeTab === '2' ? "" : "d-none"}>  {T.translate("editDevice.usersTab")} </span>{'\u00A0'}
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggleTab('3'); }}>
                                <i className="fa fa-user-plus"></i>
                                <span className={ this.state.activeTab === '3' ? "" : "d-none"}>  {T.translate("editDevice.adminUsersTab")} </span>{'\u00A0'}
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col xs="12" md="12" lg="12">
                                    <Card>
                                        <CardHeader>
                                            <strong>{deviceTitle}</strong>
                                        </CardHeader>
                                        <CardBody>
                                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                                <FormGroup row>
                                                    <Col md="3">
                                                        <Label htmlFor="text-input">Serial #</Label>
                                                    </Col>
                                                    <Col xs="12" md="9">
                                                        <Input type="text" id="text-input" name="text-input" value="123456" readOnly={true}/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md="3">
                                                        <Label htmlFor="text-input">Friendly Name</Label>
                                                    </Col>
                                                    <Col xs="12" md="9">
                                                        <Input type="text" id="text-input" name="text-input" placeholder="Friendly Name" defaultValue="DEVICE#1"/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md="3">
                                                        <Label htmlFor="email-input">Available Slots #</Label>
                                                    </Col>
                                                    <Col xs="12" md="9">
                                                        <Input type="number" id="email-input" name="email-input" value="3" readOnly={true}/>
                                                        <FormText className="help-block"># Users to associate with device</FormText>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md="3">
                                                        <Label>Is Enable?</Label>
                                                    </Col>
                                                    <Col md="9">
                                                        <FormGroup check inline>
                                                            <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1"/>
                                                        </FormGroup>
                                                    </Col>
                                                </FormGroup>
                                            </Form>
                                        </CardBody>
                                        <CardFooter>
                                            <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Save</Button>{' '}
                                            <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Cancel</Button>
                                        </CardFooter>
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row className="search-container">
                                <Col xs="12" sm="4" lg="4" >
                                    <Input type="text" className="input-search" id="input1-group2" name="input1-group2" placeholder="Search User"/>
                                    <i className="fa fa-search filter-search"></i>
                                </Col>
                                <Col xs="12" sm="4" lg="3" >
                                    <Button onClick={(e) => this.onClickAddNewAdminUser(e)} className="button-add" color="primary">
                                        <i className="fa fa-link"></i>{'\u00A0'}Link User
                                    </Button>
                                </Col>
                                <Col xs="12" sm="4" lg="3" >
                                    <Button onClick={(e) => this.onClickAddNewUser(e)} className="button-add" color="primary">
                                        <i className="fa fa-plus-circle"></i>{'\u00A0'} Add New User
                                    </Button>
                                </Col>
                            </Row>
                            <Row className="available-slots-container">
                                <Col md="4">
                                    <span>{T.translate("editDevice.linkedUsers.AvailableSlots")} <Badge pill color="secondary">2</Badge></span>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <Table responsive striped>
                                        <thead>
                                        <tr>
                                            <th>{T.translate("editDevice.linkedUsers.IdColTitle")}</th>
                                            <th>{T.translate("editDevice.linkedUsers.UserNameTitle")}</th>
                                            <th>{T.translate("editDevice.linkedUsers.FirstNameTitle")}</th>
                                            <th>{T.translate("editDevice.linkedUsers.SurnameTitle")}</th>
                                            <th>Role</th>
                                            <th>&nbsp;</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        { linkedUsers.map((user, i) => {

                                            return (
                                                <tr key={i}>
                                                    <td>{user.id}</td>
                                                    <td>{user.user_name}</td>
                                                    <td>{user.first_name}</td>
                                                    <td>{user.last_name}</td>
                                                    <td>{user.role}</td>
                                                    <td>
                                                        <Button onClick={(e) => { this.onClickUnlinkUser(e, user); }} outline color="danger">{T.translate("editDevice.linkedUsers.UnlinkButton")}</Button>{' '}
                                                    </td>
                                                </tr>
                                            );
                                        })}
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
                        <TabPane tabId="3">
                            <Row className="search-container">
                                <Col xs="12" sm="4" lg="4" >
                                    <Input type="text" className="input-search" id="input1-group2" name="input1-group2" placeholder="Search User"/>
                                    <i className="fa fa-search filter-search"></i>
                                </Col>
                                <Col xs="12" sm="4" lg="3" >
                                    <Button onClick={(e) => this.onClickLinkAdminUser(e)} className="button-add" color="primary">
                                        <i className="fa fa-link"></i>{'\u00A0'}Link Admin User
                                    </Button>
                                </Col>
                                <Col xs="12" sm="4" lg="3" >
                                    <Button onClick={(e) => this.onClickAddNewUser(e)} className="button-add" color="primary">
                                        <i className="fa fa-plus-circle"></i>{'\u00A0'} Add New Admin User
                                    </Button>
                                </Col>
                            </Row>
                            <Row className="available-slots-container">
                                <Col md="4">
                                    <span>{T.translate("editDevice.linkedUsers.AvailableSlots")} <Badge pill color="secondary">2</Badge></span>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <Table responsive striped>
                                        <thead>
                                        <tr>
                                            <th>{T.translate("editDevice.linkedUsers.IdColTitle")}</th>
                                            <th>{T.translate("editDevice.linkedUsers.UserNameTitle")}</th>
                                            <th>{T.translate("editDevice.linkedUsers.FirstNameTitle")}</th>
                                            <th>{T.translate("editDevice.linkedUsers.SurnameTitle")}</th>
                                            <th>Role</th>
                                            <th>&nbsp;</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        { linkedAdminUsers.map((user, i) => {

                                            return (
                                                <tr key={i}>
                                                    <td>{user.id}</td>
                                                    <td>{user.user_name}</td>
                                                    <td>{user.first_name}</td>
                                                    <td>{user.last_name}</td>
                                                    <td>{user.role}</td>
                                                    <td>
                                                        <Button onClick={(e) => { this.onClickUnlinkUser(e, user); }} outline color="danger">{T.translate("editDevice.linkedUsers.UnlinkButton")}</Button>{' '}
                                                    </td>
                                                </tr>
                                            );
                                        })}
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

export default AdminEditDevice;