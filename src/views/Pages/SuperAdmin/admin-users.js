import React, {Component} from 'react';
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Button,
    Input
} from 'reactstrap';
import T from 'i18n-react';
import {connect} from "react-redux";
import { getAdminUsersByPage, deleteAdminUser} from "../../../actions/superAdmin/admin-users-actions";
import PaginationContainer from "../../Base/PaginationContainer/PaginationContainer";
import swal from "sweetalert2";
import {resendUserVerification} from "../../../actions/users-actions";

class SuperAdminAdminUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        };
        this.onPageClick = this.onPageClick.bind(this);
        this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this);
    }

    handleOnChangeSearch(event){
        let {value} = event.target;
        this.setState({...this.state, currentPage: 1});
        this.props.getAdminUsersByPage(1, 5, value);
    }

    componentWillMount () {
        this.props.getAdminUsersByPage(this.state.currentPage);
    }

    onClickAddNewAdminUser(event){
        this.props.history.push("/auth/super-admin/admin-users/new");
        event.preventDefault();
    }

    onClickEditAdminUser(event, user){
        this.props.history.push(`/auth/super-admin/admin-users/${user.id}`);
        event.preventDefault();
    }

    onClickReSendVerification(event, user){
        this.props.resendUserVerification(user.id).then(() =>  swal(
            'Success!',
            'Your user has been notified.',
            'success'
        ))
    }

    onClickDeleteAdminUser(event, user){
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this user!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.props.deleteAdminUser(user.id).then(() =>  swal(
                    'Deleted!',
                    'Your user has been deleted.',
                    'success'
                ))
            }
        })
        event.preventDefault();
    }

    onPageClick(event, pageNumber){
        this.setState({...this.state, currentPage: pageNumber});
        this.props.getAdminUsersByPage(pageNumber);
        event.preventDefault();
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
                                               onChange={this.handleOnChangeSearch}
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
                                        <th>Email</th>
                                        <th>{T.translate("superAdmin.adminUsers.FirstNameColTitle")}</th>
                                        <th>{T.translate("superAdmin.adminUsers.SurNameColTitle")}</th>
                                        <th>{T.translate("superAdmin.adminUsers.StatusColTitle")}</th>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {users.map((user,i) => {

                                        return (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.email}</td>
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
                                                    {!user.is_active &&
                                                    !user.is_verified &&
                                                    < Button color="danger" outline
                                                             onClick={(e) => this.onClickReSendVerification(e, user)}><i
                                                        className="fa fa-envelope"></i>&nbsp;Re-send
                                                        verification</Button>
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
                                <PaginationContainer
                                    count={this.props.adminUsersCount}
                                    pageSize={5}
                                    currentPage={this.state.currentPage}
                                    onPageClick={this.onPageClick}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>);
    }
}

const mapStateToProps = ({ superAdminAdminUsersState }) => ({
    adminUsers : superAdminAdminUsersState.items,
    adminUsersCount:  superAdminAdminUsersState.count,
});

export default connect (
    mapStateToProps,
    {
        getAdminUsersByPage,
        deleteAdminUser,
        resendUserVerification,
    }
)(SuperAdminAdminUsers);
