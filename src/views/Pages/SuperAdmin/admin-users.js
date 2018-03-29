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

    onClickEditAdminUser(event, user){
        this.props.history.push(`/auth/super-admin/admin-users/${user.id}`);
        event.preventDefault();
    }

    onClickDeleteAdminUser(event, user){

    }

    render(){
        let users = [
            {
                id:1,
                first_name: 'Juan',
                last_name: 'Perez',
                active: true
            },
            {
                id:2,
                first_name: 'Jose',
                last_name: 'Perez',
                active: false
            },
            {
                id:3,
                first_name: 'Sebastian',
                last_name: 'Perez',
                active: true
            },
        ];
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

                                    {users.map((user,i) => {

                                        return (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.first_name}</td>
                                                <td>{user.last_name}</td>
                                                <td>
                                                    {
                                                        user.active &&
                                                        <Badge color="success">Active</Badge>
                                                    }
                                                    {
                                                        !user.active &&
                                                        <Badge color="secondary">Inactive</Badge>
                                                    }
                                                </td>
                                                <td>
                                                    <Button color="secondary" onClick={(e) => this.onClickEditAdminUser(e, user)}>Edit</Button>{' '}
                                                    <Button color="danger" onClick={(e) => this.onClickDeleteAdminUser(e, user)}>Delete</Button>{' '}
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
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>);
    }
}

export default SuperAdminAdminUsers;