import React, {Component} from 'react';
import {Input, FormGroup, Form, Button, Label, Row, Col} from 'reactstrap';
import DatePicker from 'react-datepicker';
import {TEACHER} from "../../constants";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import T from "i18n-react";
import '../../scss/statistics.scss';
import {connect} from "react-redux";
import {getExercisesByPage} from "../../actions/User/exercises-actions";
import {getStatisticsForExercise, clearStatistics} from "../../actions/statistics-actions";
import {getMyAllowedUsersByPage} from '../../actions/Admin/users-actions';
import {Line} from 'react-chartjs-2';
import swal from "sweetalert2";
import es from 'date-fns/locale/es';

class UserStatistics extends Component {

    constructor (props) {
        super(props)
        this.state = {
            startDate: moment(),
            endDate: moment(),
            exercise: 0,
            user : 0
        };
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleChangeExercise = this.handleChangeExercise.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.getStatistics = this.getStatistics.bind(this);
        this.props.clearStatistics();
    }

    handleChangeStartDate(date) {
        this.setState({
            startDate: date
        });
    }

    handleChangeExercise(event){
        let {value} = event.target;

        this.setState({
            exercise: value
        });
    }

    handleChangeUser(event){
        let {value} = event.target;

        this.setState({
            user: value
        });
    }

    componentWillMount() {
        this.props.getExercisesByPage(1, 9999999999).then(()=>{
            this.props.getMyAllowedUsersByPage(1, 9999999999);
        });
    }

    handleChangeEndDate(date) {
        this.setState({
            endDate: date
        });
    }

    getStatistics(){
        let {exercise, startDate, endDate, user} = this.state;
        let unixStarDate = startDate.hours(0).minutes(0).seconds(0).milliseconds(0).unix();
        let unixEndDate = endDate.hours(23).minutes(59).seconds(59).milliseconds(999).unix();
        if(exercise == 0){
            swal(
                '',
                T.translate('You must select an exercise'),
                'warning'
            );
            return
        }
        if(user == 0){
            swal(
                '',
                T.translate('You must select an user'),
                'warning'
            );
            return
        }
        this.props.getStatisticsForExercise(exercise, user, unixStarDate, unixEndDate);
    }

    render(){
        let {exercises,
            allowed_users,
            best_time_per_day,
            instances_per_day,
            total_instances,
            best_time,
            max_instances_per_day,
            currentUser} = this.props;

        if(exercises == null || exercises.length <= 0) return (<div>
            <p>
                <b>{T.translate("Data not available")}</b>
            </p>
        </div>);

        let data1 = null;
        let data2 = null;
        if(best_time_per_day && best_time_per_day.length > 0 )
        data1 = {
            labels: best_time_per_day.map((item) => item[0]),
            datasets: [
                {
                    label: T.translate('Best time per day (seconds)'),
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(255,255,0,1)',
                    borderColor: 'rgba(255,255,0,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(255,255,0,1)',
                    pointBackgroundColor: 'rgba(255,255,0,1)',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(255,255,0,1)',
                    pointHoverBorderColor: 'rgba(255,255,0,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: best_time_per_day.map((item) => item[1]),
                }
            ]
        };
        if(instances_per_day && instances_per_day.length > 0 )
            data2 = {
                labels: instances_per_day.map((item) => item[0]),
                datasets: [
                    {
                        label: T.translate('Instances per day'),
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(255,255,0,1)',
                        borderColor: 'rgba(255,255,0,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(255,255,0,1)',
                        pointBackgroundColor: 'rgba(255,255,0,1)',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(255,255,0,1)',
                        pointHoverBorderColor: 'rgba(255,255,0,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: instances_per_day.map((item) => item[1]),
                    }
                ]
            };


        return (
            <div className="animated fadeIn">

               <Row className="statistics-search-form">
                <Col xs="12" md="2" lg="3">
                        <Input type="select" name="exercise" id="exercise" onChange={this.handleChangeExercise}>
                            <option value="0">{T.translate("-- Select Exercise --")}</option>
                            {
                                exercises.map((exercise, idx) => {
                                    return <option value={exercise.id} key={idx}>{exercise.title}</option>
                                })
                            }
                        </Input>

                </Col>

                   { currentUser.role == TEACHER &&
                        <Col xs="12" md="2" lg="3">
                            <Input type="select" name="user" id="user" onChange={this.handleChangeUser}>
                                <option value="0">{T.translate("-- Select an User --")}</option>
                                <option value={currentUser.id}>{T.translate("Me")}</option>
                                {
                                    allowed_users.map((user, idx) => {
                                        return <option value={user.id} key={idx}>{user.first_name+" ,"+user.last_name}</option>
                                    })
                                }
                            </Input>
                        </Col>
                    }
                   <Col xs="12" md="2" lg="2">
                            <DatePicker
                                dateFormat="DD/MM/Y"
                                name='startDate'
                                locale="es"
                                selected={this.state.startDate}
                                onChange={this.handleChangeStartDate}
                            />
                   </Col>
                   <Col xs="12" md="2" lg="2">
                            <DatePicker
                                name='endDate'
                                dateFormat="DD/MM/Y"
                                locale="es"
                                selected={this.state.endDate}
                                onChange={this.handleChangeEndDate}
                            />
                   </Col>
                   <Col xs="12" md="2" lg="2">
                        <Button outline color="primary" onClick={this.getStatistics}><i className="fa fa-search"></i>&nbsp;{T.translate("Search")}</Button>
                   </Col>
               </Row>
                <Row>
                    <Col>
                    { data1 != null &&
                        <Line data={data1}/>
                    }
                    </Col>
                    <Col>
                    { data2 != null &&
                        <Line data={data2}/>
                    }
                    </Col>
                </Row>
                {total_instances > 0 &&
                <Row className="row-statistics">
                    <Col>
                        <b>{T.translate("Repetitions on Period:")}</b>&nbsp;{total_instances}
                    </Col>
                    <Col>
                        <b>{T.translate("Max Repetition/Day:")}</b>&nbsp;{max_instances_per_day}
                    </Col>
                    <Col>
                        <b>{T.translate("Best Time (seconds):")}</b>&nbsp;{best_time.duration__min}
                    </Col>
                </Row>
                }
            </div>
        );
    }
}


const mapStateToProps = ({loggedUserState, userExercisesState, statisticsState}) => ({
    currentUser: loggedUserState.currentUser,
    exercises : userExercisesState.items,
    total_instances: statisticsState.total_instances,
    max_instances_per_day: statisticsState.max_instances_per_day,
    best_time: statisticsState.best_time,
    best_time_per_day: statisticsState.best_time_per_day,
    instances_per_day: statisticsState.instances_per_day,
    allowed_users: statisticsState.allowed_users,
});

export default connect(
    mapStateToProps,
    {
        getExercisesByPage,
        getMyAllowedUsersByPage,
        getStatisticsForExercise,
        clearStatistics,
    }
)(UserStatistics);