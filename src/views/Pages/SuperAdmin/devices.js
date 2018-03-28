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
    Button
} from 'reactstrap';
import {Bar, Line} from 'react-chartjs-2';
import T from 'i18n-react';

class SuperAdminDevices extends Component {

    onClickAddNewDevice(event){
        this.props.history.push("/auth/super-admin/devices/new");
        event.preventDefault();
    }

    render(){
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Devices
                            </CardHeader>
                            <CardBody>
                                <Button onClick={(e) => this.onClickAddNewDevice(e)} color="primary" className="add-entity-button"><i className="fa fa-plus-circle"></i>{'\u00A0'} Add Device</Button>
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
                                            <Button color="secondary">Edit</Button>{' '}
                                            <Button color="danger">Delete</Button>{' '}
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

export default SuperAdminDevices;