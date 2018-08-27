import React, {Component} from 'react';
import {Input, FormGroup, Form, Button, Label, Row, Col} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import T from "i18n-react";
import '../../scss/statistics.scss';
import {connect} from "react-redux";
import {getExercisesByPage} from "../../actions/User/exercises-actions";
import {getStatisticsForExercise} from "../../actions/statistics-actions";
import {Line} from 'react-chartjs-2';

class UserStatistics extends Component {

    constructor (props) {
        super(props)
        this.state = {
            startDate: moment(),
            endDate: moment(),
            exercise: 0,
        };
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleChangeExercise = this.handleChangeExercise.bind(this);
        this.getStatistics = this.getStatistics.bind(this);
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

    componentWillMount() {
        this.props.getExercisesByPage(1, 9999999999);
    }

    handleChangeEndDate(date) {
        this.setState({
            endDate: date
        });
    }

    getStatistics(){
        let {exercise, startDate, endDate} = this.state;
        let unixStarDate = startDate.hours(0).minutes(0).seconds(0).milliseconds(0).unix();
        let unixEndDate = endDate.hours(23).minutes(59).seconds(59).milliseconds(999).unix();
        if(exercise == 0) return;
        this.props.getStatisticsForExercise(exercise, unixStarDate, unixEndDate);
    }

    render(){
        let {exercises, best_time_per_day, instances_per_day, total_instances,best_time, max_instances_per_day} = this.props;
        if(exercises == null || exercises.length <= 0) return null;
        let data1 = null;
        let data2 = null;
        if(best_time_per_day && best_time_per_day.length > 0 )
        data1 = {
            labels: best_time_per_day.map((item) => item[0]),
            datasets: [
                {
                    label: T.translate('Best time per day'),
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
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
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: instances_per_day.map((item) => item[1]),
                    }
                ]
            };


        return (
            <div className="animated fadeIn">
                <Form inline>
                <FormGroup>
                    <Label for="exercise" className="mr-sm-2">{T.translate("Exercise")}&nbsp;</Label>
                    <Input type="select" name="exercise" id="exercise" onChange={this.handleChangeExercise}>
                        <option value="0">{T.translate("-- Select Exercise -- ")}</option>
                        {
                            exercises.map((exercise, idx) => {
                                return <option value={exercise.id} key={idx}>{exercise.title}</option>
                            })
                        }
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="startDate" className="mr-sm-2">{T.translate("From")}&nbsp;</Label>
                    <DatePicker
                        name='startDate'
                        selected={this.state.startDate}
                        onChange={this.handleChangeStartDate}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="endDate" className="mr-sm-2">{T.translate("To")}&nbsp;</Label>
                    <DatePicker
                        name='endDate'
                        selected={this.state.endDate}
                        onChange={this.handleChangeEndDate}
                    />
                </FormGroup>
                    <Button onClick={this.getStatistics}>{T.translate("Get Statistics")}</Button>
                </Form>
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
                <Row>
                    <Col>
                        <b>{T.translate("Repetitions on Period")}</b>&nbsp;{total_instances}
                    </Col>
                    <Col>
                        <b>{T.translate("Max Repetition/Day")}</b>&nbsp;{max_instances_per_day}
                    </Col>
                    <Col>
                        <b>{T.translate("Better Time")}</b>&nbsp;{best_time.duration__min}
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
});

export default connect(
    mapStateToProps,
    {
        getExercisesByPage,
        getStatisticsForExercise,
    }
)(UserStatistics);