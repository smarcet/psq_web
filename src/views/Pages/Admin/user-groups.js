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
import T from "i18n-react/dist/i18n-react";
import 'sweetalert2/dist/sweetalert2.css';
import swal from 'sweetalert2';

class AdminUserGroups extends Component {

    onClickAddGroup(e){
        this.props.history.push("/auth/admin/user-groups/new");
    }

    onClickDeleteGroup(event, group){

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

    onClickEditGroup(event, group){
        this.props.history.push(`/auth/admin/user-groups/${group.id}`);
        event.preventDefault();
    }

    render(){

        let groups = [
            {
                id:1,
                title: 'Group #1',
                code: 'GROUP1',
                users: 'jperez@gmail.com, mmartinez@hotmail.com'

            },
            {
                id:2,
                title: 'Group #2',
                code: 'GROUP2',
                users: 'josegomez@gmail.com, mmartinez@hotmail.com'
            },
        ];

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> {T.translate("admin.userGroups.Title")}
                            </CardHeader>
                            <CardBody>
                                <Row className="search-container">
                                    <Col xs="12" sm="4" lg="4" >
                                        <Input type="text" className="input-search" id="input1-group2" name="input1-group2" placeholder="Search User Group"/>
                                        <i className="fa fa-search filter-search"></i>
                                    </Col>
                                    <Col xs="12" sm="4" lg="3" >
                                        <Button onClick={(e) => this.onClickAddGroup(e)} className="button-add" color="primary">
                                            <i className="fa fa-plus-circle"></i>{'\u00A0'} Add User Group
                                        </Button>
                                    </Col>
                                </Row>
                                <Table responsive striped>
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Title</th>
                                        <th>Code</th>
                                        <th>Users</th>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    { groups.map((group ,i) => {

                                        return (
                                            <tr key={group.id}>
                                                <td>{group.id}</td>
                                                <td>{group.title}</td>
                                                <td>{group.code}</td>
                                                <td>{group.users}</td>
                                                <td className="col-button">
                                                    <Button color="primary" onClick={(e) => this.onClickEditGroup(e, group)}outline><i className="fa fa-edit"></i>&nbsp;Edit</Button>
                                                </td>
                                                <td className="col-button">
                                                    <Button color="danger" onClick={(e) => this.onClickDeleteGroup(e, group)} outline><i className="fa fa-trash"></i>&nbsp;Delete</Button>
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

export default AdminUserGroups;