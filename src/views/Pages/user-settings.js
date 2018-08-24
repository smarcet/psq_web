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
import countries from "../../utils/countries";

class UserSettings extends Component {

    constructor(props) {
        super(props);
        let validationRules = [
            new MandatoryField('first_name', T.translate('First Name')),
            new MandatoryField('last_name',  T.translate('Surname')),
            new MandatoryField('email', T.translate('Email')),
            new EmailField('email', T.translate('Email')),
            new MandatoryField('role', T.translate('Role')),
            new EqualToField('password', 'password_confirmation',
                T.translate('Password'),
                T.translate('Password Confirmation')
            ),
            new MinSizeField('password', 8, T.translate('Password')),
            new MinSizeField('password_confirmation', 8, T.translate('Password Confirmation')
            ),
            new MandatoryField('locale', T.translate('Locale')
            ),
            new MandatoryField('country', T.translate('Country')
            ),
        ];

        if( this.props.currentUser.role == 1 || this.props.currentUser.role == 2){
            validationRules.push(
                new MandatoryField('title', T.translate('Title')),
                new MandatoryField('organization', T.translate('Organization')),
                new MandatoryField('enrollment', T.translate('Enrollment')),
                new MandatoryField('hand', T.translate('Hand')),
            )
        }
        this.state = {
            currentEditUser: this.props.currentUser,
            validator: new FormValidator(
                validationRules
            )
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSaveUser = this.onSaveUser.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.handleShowPasswordChangeVisibilityChange = this.handleShowPasswordChangeVisibilityChange.bind(this);
    }

    componentWillMount() {

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
        let {currentUser } = this.props;
        let config = {showPassword: true, showBio: true, showPic: true, showEmailChangeWarning: true, canEditEmail : true};
        config['showSurgeonFields'] = currentUser.role == 1 || currentUser.role == 2;
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
                        countries={countries}
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
