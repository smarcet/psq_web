import React, {Component} from 'react';
import {
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
import 'sweetalert2/dist/sweetalert2.css';
import {connect} from 'react-redux'
import PaginationContainer from "../../Base/PaginationContainer/PaginationContainer";
import {DEFAULT_PAGE_SIZE} from "../../../constants";
import {getUserGroupsByPage} from "../../../actions/Admin/user-groups-actions";

class AdminUserGroups extends Component {


    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        };
        this.onPageClick = this.onPageClick.bind(this);
        this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this);
    }

    componentWillMount() {
        this.props.getUserGroupsByPage(this.state.currentPage);
    }


    handleOnChangeSearch(event) {
        let {value} = event.target;
        this.setState({...this.state, currentPage: 1});
        this.props.getUserGroupsByPage(1, DEFAULT_PAGE_SIZE, value);
    }

    onPageClick(event, pageNumber) {
        this.setState({...this.state, currentPage: pageNumber});
        this.props.getUserGroupsByPage(pageNumber);
        event.preventDefault();
    }

    onClickAddGroup(e) {
        this.props.history.push("/auth/admin/user-groups/new");
    }

    onClickDeleteGroup(event, group) {

        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this user group!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                swal(
                    'Deleted!',
                    'Your user group has been deleted.',
                    'success'
                )
            }
        })
        event.preventDefault();
    }

    onClickEditGroup(event, group) {
        this.props.history.push(`/auth/admin/user-groups/${group.id}`);
        event.preventDefault();
    }

    render() {

        let {groups, groupsCount} = this.props;

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> {T.translate("User Groups")}
                            </CardHeader>
                            <CardBody>
                                <Row className="search-container">
                                    <Col xs="12" sm="4" lg="4">
                                        <Input type="text" className="input-search" id="input1-group2"
                                               name="input1-group2" placeholder={T.translate("Search User Group")}/>
                                        <i className="fa fa-search filter-search"></i>
                                    </Col>
                                    <Col xs="12" sm="4" lg="3">
                                        <Button onClick={(e) => this.onClickAddGroup(e)} className="button-add"
                                                color="primary">
                                            <i className="fa fa-plus-circle"></i>{'\u00A0'} {T.translate("Add User Group")}
                                        </Button>
                                    </Col>
                                </Row>
                                {
                                    groups.length == 0 &&
                                    <Row>
                                        <Col xs="12" sm="12" lg="12">
                                            <p>{T.translate("List is empty")}</p>
                                        </Col>
                                    </Row>
                                }
                                {groups.length > 0 &&
                                <Row>
                                    <Col xs="12" sm="12" lg="12">
                                        <Table responsive striped>
                                            <thead>
                                            <tr>
                                                <th>{T.translate("Id")}</th>
                                                <th>{T.translate("Name")}</th>
                                                <th>{T.translate("Code")}</th>
                                                <th>{T.translate("Device")}</th>
                                                <th>{T.translate("# Users")}</th>
                                                <th>&nbsp;</th>
                                                <th>&nbsp;</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {groups.map((group, i) => {
                                                let {device, members } = group;
                                                return (
                                                    <tr key={group.id}>
                                                        <td>{group.id}</td>
                                                        <td>{group.name}</td>
                                                        <td>{group.code}</td>
                                                        <td>{device.friendly_name}</td>
                                                        <td>{members.length}</td>
                                                        <td className="col-button">
                                                            <Button color="primary"
                                                                    onClick={(e) => this.onClickEditGroup(e, group)}
                                                                    outline><i
                                                                className="fa fa-edit"></i>&nbsp;{T.translate("Edit")}
                                                            </Button>
                                                        </td>
                                                        <td className="col-button">
                                                            <Button color="danger"
                                                                    onClick={(e) => this.onClickDeleteGroup(e, group)}
                                                                    outline><i
                                                                className="fa fa-trash"></i>&nbsp;{T.translate("Delete")}
                                                            </Button>
                                                        </td>

                                                    </tr>
                                                );
                                            })}

                                            </tbody>
                                        </Table>
                                        <PaginationContainer
                                            count={groupsCount}
                                            pageSize={DEFAULT_PAGE_SIZE}
                                            currentPage={this.state.currentPage}
                                            onPageClick={this.onPageClick}
                                        />
                                    </Col>
                                </Row>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>);
    }
}


const mapStateToProps = ({adminUserGroupsState, loggedUserState}) => ({
    groups: adminUserGroupsState.items,
    groupsCount: adminUserGroupsState.count,
    currentUser: loggedUserState.currentUser,
});

export default connect(
    mapStateToProps,
    {
        getUserGroupsByPage,
    }
)(AdminUserGroups);