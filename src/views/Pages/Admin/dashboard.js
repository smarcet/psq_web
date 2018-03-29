import React, {Component} from 'react';
import {
    Row,
    Col,
} from 'reactstrap';
import Widget02 from "../../Widgets/Widget02";

class AdminDashBoard extends Component {
    render(){
        return (
            <div className="animated fadeIn">
            <Row>
                <Col xs="12" sm="6" lg="4">
                    <Widget02 header="15" mainText="Users" icon="fa fa-user" color="primary" footer link="users"/>
                </Col>
                <Col xs="12" sm="6" lg="4">
                    <Widget02 header="6" mainText="Groups" icon="fa fa-users" color="primary" footer link="groups"/>
                </Col>
                <Col xs="12" sm="6" lg="4">
                    <Widget02 header="6" mainText="Devices" icon="fa fa-video-camera" color="primary" footer link="groups"/>
                </Col>
            </Row>
            <Row>
            </Row>
        </div>)
    }
}

export default AdminDashBoard;