import React, {Component} from 'react';
import {
    Row,
    Col
} from 'reactstrap';
import UserEditForm from "./user-edit-form";
import {connect} from "react-redux";
import swal from "sweetalert2";
import {updateMyUserInfo, updateMyUserPic} from "../../actions/settings-actions";

class UserSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentEditUser: this.props.currentUser,
            errors: {
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
            this.props.updateMyUserInfo(this.state.currentEditUser).then(() => {
                if(this.state.currentEditUser.hasOwnProperty('pic_file')){
                    let { currentEditUser } = this.state;
                    let picFile = currentEditUser.pic_file;
                    delete  currentEditUser['pic_file'];
                    this.setState({...this.state, currentEditUser});
                    this.props.updateMyUserPic(picFile).then(() => this.props.history.goBack());
                }
                else{
                    this.props.history.goBack();
                }

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
        let config = { showPassword: true, showBio: true, showPic: true };
        return(
            <Row>
                <Col xs="12" md="12">
                    <UserEditForm
                        onSave={this.onSaveUser}
                        config={config}
                        onCancel={this.onCancel}
                        handleChange={this.handleChange}
                        errors={this.state.errors}
                        currentEditUser={this.state.currentEditUser}
                    />
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = ({ loggedUserState }) => ({
    currentUser : loggedUserState.currentUser,
});

export default connect (
    mapStateToProps,
    {
        updateMyUserInfo,
        updateMyUserPic
    }
)(UserSettings);
