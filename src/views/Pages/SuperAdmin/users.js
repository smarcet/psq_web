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
import PaginationContainer from "../../Base/PaginationContainer/PaginationContainer";
import swal from "sweetalert2";
import {getUsersByPage, deleteUser, resendUserVerification} from "../../../actions/users-actions";
import {DEFAULT_PAGE_SIZE, STUDENT, TEACHER} from "../../../constants";

class SuperAdminUsers extends Component {

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
        this.props.getUsersByPage(1, 5, value);
    }

    componentWillMount () {
        this.props.getUsersByPage(this.state.currentPage);
    }

    onClickAddNewAdminUser(event){
        this.props.history.push("/auth/super-admin/users/new");
        event.preventDefault();
    }

    onClickEditAdminUser(event, user){
        this.props.history.push(`/auth/super-admin/users/${user.id}`);
        event.preventDefault();
    }

    onClickReSendVerification(event, user){
        this.props.resendUserVerification(user.id).then(() =>  swal(
            T.translate('Success!'),
            T.translate('Your user has been notified.'),
            'success'
        ))
    }

    onClickDeleteAdminUser(event, user){
        swal({
            title: T.translate('Are you sure?'),
            text: T.translate('You will not be able to recover this user!'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: T.translate('Yes, delete it!'),
            cancelButtonText: T.translate('No, keep it')
        }).then((result) => {
            if (result.value) {
                this.props.deleteUser(user.id).then(() =>  swal(
                    T.translate('Deleted!'),
                    T.translate('Your user has been deleted.'),
                    'success'
                ))
            }
        })
        event.preventDefault();
    }

    onPageClick(event, pageNumber){
        this.setState({...this.state, currentPage: pageNumber});
        this.props.getUsersByPage(pageNumber);
        event.preventDefault();
    }

    getFriendlyRole(role){
        if(role == TEACHER)
            return T.translate('Teacher');
        if(role == STUDENT)
            return T.translate('Student');

        return T.translate('Super Admin');
    }

    render(){
        let users = this.props.users;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i>&nbsp;{T.translate('Users')}
                            </CardHeader>
                            <CardBody>
                                <Row className="search-container">
                                    <Col xs="12" sm="4" lg="4" >
                                        <Input type="text"
                                               className="input-search"
                                               id="search_user"
                                               name="search_user"
                                               onChange={this.handleOnChangeSearch}
                                               placeholder={T.translate('Search User')}/>
                                        <i className="fa fa-search filter-search"></i>
                                    </Col>
                                    <Col xs="12" sm="4" lg="3" >
                                        <Button onClick={(e) => this.onClickAddNewAdminUser(e)} className="button-add" color="primary">
                                            <i className="fa fa-plus-circle"></i>{'\u00A0'}&nbsp;{T.translate('Add User')}
                                        </Button>
                                    </Col>
                                </Row>
                                {
                                    users.length > 0 &&
                                    <Table responsive striped>
                                    <thead>
                                    <tr>
                                    <th>{T.translate("Id")}</th>
                                    <th>{T.translate('Email')}</th>
                                    <th>{T.translate("First Name")}</th>
                                    <th>{T.translate("Surname")}</th>
                                    <th>{T.translate("Role")}</th>
                                    <th>{T.translate("Status")}</th>
                                    <th>&nbsp;</th>
                                    <th>&nbsp;</th>
                                    <th>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {users.map((user, i) => {

                                        return (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.email}</td>
                                                <td>{user.first_name}</td>
                                                <td>{user.last_name}</td>
                                                <td>{this.getFriendlyRole(user.role)}</td>
                                                <td>
                                                    {
                                                        user.is_active &&
                                                        <Badge color="success">{T.translate('Active')}</Badge>
                                                    }
                                                    {
                                                        !user.is_active &&
                                                        <Badge color="secondary">{T.translate('Inactive')}</Badge>
                                                    }
                                                </td>
                                                <td className="col-button">
                                                    {!user.is_active &&
                                                    !user.is_verified &&
                                                    < Button color="danger" outline
                                                             onClick={(e) => this.onClickReSendVerification(e, user)}><i
                                                        className="fa fa-envelope"></i>&nbsp;{T.translate('Re-send verification')}
                                                    </Button>
                                                    }
                                                </td>
                                                <td className="col-button">
                                                    <Button color="primary" outline
                                                            onClick={(e) => this.onClickEditAdminUser(e, user)}><i
                                                        className="fa fa-edit"></i>&nbsp;{T.translate('Edit')}
                                                    </Button>{' '}
                                                </td>
                                                <td className="col-button">
                                                    <Button color="danger" outline
                                                            onClick={(e) => this.onClickDeleteAdminUser(e, user)}><i
                                                        className="fa fa-trash"></i>&nbsp;{T.translate('Delete')}
                                                    </Button>{' '}
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    </tbody>
                                    </Table>
                                }
                                <PaginationContainer
                                    count={this.props.usersCount}
                                    pageSize={DEFAULT_PAGE_SIZE}
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

const mapStateToProps = ({ superAdminUsersState }) => ({
    users : superAdminUsersState.items,
    usersCount:  superAdminUsersState.count,
});

export default connect (
    mapStateToProps,
    {
        getUsersByPage,
        deleteUser,
        resendUserVerification,
    }
)(SuperAdminUsers);
