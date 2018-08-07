import React, {Component} from 'react';
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Button,
    Input
} from 'reactstrap';

import T from 'i18n-react';
import {connect} from 'react-redux'
import {DEFAULT_PAGE_SIZE} from "../../../constants";
import {getExercisesByPage} from "../../../actions/User/exercises-actions";
import PaginationContainer from "../../Base/PaginationContainer/PaginationContainer";

class UserExercises extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        };
        this.onPageClick = this.onPageClick.bind(this);
        this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this);
    }

    componentWillMount() {
        this.props.getExercisesByPage(this.state.currentPage);
    }

    handleOnChangeSearch(event) {
        let {value} = event.target;
        this.setState({...this.state, currentPage: 1});
        this.props.getExercisesByPage(1, DEFAULT_PAGE_SIZE, value);
    }

    onPageClick(event, pageNumber) {
        this.setState({...this.state, currentPage: pageNumber});
        this.props.getExercisesByPage(pageNumber);
        event.preventDefault();
    }

    onClickViewExercise(event, exercise) {
        this.props.history.push(`/auth/user/exercises/${exercise.id}`);
        event.preventDefault();
    }

    getAuthorDisplayName(exercise) {
        if (!exercise) return '';
        if (!exercise.author) return '';
        return `${exercise.author.first_name}, ${exercise.author.last_name} (${exercise.author.email})`;
    }

    getDevices(exercise) {
        let devices = '';
        for (var device of exercise.allowed_devices) {
            devices += `${device.friendly_name}, `;
        }
        return devices;
    }

    render() {
        let {exercises} = this.props;

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> {T.translate("Available Exercises")}
                            </CardHeader>
                            <CardBody>
                                <Row className="search-container">
                                    <Col xs="12" sm="4" lg="4">
                                        <Input type="text" className="input-search" id="exercise-search"
                                               onChange={this.handleOnChangeSearch}
                                               name="exercise-search" placeholder={T.translate("Search Exercises")}/>
                                        <i className="fa fa-search filter-search"></i>
                                    </Col>
                                    <Col xs="12" sm="4" lg="3">
                                    </Col>
                                </Row>
                                {

                                    exercises.length == 0 &&
                                    <Row>
                                        <Col xs="12" sm="12" lg="12">
                                            <p>{T.translate("List is empty")}</p>
                                        </Col>
                                    </Row>
                                }

                                {exercises.length > 0 &&

                                <Row>
                                    <Col xs="12" sm="12" lg="12">
                                        <Table responsive striped>
                                            <thead>
                                            <tr>
                                                <th>{T.translate("Id")}</th>
                                                <th>{T.translate("Title")}</th>
                                                <th>{T.translate("Desc.")}</th>
                                                <th>{T.translate("Author")}</th>
                                                <th>{T.translate("Devices")}</th>
                                                <th>{T.translate("Takes")}</th>
                                                <th>&nbsp;</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {exercises.map((exercise, i) => {

                                                return (
                                                    <tr key={exercise.id}>
                                                        <td>{exercise.id}</td>
                                                        <td>{exercise.title}</td>
                                                        <td>{exercise.abstract}</td>
                                                        <td>{this.getAuthorDisplayName(exercise)}</td>
                                                        <td>{this.getDevices(exercise)}</td>
                                                        <td>
                                                            {
                                                                !exercise.takes &&
                                                                <Badge color="primary">{T.translate("NEW")}</Badge>
                                                            }

                                                            {
                                                                exercise.takes > 0 &&
                                                                <Badge color="success">{T.translate("Done, {takes} times",{takes:exercise.takes})}</Badge>
                                                            }
                                                        </td>
                                                        <td>
                                                            <Button onClick={(e) => this.onClickViewExercise(e, exercise)}
                                                                    outline color="primary"><i
                                                                className="fa fa-search"></i>&nbsp;{T.translate("View")}
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}

                                            </tbody>
                                        </Table>
                                        <PaginationContainer
                                            count={this.props.exercisesCount}
                                            pageSize={DEFAULT_PAGE_SIZE}
                                            currentPage={this.state.currentPage}
                                            onPageClick={this.onPageClick}
                                        />
                                    </Col>
                                </Row>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>);
    }
}

const mapStateToProps = ({userExercisesState}) => ({
    exercises: userExercisesState.items,
    exercisesCount: userExercisesState.count,
});

export default connect(
    mapStateToProps,
    {
        getExercisesByPage,
    }
)(UserExercises);