import React, {Component} from 'react';
import {Input, Button, Row, Col, Table} from 'reactstrap';
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
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class UserStatistics extends Component {

    constructor (props) {
        super(props)
        this.state = {
            startDate: moment(),
            endDate: moment(),
            exercise: 0,
            users : null
        };
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleChangeExercise = this.handleChangeExercise.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.getStatistics = this.getStatistics.bind(this);
        this.getUserOptions = this.getUserOptions.bind(this);
        this.randomRGBA = this.randomRGBA.bind(this);
        this.props.clearStatistics();
    }

    handleChangeStartDate(date) {
        this.setState({
            ...this.state,
            startDate: date
        });
    }

    handleChangeExercise(event){
        let {value} = event.target;

        this.setState({
            ...this.state,
            exercise: value
        });
    }

    handleChangeUser(selectedOptions){
        this.setState({
            ...this.state,
            users: selectedOptions
        });
    }

    componentWillMount() {
        let { currentUser } = this.props;
        if(currentUser.role != TEACHER ) return;
        this.props.getExercisesByPage(1, 9999999999).then(()=>{
            this.props.getMyAllowedUsersByPage(1, 9999999999);
        });
    }

    handleChangeEndDate(date) {
        this.setState({
            ...this.state,
            endDate: date
        });
    }

    async getStatistics(){
        let {exercise, startDate, endDate, users} = this.state;
        let unixStarDate = startDate.hours(0).minutes(0).seconds(0).milliseconds(0).unix();
        let unixEndDate = endDate.hours(23).minutes(59).seconds(59).milliseconds(999).unix();
        let { currentUser } = this.props;
        if(exercise == 0){
            swal(
                '',
                T.translate('You must select an exercise'),
                'warning'
            );
            return
        }
        if(users == null || users.length == 0){
            if(currentUser.role == TEACHER) {
                swal(
                    '',
                    T.translate('You must select an user'),
                    'warning'
                );
                return
            }
            users = [ { value: currentUser.id}]
        }
        let finalArray = users.map(async(userDTO) => { // map instead of forEach
            return await this.props.getStatisticsForExercise(exercise, userDTO.value, unixStarDate, unixEndDate);
        });
        await Promise.all(finalArray).then((values) =>
        {
            console.log(values);
        }).catch(function(err) {
            console.log(err.message); // some coding error in handling happened
        });
    }

    randomRGBA() {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
    }

    getUserOptions(){

        let {
            allowed_users,
            currentUser,
        } = this.props;

        let options = [
            { value: currentUser.id , label: T.translate("Me")},
        ];

        allowed_users = allowed_users.map((user, idx) => {
            return { value: user.id , label: user.first_name+" ,"+user.last_name};
        })

        return [... options, ... allowed_users];
    }

    render(){
        let {exercises,
            currentUser,
            dataset
        } = this.props;

        if(exercises == null || exercises.length <= 0) return (<div>
            <p>
                <b>{T.translate("Data not available")}</b>
            </p>
        </div>);

        let data1 = {
            datasets: []
        };
        let data2 =  {

            datasets: []
        };

        if(dataset.length > 0) {

            dataset.forEach((entry) => {
                if (entry.best_time_per_day && entry.best_time_per_day.length > 0)
                    data1.labels = entry.range;
                    var color = this.randomRGBA();
                    data1.datasets.push({
                        label: entry.user_fullname,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: color,
                        borderColor: color,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: color,
                        pointBackgroundColor: color,
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: color,
                        pointHoverBorderColor: color,
                        pointHoverBorderWidth: 2,
                        pointRadius: 3,
                        pointHitRadius: 10,

                        data: entry.best_time_per_day.map((item) => { return { x:item[0], y:item[1]};} ),
                    });

                if (entry.instances_per_day && entry.instances_per_day.length > 0)
                    var color2 = this.randomRGBA();
                    data2.labels = entry.range;
                    data2.datasets.push({
                        label:entry.user_fullname,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: color2,
                        borderColor: color2,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: color2,
                        pointBackgroundColor: color2,
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: color2,
                        pointHoverBorderColor: color2,
                        pointHoverBorderWidth: 2,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: entry.instances_per_day.map((item) => { return { x:item[0], y:item[1] }; }),
                    });
            })
        }
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
                            <div>
                            <Select
                                multi
                                name="user"
                                options={this.getUserOptions()}
                                placeholder={T.translate("-- Select an User --")}
                                onChange={this.handleChangeUser}
                                value={this.state.users}
                            />
                            </div>
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
                    { data1 != null && data1.datasets.length > 0 &&
                        <div>
                            <Line data={data1}
                                  options={{
                                      title: {
                                          display: true,
                                          text: T.translate('Best time per day (seconds)'),
                                          fontSize: 25
                                      },
                                      scales: {
                                          xAxes: [{
                                              scaleLabel: {
                                                  display: true,
                                                  labelString: T.translate('Day'),
                                                  fontSize: 10
                                              },
                                              type: 'time',
                                              time: {
                                                  unit: 'day',
                                                  displayFormats: {
                                                      day: 'MMM D'
                                                  }
                                              }
                                          }],
                                          yAxes: [{
                                              scaleLabel: {
                                                  display: true,
                                                  labelString: T.translate('Seconds'),
                                                  fontSize: 10
                                              }
                                          }]
                                      }
                                  }}
                            />
                        </div>
                    }
                    </Col>
                    <Col>
                    { data2 != null && data2.datasets.length > 0 &&
                        <div>
                            <Line data={data2}
                                  options={{
                                      title: {
                                          display: true,
                                          text: T.translate('Instances per day'),
                                          fontSize: 25
                                      },
                                      scales: {
                                          xAxes: [{
                                              scaleLabel: {
                                                  display: true,
                                                  labelString: T.translate('Day'),
                                                  fontSize: 10
                                              },
                                              type: 'time',
                                              time: {
                                                  unit: 'day',
                                                  displayFormats: {
                                                      day: 'MMM D'
                                                  }
                                              }
                                          }],
                                          yAxes: [{
                                              scaleLabel: {
                                                  display: true,
                                                  labelString: T.translate('Instances #'),
                                                  fontSize: 10
                                              }
                                          }]
                                      }
                                  }}
                            />
                        </div>
                    }
                    </Col>
                </Row>
                <Table striped>
                <tbody>
                {
                    dataset.map((entry, idx) => {
                        return(
                        <tr scope="row" key={idx}>
                            <td>
                                <b>{T.translate("User")}:</b>&nbsp;{entry.user_fullname}
                            </td>
                            <td>
                                <b>{T.translate("Repetitions on Period")}:</b>&nbsp;{entry.total_instances}
                            </td>
                            <td>
                                <b>{T.translate("Max Repetition/Day")}:</b>&nbsp;{entry.max_instances_per_day}
                            </td>
                            <td>
                                <b>{T.translate("Best Time (seconds)")}:</b>&nbsp;{entry.best_time.duration__min}
                            </td>
                            <td>
                                <b>{T.translate("Advance")}:</b>&nbsp;{entry.advanced}&nbsp;%
                            </td>
                        </tr>
                        );
                    })
                }
                    </tbody>
                </Table>
            </div>
        );
    }
}


const mapStateToProps = ({loggedUserState, userExercisesState, statisticsState}) => ({
    currentUser: loggedUserState.currentUser,
    exercises : userExercisesState.items,
    allowed_users: statisticsState.allowed_users,
    dataset: statisticsState.dataset
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