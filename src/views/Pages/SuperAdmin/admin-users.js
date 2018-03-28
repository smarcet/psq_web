import React, {Component} from 'react';
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    InputGroup,
    InputGroupAddon,
    Input
} from 'reactstrap';
import {Bar, Line} from 'react-chartjs-2';
import T from 'i18n-react';


class SuperAdminAdminUsers extends Component {

    onClickAddNewAdminUser(event){
        this.props.history.push("/auth/super-admin/admin-users/new");
        event.preventDefault();
    }

    render(){
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Admin Users
                            </CardHeader>
                            <CardBody>
                                <Row style={{marginBottom:'10px'}}>
                                    <Col xs="4">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <Button type="button" color="primary"><i className="fa fa-search"></i> Search</Button>
                                            </InputGroupAddon>
                                            <Input type="text" id="input1-group2" name="input1-group2" placeholder="Search User"/>
                                        </InputGroup>
                                    </Col>
                                    <Col xs="4">
                                        <Button onClick={(e) => this.onClickAddNewAdminUser(e)} color="primary"><i className="fa fa-plus-circle"></i>{'\u00A0'} Add Admin User</Button>
                                    </Col>
                                </Row>
                                <Table responsive striped>
                                    <thead>
                                    <tr>
                                        <th>{T.translate("superAdmin.adminUsers.IdColTitle")}</th>
                                        <th>{T.translate("superAdmin.adminUsers.FirstNameColTitle")}</th>
                                        <th>{T.translate("superAdmin.adminUsers.SurNameColTitle")}</th>
                                        <th>{T.translate("superAdmin.adminUsers.StatusColTitle")}</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>John</td>
                                        <td>Doe</td>
                                        <td>
                                            <Badge color="success">Active</Badge>
                                        </td>
                                        <td>
                                            <Button color="secondary">Edit</Button>{' '}
                                            <Button color="danger">Delete</Button>{' '}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Richard</td>
                                        <td>Drumon</td>
                                        <td>
                                            <Badge color="secondary">Inactive</Badge>
                                        </td>
                                        <td>
                                            <Button color="secondary">Edit</Button>{' '}
                                            <Button color="danger">Delete</Button>{' '}
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
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>);
    }
}

export default SuperAdminAdminUsers;