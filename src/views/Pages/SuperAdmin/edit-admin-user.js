import React, {Component} from 'react';
import {
    Badge,
    Row,
    Col,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
   } from 'reactstrap';
import classnames from 'classnames';
import T from "i18n-react/dist/i18n-react";
import {connect} from "react-redux";
import {getAdminUserById, getAvailableDevices, getUserOwnedDevices, unLinkDevice, linkDevice} from "../../../actions/superAdmin/admin-users-actions";
import swal from "sweetalert2";
import SuperAdminAdminUserEditDevicesForm from "./admin-user-edit-devices-form";
import UserEditForm from "../user-edit-form";

class SuperAdminEditAdminUser extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.match.params.user_id);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            isOpenDropDown: false,
            currentEditAdminUser: this.props.currentEditAdminUser,
            errors: {},
        };
        this.handleChange   = this.handleChange.bind(this);
        this.handleChangeSearchDevices = this.handleChangeSearchDevices.bind(this);
        this.onSelectedDevice = this.onSelectedDevice.bind(this);
        this.onUnlinkDevice = this.onUnlinkDevice.bind(this);
        this.onLinkDevice = this.onLinkDevice.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onCancel(event){
        this.props.history.goBack();
        event.preventDefault();
    }


    handleChange(ev, isValid = null) {
        let currentEditAdminUser = {...this.state.currentEditAdminUser};
        let {value, id} = ev.target;
        let errors = this.state.errors;
        errors[id] = false;

        if(isValid != null)
            errors[id] = !isValid(ev.target);

        if (ev.target.type == 'checkbox') {
            value = ev.target.checked;
        }

        if (ev.target.type == 'select-one' && value == '0') {
            value = null;
        }

        if (ev.target.type == 'file'){
            currentEditAdminUser[`${id}_file`] = ev.target.files[0];
            value = null;
        }

        currentEditAdminUser[id] = value;
        this.setState({...this.state, currentEditAdminUser: currentEditAdminUser, errors: errors});
    }

    componentWillMount() {
        let userId = this.props.match.params.user_id;
        this.props.getAdminUserById(userId).then(() => this.props.getUserOwnedDevices(userId));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentEditAdminUser.id != nextProps.currentEditAdminUser.id) {
            this.setState({ ...this.state, currentEditAdminUser: nextProps.currentEditAdminUser});
        }
    }

    componentDidMount(){

    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                    ...this.state,
                    activeTab: tab
            });
        }
    }

    onSave(event){
        event.preventDefault();
    }

    handleChangeSearchDevices(event){
        let { value } = event.target;
        this.props.getAvailableDevices(value, 10)
    }

    onSelectedDevice(device){
        console.log(device.id);
    }

    onUnlinkDevice(device){
        let userId = this.props.match.params.user_id;
        this.props.unLinkDevice(userId, device);
    }

    onLinkDevice(device){
        let userId = this.props.match.params.user_id;
        this.props.linkDevice(userId, device);
    }

    render(){
        let { currentEditAdminUser } = this.state;
        let config = { showPassword: false, showBio: false, showPic: false };
        return (
            <Row>
                <Col xs="12" md="12" className="mb-4">
                    <Nav tabs>

                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}>
                                <i className="icon-user"></i>
                                <span className={ this.state.activeTab === '1' ? "" : "d-none"}> Profile </span>{'\u00A0'}

                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}>
                                <i className="icon-camrecorder"></i>
                                <span className={ this.state.activeTab === '2' ? "" : "d-none"}> Owned Devices </span>{'\u00A0'}
                                { this.props.ownedDevices.length > 0 &&
                                  <Badge pill color="success">{this.props.ownedDevices.length}</Badge>
                                }
                            </NavLink>
                        </NavItem>

                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <UserEditForm
                                config={config}
                                onSave={this.onSave}
                                errors={this.state.errors}
                                handleChange={this.handleChange}
                                onCancel={this.onCancel}
                                currentEditUser={currentEditAdminUser}/>
                        </TabPane>
                        <TabPane tabId="2">
                            <SuperAdminAdminUserEditDevicesForm
                                currentEditAdminUser={currentEditAdminUser}
                                handleChangeSearchDevices={this.handleChangeSearchDevices}
                                onSelectedDevice={this.onSelectedDevice}
                                currentDevices={this.props.currentDevices}
                                ownedDevices={this.props.ownedDevices}
                                unLinkDevice={this.onUnlinkDevice}
                                linkDevice={this.onLinkDevice}
                            ></SuperAdminAdminUserEditDevicesForm>
                        </TabPane>
                    </TabContent>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = ({ superAdminEditAdminUserState }) => ({
    currentEditAdminUser : superAdminEditAdminUserState.currentEditAdminUser,
    availableDevices: superAdminEditAdminUserState.availableDevices,
    currentDevices: superAdminEditAdminUserState.currentDevices,
    ownedDevices: superAdminEditAdminUserState.ownedDevices,
});

export default connect (
    mapStateToProps,
    {
        getAdminUserById,
        getUserOwnedDevices,
        getAvailableDevices,
        unLinkDevice,
        linkDevice
    }
)(SuperAdminEditAdminUser);

