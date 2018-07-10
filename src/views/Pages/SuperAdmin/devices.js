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
import { connect } from 'react-redux'
import { getDevicesByPage, deleteDevice, verifyDevice } from '../../../actions/superAdmin/devices-actions';

class SuperAdminDevices extends Component {

    componentWillMount () {
        this.props.getDevicesByPage();
    }

    onClickVerifyDevice(event, device){
        swal({
            title: 'Enter a Friendly name for device',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Verify It!',
            showLoaderOnConfirm: true,
            preConfirm: (friendlyName) => {
                this.props.verifyDevice(device.id, friendlyName).then(() => {});
            },
            allowOutsideClick: () => !swal.isLoading()
        });

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
                this.props.deleteDevice(device.id).then(() =>  swal(
                    'Deleted!',
                    'Your device has been deleted.',
                    'success'
                ))
            }
        })
        event.preventDefault();
    }

    onClickEditDevice(event, device){
        this.props.history.push(`/auth/super-admin/devices/${device.id}`);
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
                                <Table responsive striped>
                                    <thead>
                                    <tr>
                                        <th>{T.translate("superAdmin.devices.IdColTitle")}</th>
                                        <th>{T.translate("MAC Address")}</th>
                                        <th>{T.translate("superAdmin.devices.SerialNbrColTitle")}</th>
                                        <th>{T.translate("superAdmin.devices.FriendlyNameColTitle")}</th>
                                        <th>{T.translate("superAdmin.devices.OwnerColTitle")}</th>
                                        <th>{T.translate("superAdmin.devices.SlotsColTitle")}</th>
                                        <th>{T.translate("superAdmin.devices.StatusColTitle")}</th>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    { this.props.devices.map((device, i) => {

                                        return (

                                            <tr key={device.id}>
                                                <td>{device.id}</td>
                                                <td>{device.mac_address}</td>
                                                <td>{device.serial}</td>
                                                <td>{device.friendly_name}</td>
                                                <td>
                                                    {device.owner != null && device.owner.email}
                                                    {device.owner == null && 'NOT SET'}
                                                </td>
                                                <td>{device.slots}</td>
                                                <td>
                                                    {
                                                        device.is_active &&
                                                        <Badge color="success">Active</Badge>
                                                    }
                                                    {
                                                        !device.is_active &&
                                                        <Badge color="secondary">Disabled</Badge>
                                                    }
                                                </td>
                                                <td className="col-button">
                                                    <Button outline color="primary" onClick={(e) => this.onClickEditDevice(e, device)}><i className="fa fa-edit"></i>&nbsp;{T.translate("superAdmin.devices.EditButton")}</Button>{' '}
                                                </td>
                                                <td className="col-button">
                                                    <Button outline color="danger" onClick={(e) => this.onClickDeleteDevice(e, device)}><i className="fa fa-trash"></i>&nbsp;{T.translate("superAdmin.devices.DeleteButton")}</Button>{' '}
                                                </td>
                                                <td className="col-button">
                                                    {
                                                        !device.is_verified &&
                                                        <Button outline color="primary"
                                                                onClick={(e) => this.onClickVerifyDevice(e, device)}><i
                                                            className="fa fa-edit"></i>&nbsp;{T.translate("superAdmin.devices.VerifyButton")}
                                                        </Button>
                                                    }
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

const mapStateToProps = ({ superAdminDevicesState }) => ({
    devices : superAdminDevicesState.items,
});

export default connect (
    mapStateToProps,
    {
        getDevicesByPage,
        deleteDevice,
        verifyDevice
    }
)(SuperAdminDevices);