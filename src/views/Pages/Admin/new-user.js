import React, {Component} from 'react';
import {
    Row,
    Col,
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import {connect} from "react-redux";
import swal from "sweetalert2";
import UserEditForm from "../user-edit-form";
import {createNewUser} from '../../../actions/Admin/users-actions';

class AdminNewUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentEditUser: this.props.currentEditUser,
            errors: {
                email: true,
                first_name: true,
                last_name: true,
                role:true
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
            this.props.createNewUser(this.state.currentEditUser).then(() => {
                swal(
                    '',
                    T.translate('User has been successfully created!'),
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
        let currentEditUser = {...this.state.currentEditUser};
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
            currentEditUser[`${id}_file`] = ev.target.files[0];
            value = null;
        }

        currentEditUser[id] = value;
        this.setState({...this.state, currentEditUser: currentEditUser, errors: errors});
    }

    render(){
        let config = { showPassword: false, showBio: false, showPic: false, showRole: true };
        return(
            <Row>
                <Col xs="12" md="12" className="mb-4">
                    <UserEditForm
                        onSave={this.onSaveUser}
                        config={config}
                        onCancel={this.onCancel}
                        handleChange={this.handleChange}
                        errors={this.state.errors}
                        currentEditUser={this.state.currentEditUser}/>
                </Col>
            </Row>
        );
    }

}

const mapStateToProps = ({ adminEditUserState }) => ({
    currentEditUser : adminEditUserState.currentEditUser,
});

export default connect (
    mapStateToProps,
    {
        createNewUser
    }
)(AdminNewUser);
