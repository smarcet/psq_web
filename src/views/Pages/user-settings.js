import React, {Component} from 'react';
import {
    Row,
    Col
} from 'reactstrap';
import UserEditForm from "./user-edit-form";
import {connect} from "react-redux";
import swal from "sweetalert2";
import {updateMyUserInfo, updateMyUserPic} from "../../actions/settings-actions";
import {FormValidator, EmailField, MandatoryField, EqualToField, MinSizeField} from "../../utils/form-validator";
import T from "i18n-react/dist/i18n-react";

class UserSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentEditUser: this.props.currentUser,
            validator: new FormValidator(
                [
                    new MandatoryField('first_name', 'First Name'),
                    new MandatoryField('last_name', 'Surname'),
                    new MandatoryField('email', 'Email'),
                    new EmailField('email', 'Email'),
                    new MandatoryField('role', 'Role'),
                    new EqualToField('password', 'password_confirmation', 'Password', 'Password Confirmation'),
                    new MinSizeField('password', 8, 'Password'),
                    new MinSizeField('password_confirmation', 8, 'Password Confirmation')
                ]
            )
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSaveUser = this.onSaveUser.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.handleShowPasswordChangeVisibilityChange = this.handleShowPasswordChangeVisibilityChange.bind(this);
    }

    handleShowPasswordChangeVisibilityChange(show) {
        if (!show) {
            let {currentEditUser, validator} = this.state;
            currentEditUser['password'] = currentEditUser['password_confirmation'] = null;
            validator.validate(currentEditUser);
            this.setState({...this.state, currentEditUser: currentEditUser, validator: validator});
        }
    }

    onSaveUser(event) {
        let {currentEditUser, validator} = this.state;
        event.preventDefault();
        if (!validator.isValidData(currentEditUser)) {
            this.setState({...this.state, validator: validator});
            return false;
        }

        this.props.updateMyUserInfo(this.state.currentEditUser).then(() => {
            // if user update his/her profile pic , call the endpoint
            if (this.state.currentEditUser.hasOwnProperty('pic_file')) {
                let {currentEditUser} = this.state;
                let picFile = currentEditUser.pic_file;
                delete  currentEditUser['pic_file'];
                this.setState({...this.state, currentEditUser});
                this.props.updateMyUserPic(picFile).then(() => {
                        swal(
                            '',
                            T.translate('User has been successfully updated!'),
                            'success'
                        );
                    }
                );
                return;
            }

            swal(
                '',
                T.translate('User has been successfully updated!'),
                'success'
            );
        });
    }

    onCancel(event) {
        this.props.history.goBack();
        event.preventDefault();
    }

    handleChange(event) {
        let {currentEditUser, validator} = this.state;
        let {value, id} = event.target;


        if (event.target.type == 'checkbox') {
            value = event.target.checked;
        }

        if (event.target.type == 'select-one' && value == '0') {
            value = '';
        }

        if (event.target.type == 'file') {
            currentEditUser[`${id}_file`] = event.target.files[0];
            value = null;
        }

        currentEditUser[id] = value;

        validator.validate(currentEditUser);

        this.setState({...this.state, currentEditUser: currentEditUser, validator: validator});
    }

    render() {
        let config = {showPassword: true, showBio: true, showPic: true, showEmailChangeWarning: true, canEditEmail : true};
        return (
            <Row>
                <Col xs="12" md="12">
                    <UserEditForm
                        onSave={this.onSaveUser}
                        config={config}
                        onCancel={this.onCancel}
                        handleChange={this.handleChange}
                        validator={this.state.validator}
                        onShowPasswordChangeVisibilityChange={this.handleShowPasswordChangeVisibilityChange}
                        currentEditUser={this.state.currentEditUser}
                    />
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = ({loggedUserState}) => ({
    currentUser: loggedUserState.currentUser,
});

export default connect(
    mapStateToProps,
    {
        updateMyUserInfo,
        updateMyUserPic
    }
)(UserSettings);
