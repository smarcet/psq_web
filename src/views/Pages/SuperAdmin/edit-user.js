import React, {Component} from 'react';
import {
    Row,
    Col,
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import {connect} from "react-redux";
import { createNewUser, getUserById, updateUser } from "../../../actions/users-actions";
import swal from "sweetalert2";
import UserEditForm from "../user-edit-form";
import {FormValidator, EmailField, MandatoryField, EqualToField, MinSizeField} from "../../../utils/form-validator";

class SuperAdminEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentEditUser: {...this.props.currentEditUser},
            validator: new FormValidator(
                [
                    new MandatoryField('first_name', T.translate('First Name')),
                    new MandatoryField('last_name',  T.translate('Surname')),
                    new MandatoryField('email',  T.translate('Email')),
                    new EmailField('email',  T.translate('Email')),
                    new MandatoryField('role',  T.translate('Role')),
                    new EqualToField('password', 'password_confirmation'),
                    new MinSizeField('password',8,  T.translate('Password')),
                    new MinSizeField('password_confirmation',8, T.translate('Password Confirmation')),
                    new MandatoryField('locale',  T.translate('Locale')),
                ]
            )
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSaveUser = this.onSaveUser.bind(this);
        this.onCancel   = this.onCancel.bind(this);
    }

    componentWillMount() {
        let userId = this.props.match.params.user_id;
        if (typeof userId != 'undefined' && userId > 0) {
            this.props.getUserById(userId);
            return;
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...this.state,
            currentEditUser: {
                ...nextProps.currentEditUser
            }
        });
    }

    onSaveUser(event){

        let {currentEditUser, validator} = this.state;
        event.preventDefault();
        if (!validator.isValidData(currentEditUser)) {
            this.setState({...this.state, validator: validator});
            return false;
        }

        if(currentEditUser.id > 0){
            this.props.updateUser(this.state.currentEditUser).then(() => {
                swal(
                    '',
                    T.translate('Your user has been successfully updated!.'),
                    'success'
                );
                this.props.history.goBack();
            });
            return;
        }

        this.props.createNewUser(this.state.currentEditUser).then(() => {
            swal(
                '',
                T.translate('Your user has been successfully created!.'),
                'success'
            );
            this.props.history.goBack();
        });

    }

    onCancel(event){
        this.props.history.goBack();
        event.preventDefault();
    }

    handleChange(ev) {
        let {currentEditUser, validator} = this.state;
        let {value, id} = ev.target;


        if (ev.target.type == 'checkbox') {
            value = ev.target.checked;
        }

        if (ev.target.type == 'select-one' && value == '0') {
            value = null;
        }

        if (ev.target.type == 'file'){
            currentEditUser[`${id}_file`] = ev.target.files[0];
            value = null;
        }

        currentEditUser[id] = value;
        validator.validate(currentEditUser);

        this.setState({...this.state, currentEditUser: currentEditUser, validator: validator});
    }

    render(){
        let { validator, currentEditUser} = this.state;
        let config = {
            showPassword: false,
            showBio: false,
            showPic: false,
            canEditEmail: !currentEditUser.is_verified,
            showRole:true,
            showRoleSuperAdmin: true
        };
        return(
            <Row>
                <Col xs="12" md="12" className="mb-4">
                    <UserEditForm
                        onSave={this.onSaveUser}
                        config={config}
                        onCancel={this.onCancel}
                        handleChange={this.handleChange}
                        validator={validator}
                        currentEditUser={currentEditUser}/>
                </Col>
            </Row>
        );
    }

}

const mapStateToProps = ({ superAdminEditUserState }) => ({
    currentEditUser : superAdminEditUserState.currentEditUser,
});

export default connect (
    mapStateToProps,
    {
        createNewUser,
        getUserById,
        updateUser,
    }
)(SuperAdminEditUser);
