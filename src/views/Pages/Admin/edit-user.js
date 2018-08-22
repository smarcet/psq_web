import React, {Component} from 'react';
import {
    Row,
    Col,
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import {connect} from "react-redux";
import swal from "sweetalert2";
import UserEditForm from "../user-edit-form";
import {createNewUser, getUserById, updateUser} from '../../../actions/users-actions';
import {FormValidator, EmailField, MandatoryField, EqualToField, MinSizeField} from "../../../utils/form-validator";

class AdminEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentEditUser: {...this.props.currentEditUser},
            validator: new FormValidator(
                [
                    new MandatoryField('first_name', 'First Name'),
                    new MandatoryField('last_name', 'Surname'),
                    new MandatoryField('email', 'Email'),
                    new EmailField('email', 'Email'),
                    new MandatoryField('role', 'Role'),
                    new EqualToField('password', 'password_confirmation'),
                    new MinSizeField('password',8, 'Password'),
                    new MinSizeField('password_confirmation',8,'Password Confirmation'),
                    new MandatoryField('locale',  T.translate('Locale')),
                ]
            )
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSaveUser = this.onSaveUser.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillMount() {
        let userId = this.props.match.params.user_id;
        if (typeof userId != 'undefined' && userId > 0) {
            this.props.getUserById(userId);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...this.state,
            currentEditUser: {
                ...nextProps.currentEditUser
            }
        });
    }

    onSaveUser(event) {

        let {currentEditUser, validator} = this.state;
        event.preventDefault();
        if (!validator.isValidData(currentEditUser)) {
            this.setState({...this.state, validator: validator});
            return false;
        }

        if (this.state.currentEditUser.id > 0)
            this.props.updateUser(this.state.currentEditUser).then(() => {
                swal(
                    '',
                    T.translate('User has been successfully updated!'),
                    'success'
                );
                this.props.history.goBack();
            });
        else {
            this.props.createNewUser(this.state.currentEditUser).then(() => {
                swal(
                    '',
                    T.translate('User has been successfully created!'),
                    'success'
                );
                this.props.history.goBack();
            });
        }
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
        let canEditEmail = this.state.currentEditUser == 0 || ! this.state.currentEditUser.is_verified;
        let config = {showPassword: false, showBio: false, showPic: false, showRole: true, canEditEmail : canEditEmail};
        return (
            <Row>
                <Col xs="12" md="12" className="mb-4">
                    <UserEditForm
                        onSave={this.onSaveUser}
                        config={config}
                        onCancel={this.onCancel}
                        handleChange={this.handleChange}
                        validator={this.state.validator}
                        currentEditUser={this.state.currentEditUser}/>
                </Col>
            </Row>
        );
    }

}

const mapStateToProps = ({adminEditUserState}) => ({
    currentEditUser: adminEditUserState.currentEditUser,
});

export default connect(
    mapStateToProps,
    {
        createNewUser,
        getUserById,
        updateUser
    }
)(AdminEditUser);
