import React, {Component} from 'react';
import {
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
import 'sweetalert2/dist/sweetalert2.css';
import {connect} from 'react-redux'
import {DEFAULT_PAGE_SIZE} from "../../../constants";
import {getMyExercisesByPage} from "../../../actions/Admin/exercises-actions";
import PaginationContainer from "../../Base/PaginationContainer/PaginationContainer";

class AdminExams extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        };
        this.onPageClick = this.onPageClick.bind(this);
        this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this);
    }

    componentWillMount() {
        this.props.getMyExercisesByPage(this.state.currentPage);
    }

    handleOnChangeSearch(event) {
        let {value} = event.target;
        this.setState({...this.state, currentPage: 1});
        this.props.getMyExercisesByPage(1, DEFAULT_PAGE_SIZE, value);
    }

    onPageClick(event, pageNumber) {
        this.setState({...this.state, currentPage: pageNumber});
        this.props.getMyExercisesByPage(pageNumber);
        event.preventDefault();
    }

    onClickAddNewExercise(e) {
        this.props.history.push("/auth/admin/exercises/new");
    }

    onClickDeleteExercise(event, exercise) {

        swal({
            title: T.translate('Are you sure?'),
            text: T.translate('You will not be able to recover this exercise!'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: T.translate('Yes, delete it!'),
            cancelButtonText: T.translate('No, keep it')
        }).then((result) => {
            if (result.value) {
                swal(
                    T.translate('Deleted!'),
                    T.translate('Your exercise has been deleted.'),
                    'success'
                )
            }
        })
        event.preventDefault();
    }

    onClickEditExercise(event, exercise) {
        this.props.history.push(`/auth/admin/exercises/${exercise.id}`);
        event.preventDefault();
    }

    onClickShareExercise(event, exercise) {
        event.preventDefault();
    }

    getDevices(exercise){

    }

    getTakers(exercise){

    }

    getAuthorDisplayName(exercise){
        if(!exercise) return '';
        if(!exercise.author) return '';
        return `${exercise.author.first_name}, ${exercise.author.last_name} (${exercise.author.email})`;
    }

    render() {

        let {exercises} = this.props;

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> {T.translate("Exercises")}
                            </CardHeader>
                            <CardBody>
                                <Row className="search-container">
                                    <Col xs="12" sm="4" lg="4">
                                        <Input type="text" className="input-search" id="exercise-search"
                                               name="exercise-search" placeholder={T.translate("Search Exercise")}/>
                                        <i className="fa fa-search filter-search"></i>
                                    </Col>
                                    <Col xs="12" sm="4" lg="3">
                                        <Button onClick={(e) => this.onClickAddNewExercise(e)} className="button-add"
                                                color="primary">
                                            <i className="fa fa-plus-circle"></i>{'\u00A0'} {T.translate("Add Exercise")}
                                        </Button>
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
                                                <th>{T.translate("Max. Duration")}</th>
                                                <th>{T.translate("Devices")}</th>
                                                <th>{T.translate("Creator")}</th>
                                                <th>{T.translate("Takers")}</th>
                                                <th>&nbsp;</th>
                                                <th>&nbsp;</th>
                                                <th>&nbsp;</th>
                                                <th>&nbsp;</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {exercises.map((exercise, i) => {

                                                return (
                                                    <tr key={exercise.id}>
                                                        <td>{exercise.id}</td>
                                                        <td>{exercise.title}</td>
                                                        <td>{exercise.max_duration} {T.translate("Minutes")}</td>
                                                        <td>{this.getDevices(exercise)}</td>
                                                        <td>{this.getAuthorDisplayName(exercise)}</td>
                                                        <td>
                                                            {exercise.type == 1 && this.getTakers(exercise)}
                                                            {exercise.type == 2 && 'N/A'}
                                                        </td>
                                                        <td className="col-button">
                                                            <Button color="primary"
                                                                    onClick={(e) => this.onClickEditExercise(e, exercise)}
                                                                    outline><i
                                                                className="fa fa-edit"></i>&nbsp;{T.translate("Edit")}
                                                            </Button>
                                                        </td>
                                                        <td className="col-button">
                                                            <Button color="danger"
                                                                    onClick={(e) => this.onClickDeleteExercise(e, exercise)}
                                                                    outline><i
                                                                className="fa fa-trash"></i>&nbsp;{T.translate("Delete")}
                                                            </Button>
                                                        </td>
                                                        <td className="col-button">
                                                            <Button color="warning"
                                                                    onClick={(e) => this.onClickShareExercise(e, exercise)}
                                                                    outline><i
                                                                className="fa fa-share-alt"></i>&nbsp;{T.translate("Share")}
                                                            </Button>
                                                        </td>
                                                        <td className="col-button">
                                                            {exercise.type == 2 &&
                                                            <Button color="primary"
                                                                    onClick={(e) => this.onClickCreateExercise(e, exercise)}
                                                                    outline><i
                                                                className="fa fa-copy"></i>&nbsp;{T.translate("Create Exercise")}
                                                            </Button>
                                                            }
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


const mapStateToProps = ({adminExercisesState}) => ({
    exercises: adminExercisesState.items,
    exercisesCount: adminExercisesState.count,
});

export default connect(
    mapStateToProps,
    {
        getMyExercisesByPage,
    }
)(AdminExams);