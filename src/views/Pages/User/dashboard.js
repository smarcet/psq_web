import React, {Component} from 'react';
import {
    Row,
    Col,
} from 'reactstrap';

class UserDashBoard extends Component {
    render(){
        return (  <div className="animated fadeIn">
            <Row>
                <Col xs="12" sm="6" lg="3">
                    <h1>User DashBoard</h1>
                </Col>
            </Row>
        </div>)
    }
}

export default UserDashBoard;