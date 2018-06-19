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
import {connect} from "react-redux";
import {getAdminUsersByPage} from "../../../actions/superAdmin/admin-users-actions";


class SuperAdminAdminUsers extends Component {

    componentWillMount () {
        this.props.getAdminUsersByPage();
    }

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
        let users = this.props.adminUsers;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Admin Users
                            </CardHeader>
                            <CardBody>
                                <Row className="search-container">
                                    <Col xs="12" sm="4" lg="4" >
                                        <Input type="text"
                                               className="input-search"
                                               id="search_user"
                                               name="search_user"
                                               placeholder="Search User"/>
                                        <i className="fa fa-search filter-search"></i>
                                    </Col>
                                    <Col xs="12" sm="4" lg="3" >
                                        <Button onClick={(e) => this.onClickAddNewAdminUser(e)} className="button-add" color="primary">
                                            <i className="fa fa-plus-circle"></i>{'\u00A0'} Add Admin User
                                        </Button>
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
                                                        user.is_active &&
                                                        <Badge color="success">Active</Badge>
                                                    }
                                                    {
                                                        !user.is_active &&
                                                        <Badge color="secondary">Inactive</Badge>
                                                    }
                                                </td>
                                                <td className="col-button">
                                                    <Button color="primary" outline onClick={(e) => this.onClickEditAdminUser(e, user)}><i className="fa fa-edit"></i>&nbsp;Edit</Button>{' '}
                                                </td>
                                                <td className="col-button">
                                                    <Button color="danger" outline onClick={(e) => this.onClickDeleteAdminUser(e, user)}><i className="fa fa-trash"></i>&nbsp;Delete</Button>{' '}
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

const mapStateToProps = ({ superAdminAdminUsersState }) => ({
    adminUsers : superAdminAdminUsersState.items,
});

export default connect (
    mapStateToProps,
    {
        getAdminUsersByPage,

    }
)(SuperAdminAdminUsers);
