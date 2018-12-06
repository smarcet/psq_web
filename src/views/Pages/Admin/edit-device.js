import React, {Component} from 'react';
import {
    Row,
    Col,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import 'sweetalert2/dist/sweetalert2.css';
import swal from 'sweetalert2';
import classnames from 'classnames';
import DeviceEditForm from "./device-edit-form";
import {connect} from "react-redux";
import {
    getMyDeviceById,
    searchAdminAndRawUsers,
    linkUser2Device,
    unLinkUser2Device,
    linkAdminUser2Device,
    unLinkAdminUser2Device,
    searchAdminUsers,
    updateDevice,
} from "../../../actions/Admin/devices-actions";

import {FormValidator, MandatoryField} from "../../../utils/form-validator";

import DeviceEditFormUsersList from "./device-edit-form-users-list";
import {DEFAULT_PAGE_SIZE} from "../../../constants";

class AdminEditDevice extends Component {

    constructor(props) {
        super(props);
        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeTab: '1',
            currentEditDevice: this.props.currentEditDevice,
            validator: new FormValidator(
                [
                    new MandatoryField('friendly_name', 'Friendly Name'),
                ]
            )
        };

        this.onCancel = this.onCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onClickUnlinkUser = this.onClickUnlinkUser.bind(this);
        this.handleChangeSearchTermDeviceUser = this.handleChangeSearchTermDeviceUser.bind(this);
        this.handleLinkDeviceUser = this.handleLinkDeviceUser.bind(this);
        this.onClickAddNewUser = this.onClickAddNewUser.bind(this);
        this.handleLinkAdminDeviceUser = this.handleLinkAdminDeviceUser.bind(this);
        this.onClickUnlinkAdminUser = this.onClickUnlinkAdminUser.bind(this);
        this.handleChangeSearchTermDeviceAdminUser = this.handleChangeSearchTermDeviceAdminUser.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    handleChangeSearchTermDeviceUser(term) {
        this.props.searchAdminAndRawUsers(term, DEFAULT_PAGE_SIZE);
    }

    handleChangeSearchTermDeviceAdminUser(term) {
        this.props.searchAdminUsers(term, DEFAULT_PAGE_SIZE);
    }

    handleLinkDeviceUser(user) {
        if (this.state.currentEditDevice.slots > 0)
            this.props.linkUser2Device(this.state.currentEditDevice, user);
    }

    handleLinkAdminDeviceUser(user) {
        if (this.state.currentEditDevice.slots > 0)
            this.props.linkAdminUser2Device(this.state.currentEditDevice, user);
    }

    onSave(event) {

        let {currentEditDevice, validator} = this.state;
        event.preventDefault();
        if (!validator.isValidData(currentEditDevice)) {
            this.setState({...this.state, validator: validator});
            return false;
        }

        this.props.updateDevice(this.state.currentEditDevice).then(() => {
            swal(
                '',
                T.translate("Your device has been successfully updated!"),
                'success'
            );
            this.props.history.goBack();
        });
    }

    onCancel(event) {
        this.props.history.goBack();
        event.preventDefault();
    }

    handleChange(event) {
        let {currentEditDevice, validator} = this.state;
        let {value, id} = event.target;

        if (event.target.type == 'checkbox') {
            value = event.target.checked;
        }

        if (event.target.type == 'select-one' && value == '0') {
            value = '';
        }

        currentEditDevice[id] = value;

        validator.validate(currentEditDevice);
        this.setState({...this.state, currentEditDevice: currentEditDevice, validator: validator});
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                ...this.state,
                activeTab: tab
            });
        }
    }

    componentWillMount() {
        let deviceId = this.props.match.params.device_id;
        this.props.getMyDeviceById(deviceId);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...this.state, currentEditDevice: nextProps.currentEditDevice});
    }

    onClickAddNewUser(event) {
        this.props.history.push("/auth/admin/users/new");
        event.preventDefault();
    }

    onClickUnlinkUser(event, user) {
        swal({
            title: T.translate("Are you sure?"),
            text: T.translate("You are about to disassociate this user with current device"),
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: T.translate("Yes, unlink it!"),
            cancelButtonText: T.translate("No, keep it")
        }).then((result) => {
            if (result.value) {
                this.props.unLinkUser2Device(this.state.currentEditDevice, user).then(() => {
                    swal(
                        T.translate("Unlinked!"),
                        T.translate("User has been unlinked from this device"),
                        'success'
                    )
                });
            }
        })
        event.preventDefault();
    }

    onClickUnlinkAdminUser(event, user) {
        swal({
            title: T.translate("Are you sure?"),
            text: T.translate("You are about to disassociate this user with current device"),
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: T.translate("Yes, unlink it!"),
            cancelButtonText: T.translate("No, keep it")
        }).then((result) => {
            if (result.value) {
                this.props.unLinkAdminUser2Device(this.state.currentEditDevice, user).then(() => {
                    swal(
                        T.translate("Unlinked!"),
                        T.translate("User has been unlinked from this device"),
                        'success'
                    )
                });
            }
        })
        event.preventDefault();
    }

    render() {

        let {currentEditDevice, validator} = this.state;
        let deviceUsers = currentEditDevice.users;
        let deviceAdminUsers = currentEditDevice.admins;
        let slots = currentEditDevice.slots - (currentEditDevice.users.length + currentEditDevice.admins.length);

        return (
            <Row>
                <Col xs="12" md="12" className="mb-4">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '1'})}
                                onClick={() => {
                                    this.toggleTab('1');
                                }}>
                                <i className="fa fa-video-camera"></i>
                                <span
                                    className={this.state.activeTab === '1' ? "" : "d-none"}> {T.translate("Device Data")} </span>{'\u00A0'}
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '2'})}
                                onClick={() => {
                                    this.toggleTab('2');
                                }}>
                                <i className="fa fa-user"></i>
                                <span
                                    className={this.state.activeTab === '2' ? "" : "d-none"}>  {T.translate("Users")} </span>{'\u00A0'}
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '3'})}
                                onClick={() => {
                                    this.toggleTab('3');
                                }}>
                                <i className="fa fa-user-plus"></i>
                                <span
                                    className={this.state.activeTab === '3' ? "" : "d-none"}>  {T.translate("Admin Users")} </span>{'\u00A0'}
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <DeviceEditForm
                                validator={validator}
                                device={currentEditDevice}
                                handleChange={this.handleChange}
                                onSave={this.onSave}
                                onCancel={this.onCancel}
                            />
                        </TabPane>
                        <TabPane tabId="2">
                            <DeviceEditFormUsersList
                                availableSlots={slots}
                                deviceUsers={deviceUsers}
                                searchId="users"
                                onClickUnlinkUser={this.onClickUnlinkUser}
                                matchedUsers={this.props.matchedDeviceUsers}
                                handleChangeSearchTerm={this.handleChangeSearchTermDeviceUser}
                                handleLinkItem={this.handleLinkDeviceUser}
                                onClickAddUser={this.onClickAddNewUser}
                            />
                        </TabPane>
                        <TabPane tabId="3">
                            <DeviceEditFormUsersList
                                availableSlots={slots}
                                searchId="admins"
                                deviceUsers={deviceAdminUsers}
                                onClickUnlinkUser={this.onClickUnlinkAdminUser}
                                matchedUsers={this.props.matchedDeviceAdminUsers}
                                handleChangeSearchTerm={this.handleChangeSearchTermDeviceAdminUser}
                                handleLinkItem={this.handleLinkAdminDeviceUser}
                                onClickAddUser={this.onClickAddNewUser}
                            />
                        </TabPane>
                    </TabContent>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = ({adminEditDevicesState}) => ({
    currentEditDevice: adminEditDevicesState.currentEditDevice,
    matchedDeviceUsers: adminEditDevicesState.matchedDeviceUsers,
    matchedDeviceAdminUsers: adminEditDevicesState.matchedDeviceAdminUsers,
});

export default connect(
    mapStateToProps,
    {
        getMyDeviceById,
        searchAdminAndRawUsers,
        linkUser2Device,
        unLinkUser2Device,
        linkAdminUser2Device,
        unLinkAdminUser2Device,
        searchAdminUsers,
        updateDevice
    }
)(AdminEditDevice);