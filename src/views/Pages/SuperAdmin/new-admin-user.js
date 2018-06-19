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
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button} from 'reactstrap';
import SuperAdminAdminUserEditForm from "./admin-user-edit-form";
import classnames from 'classnames';
import T from "i18n-react/dist/i18n-react";
import {connect} from "react-redux";
import { createNewAdminUser } from "../../../actions/superAdmin/admin-users-actions";
import swal from "sweetalert2";
import SuperAdminAdminUserEditDevicesForm from "./admin-user-edit-devices-form";

class SuperAdminNewAdminUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentEditAdminUser: this.props.currentEditAdminUser,
            errors: {
                email: true,
                first_name: true,
                last_name: true,
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSaveUser = this.onSaveUser.bind(this);
        this.onCancel   = this.onCancel.bind(this);
    }

    isValidForm(){
        let { errors } = this.state;
        let isValid = true;
        Object.keys( errors ).forEach( key => {
            isValid = isValid && !errors[key];
        });
        return isValid;
    }

    onSaveUser(event){
        if(this.isValidForm())
            this.props.createNewAdminUser(this.state.currentEditAdminUser).then(() => {
                swal(
                    '',
                    'Your device has been successfully updated!.',
                    'success'
                );
                this.props.history.goBack();
            });

        event.preventDefault();
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

    render(){
        let config = { showPassword: false, showBio: false, showPic: false };
        return(
          <Row>
              <Col xs="12" md="12" className="mb-4">
              <SuperAdminAdminUserEditForm onSave={this.onSaveUser}
                                           config={config}
                                           onCancel={this.onCancel}
                                           handleChange={this.handleChange}
                                           errors={this.state.errors}
                                           currentEditAdminUser={this.state.currentEditAdminUser}/>
              </Col>
          </Row>
        );
    }

}

const mapStateToProps = ({ superAdminNewAdminUserState }) => ({
    currentEditAdminUser : superAdminNewAdminUserState.currentEditAdminUser,
});

export default connect (
    mapStateToProps,
    {
        createNewAdminUser
    }
)(SuperAdminNewAdminUser);
