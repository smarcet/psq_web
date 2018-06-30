import React, {Component} from 'react';
import {
    Badge,
    Row,
    Col,
    Table,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    Input
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import swal from "sweetalert2";

class SuperAdminAdminUserEditDevicesForm extends Component {

    constructor(props) {
        super(props);
        this.skipToggle = false;
        this.state = {
            isOpenDropDown: false,
            currentSelectedDevice: null,
        };
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.onSelectedDevice = this.onSelectedDevice.bind(this);
        this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
        this.onUnLinkDeviceClicked = this.onUnLinkDeviceClicked.bind(this);
    }

    onUnLinkDeviceClicked(device){
        swal({
            title: 'Are you sure?',
            text: 'you are about to the device from this user',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, unlink it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.props.unLinkDevice(device);
            }
        })
    }

    toggleDropDown() {
        if(this.skipToggle){
            this.skipToggle = false;
            return;
        }
        this.setState({ ...this.state,
            isOpenDropDown: !this.state.isOpenDropDown
        });
    }

    onClickLinkDevice(event){
        event.preventDefault();
        if(this.state.currentSelectedDevice == null){
            swal("ERROR", "Must select first a device!", "error");
            return;
        }
        this.props.linkDevice(this.state.currentSelectedDevice);
        this.setState({ ...this.state,
            currentSelectedDevice: null,
            isOpenDropDown: false,
        });
        let input =  document.getElementById('search_device');
        if(input == null) return;
        input.value = '';
    }

    onSelectedDevice(device){
        let input =  document.getElementById('search_device');
        if(input == null) return;
        input.value = device.friendly_name;
        this.skipToggle = true;
        this.setState({ ...this.state,
            currentSelectedDevice: device,
            isOpenDropDown: false,
        });
    }

    onChangeSearchInput(event){
        this.setState({ ...this.state,
            currentSelectedDevice: null,
            isOpenDropDown: false,
        });
        this.props.handleChangeSearchDevices(event);
    }

    render() {
        let { currentDevices, ownedDevices } = this.props;
        return (
            <Row>
                <Col xs="12" md="12">
                    <Row className="search-container">
                        <Col xs="12" md="4">
                            <ButtonDropdown className="dropdown-add" isOpen={this.state.isOpenDropDown} toggle={() => {
                                this.toggleDropDown();
                            }}>
                                <DropdownToggle>
                                    <Input type="text" onChange={this.onChangeSearchInput} id="search_device" name="search_device" placeholder={T.translate("Search Device")}/>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    { currentDevices.map((device, i) => {

                                            return (
                                                <DropdownItem key={device.id} onClick={ () => this.onSelectedDevice(device)}>{device.friendly_name}</DropdownItem>
                                            );
                                    })}
                                </DropdownMenu>
                            </ButtonDropdown>
                        </Col>
                        <Col xs="12" md="3">
                            <Button onClick={(e) => this.onClickLinkDevice(e)} color="primary" className="button-add"><i className="fa fa-link"></i>{'\u00A0'} {T.translate("Link Device")}</Button>
                        </Col>
                        <Col xs="12" md="3">
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            { ownedDevices.length == 0 &&
                                <p>{T.translate("List is Empty.")}</p>
                            }
                            { ownedDevices.length > 0 &&
                            <Table responsive striped>
                                <thead>
                                <tr>
                                    <th>{T.translate("Id")}</th>
                                    <th>{T.translate("Serial #")}</th>
                                    <th>{T.translate("Friendly Name")}</th>
                                    <th>{T.translate("Status")}</th>
                                    <th>&nbsp;</th>
                                </tr>
                                </thead>
                                <tbody>
                                {ownedDevices.map((device, i) => {

                                    return (
                                        <tr key={device.id}>
                                            <td>{device.id}</td>
                                            <td>{device.serial}</td>
                                            <td>{device.friendly_name}</td>
                                            <td>
                                                {
                                                    device.is_active &&
                                                    <Badge color="success">{T.translate("Active")}</Badge>
                                                }
                                                {
                                                    !device.is_active &&
                                                    <Badge color="secondary">{T.translate("Disabled")}</Badge>
                                                }
                                            </td>
                                            <td>
                                                <Button outline color="danger"
                                                        onClick={(e) => this.onUnLinkDeviceClicked(device)}>{T.translate("Unlink")}</Button>{' '}
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </Table>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default SuperAdminAdminUserEditDevicesForm;