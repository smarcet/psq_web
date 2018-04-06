import React, {Component} from 'react';
import {
    Row,
    Col,
} from 'reactstrap';
import Widget02 from "../../Widgets/Widget02";
import T from "i18n-react/dist/i18n-react";

class UserDashBoard extends Component {
    render(){
        return (  <div className="animated fadeIn">
            <Row>
                <Col xs="12" sm="6" lg="4">
                    <Widget02 header="6" mainText={T.translate("user.dashboard.newsTitle")} icon="fa fa-bullhorn" color="primary" footer link="news"/>
                </Col>
                <Col xs="12" sm="6" lg="4">
                    <Widget02 header="2" mainText={T.translate("user.dashboard.examFeedbackTitle")} icon="fa fa-pencil" color="primary" footer link="exams"/>
                </Col>
                <Col xs="12" sm="6" lg="4">
                    <Widget02 header="2" mainText="New Videos" icon="fa fa-play" color="primary" footer link="videos"/>
                </Col>
            </Row>
        </div>)
    }
}

export default UserDashBoard;