import React, {Component} from 'react';
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Button
} from 'reactstrap';

import T from 'i18n-react';
import 'sweetalert2/dist/sweetalert2.css';
import swal from 'sweetalert2';
import { connect } from 'react-redux'
import { getDevicesByPage, deleteDevice, verifyDevice } from '../../../actions/superAdmin/devices-actions';
import PaginationContainer from "../../Base/PaginationContainer/PaginationContainer";
import {DEFAULT_PAGE_SIZE} from "../../../constants";

class SuperAdminDevices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        };
        this.onPageClick = this.onPageClick.bind(this);
        this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this);
    }

    componentWillMount () {
        this.props.getDevicesByPage(this.state.currentPage);
    }

    handleOnChangeSearch(event){
        let {value} = event.target;
        this.setState({...this.state, currentPage: 1});
        this.props.getDevicesByPage(1, DEFAULT_PAGE_SIZE, value);
    }

    onPageClick(event, pageNumber){
        this.setState({...this.state, currentPage: pageNumber});
        this.props.getDevicesByPage(pageNumber);
        event.preventDefault();
    }

    onClickVerifyDevice(event, device){
        swal({
            title: T.translate('Enter a Friendly name for device'),
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: T.translate('Verify It!'),
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
            title:  T.translate('Are you sure?'),
            text:  T.translate('You will not be able to recover this device!'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonText:  T.translate('Yes, delete it!'),
            cancelButtonText:  T.translate('No, keep it')
        }).then((result) => {
            if (result.value) {
                this.props.deleteDevice(device.id).then(() =>  swal(
                    T.translate('Deleted!'),
                    T.translate('Your device has been deleted.'),
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
                                        <th>{T.translate("Id")}</th>
                                        <th>{T.translate("MAC Address")}</th>
                                        <th>{T.translate("Serial #")}</th>
                                        <th>{T.translate("Friendly Name")}</th>
                                        <th>{T.translate("Owner")}</th>
                                        <th>{T.translate("Slots #")}</th>
                                        <th>{T.translate("Status")}</th>
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
                                                    {device.owner == null && T.translate('NOT SET')}
                                                </td>
                                                <td>{device.slots}</td>
                                                <td>
                                                    {
                                                        device.is_active &&
                                                        <Badge color="success">{T.translate('Active')}</Badge>
                                                    }
                                                    {
                                                        !device.is_active &&
                                                        <Badge color="secondary">{T.translate('Disabled')}</Badge>
                                                    }
                                                </td>
                                                <td className="col-button">
                                                    <Button outline color="primary" onClick={(e) => this.onClickEditDevice(e, device)}><i className="fa fa-edit"></i>&nbsp;{T.translate("Edit")}</Button>{' '}
                                                </td>
                                                <td className="col-button">
                                                    <Button outline color="danger" onClick={(e) => this.onClickDeleteDevice(e, device)}><i className="fa fa-trash"></i>&nbsp;{T.translate("Delete")}</Button>{' '}
                                                </td>
                                                <td className="col-button">
                                                    {
                                                        !device.is_verified &&
                                                        <Button outline color="primary"
                                                                onClick={(e) => this.onClickVerifyDevice(e, device)}><i
                                                            className="fa fa-edit"></i>&nbsp;{T.translate("Verify It")}
                                                        </Button>
                                                    }
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </Table>
                                <PaginationContainer
                                    count={this.props.devicesCount}
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

const mapStateToProps = ({ superAdminDevicesState }) => ({
    devices : superAdminDevicesState.items,
    devicesCount: superAdminDevicesState.count
});

export default connect (
    mapStateToProps,
    {
        getDevicesByPage,
        deleteDevice,
        verifyDevice
    }
)(SuperAdminDevices);