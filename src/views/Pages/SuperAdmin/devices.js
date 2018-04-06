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

import T from 'i18n-react';
import 'sweetalert2/dist/sweetalert2.css';
import swal from 'sweetalert2';

class SuperAdminDevices extends Component {

    onClickAddNewDevice(event){
        this.props.history.push("/auth/super-admin/devices/new");
        event.preventDefault();
    }

    onClickDeleteDevice(event, device){

        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this device!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                swal(
                    'Deleted!',
                    'Your device has been deleted.',
                    'success'
                )
            }
        })
        event.preventDefault();
    }

    onClickEditDevice(event, device){
        this.props.history.push(`/auth/super-admin/devices/${device.id}`);
        event.preventDefault();
    }

    render(){

        let devices = [
            {
                id:1,
                serial:'12345',
                friendly_name: 'Device#1',
                active:true,
                owner: 'Jose Perez',
                slots: 3,
            },
            {
                id:2,
                serial:'45678',
                friendly_name: 'Device#2',
                active:true,
                owner: 'Jose Perez',
                slots: 6,
            },
            {
                id:3,
                serial:'555555',
                friendly_name: 'Device#3',
                active:false,
                owner: 'N/A',
                slots: 0,
            },
        ];
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
                                        <th>{T.translate("superAdmin.devices.OwnerColTitle")}</th>
                                        <th>{T.translate("superAdmin.devices.SlotsColTitle")}</th>
                                        <th>{T.translate("superAdmin.devices.StatusColTitle")}</th>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    { devices.map((device, i) => {

                                        return (

                                            <tr key={device.id}>
                                                <td>{device.id}</td>
                                                <td>{device.serial}</td>
                                                <td>{device.friendly_name}</td>
                                                <td>{device.owner}</td>
                                                <td>{device.slots}</td>
                                                <td>
                                                    {
                                                        device.active &&
                                                        <Badge color="success">Active</Badge>
                                                    }
                                                    {
                                                        !device.active &&
                                                        <Badge color="secondary">Disabled</Badge>
                                                    }
                                                </td>
                                                <td className="col-button">
                                                    <Button outline color="primary" onClick={(e) => this.onClickEditDevice(e, device)}><i className="fa fa-edit"></i>&nbsp;{T.translate("superAdmin.devices.EditButton")}</Button>{' '}
                                                </td>
                                                <td className="col-button">
                                                    <Button outline color="danger" onClick={(e) => this.onClickDeleteDevice(e, device)}><i className="fa fa-trash"></i>&nbsp;{T.translate("superAdmin.devices.DeleteButton")}</Button>{' '}
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

export default SuperAdminDevices;