import React, {Component} from 'react';
import {
    Row,
    Col,
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import {connect} from "react-redux";
import { createNewAdminUser } from "../../../actions/superAdmin/admin-users-actions";
import swal from "sweetalert2";
import UserEditForm from "../user-edit-form";
import {FormValidator, EmailField, MandatoryField, EqualToField, MinSizeField} from "../../../utils/form-validator";

class SuperAdminNewAdminUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentEditAdminUser: this.props.currentEditAdminUser,
            validator: new FormValidator(
                [
                    new MandatoryField('first_name', 'First Name'),
                    new MandatoryField('last_name', 'Surname'),
                    new MandatoryField('email', 'Email'),
                    new EmailField('email', 'Email'),
                    new MandatoryField('role', 'Role'),
                    new EqualToField('password', 'password_confirmation'),
                    new MinSizeField('password',8, 'Password'),
                    new MinSizeField('password_confirmation',8,'Password Confirmation')
                ]
            )
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSaveUser = this.onSaveUser.bind(this);
        this.onCancel   = this.onCancel.bind(this);
    }
    onSaveUser(event){

        let {currentEditUser, validator} = this.state;
        event.preventDefault();
        if (!validator.isValidData(currentEditUser)) {
            this.setState({...this.state, validator: validator});
            return false;
        }

        this.props.createNewAdminUser(this.state.currentEditAdminUser).then(() => {
                swal(
                    '',
                    T.translate('Your user has been successfully updated!.'),
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

    handleChange(ev) {
        let {currentEditAdminUser, validator} = this.state;
        let {value, id} = ev.target;


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
        validator.validate(currentEditAdminUser);

        this.setState({...this.state, currentEditAdminUser: currentEditAdminUser, validator: validator});
    }

    render(){
        let config = { showPassword: false, showBio: false, showPic: false, canEditEmail: true};
        return(
          <Row>
              <Col xs="12" md="12" className="mb-4">
              <UserEditForm
                  onSave={this.onSaveUser}
                  config={config}
                  onCancel={this.onCancel}
                  handleChange={this.handleChange}
                  validator={this.state.validator}
                  currentEditUser={this.state.currentEditAdminUser}/>
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
