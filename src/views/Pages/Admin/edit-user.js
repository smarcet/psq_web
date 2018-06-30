import React, {Component} from 'react';
import {
    Row,
    Col,
} from 'reactstrap';
import UserEditForm from "../user-edit-form";

class AdminEditUser extends Component {
    render(){
        return (
            <Row>
                <Col xs="12" md="12">
                    <UserEditForm
                        config={config}
                        onSave={this.onSave}
                        errors={this.state.errors}
                        handleChange={this.handleChange}
                        onCancel={this.onCancel}
                        currentEditUser={currentEditAdminUser}/>
                </Col>
            </Row>
        );
    }
}

export default AdminEditUser;