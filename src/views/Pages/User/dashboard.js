import React, {Component} from 'react';
import {
    Row,
    Col,
} from 'reactstrap';
import Widget02 from "../../Widgets/Widget02";
import T from 'i18n-react';
import {connect} from 'react-redux'
import {getRawUserDashBoardReport} from "../../../actions/User/dashboard-actions";


class UserDashBoard extends Component {

    componentWillMount() {
        this.props.getRawUserDashBoardReport();
    }

    render(){
        let {news_qty, new_videos_qty, exams_qty, exercises_qty} = this.props;
        return (  <div className="animated fadeIn">
            <Row>
                <Col xs="12" sm="6" lg="6">
                    <Widget02 header={news_qty.toString()} mainText={T.translate("News")} icon="fa fa-bullhorn" color="primary" footer link="news"/>
                </Col>
                <Col xs="12" sm="6" lg="6">
                    <Widget02 header={exams_qty.toString()} mainText={T.translate("Exams Feedback")} icon="fa fa-pencil" color="primary" footer link="exams"/>
                </Col>
                <Col xs="12" sm="6" lg="6">
                    <Widget02 header={new_videos_qty.toString()} mainText={T.translate("New Videos")} icon="fa fa-play" color="primary" footer link="videos"/>
                </Col>
                <Col xs="12" sm="6" lg="6">
                    <Widget02 header={exercises_qty.toString()} mainText={T.translate("New Exercises")} icon="fa fa-pencil" color="primary" footer link="exercises"/>
                </Col>
            </Row>
        </div>)
    }
}

const mapStateToProps = ({userDashboardState}) => ({
    news_qty:userDashboardState.news_qty,
    new_videos_qty:userDashboardState.new_videos_qty,
    exams_qty:userDashboardState.exams_qty,
    exercises_qty: userDashboardState.exercises_qty,
});

export default connect(
    mapStateToProps,
    {
        getRawUserDashBoardReport,
    }
)(UserDashBoard);