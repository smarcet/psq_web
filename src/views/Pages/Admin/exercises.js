import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Button,
    Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Badge
} from 'reactstrap';
import swal from "sweetalert2";
import T from 'i18n-react';
import 'sweetalert2/dist/sweetalert2.css';
import {connect} from 'react-redux'
import {DEFAULT_PAGE_SIZE} from "../../../constants";
import { getMyExercisesByPage, deleteExercise, shareExercise} from "../../../actions/Admin/exercises-actions";
import { getAllDevicesByPage } from "../../../actions/Admin/devices-actions";
import PaginationContainer from "../../Base/PaginationContainer/PaginationContainer";
import SearchBar from "../../../components/SearchBar/SearchBar";

class AdminExams extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            shareModalOpen: false,
            exerciseToShare: null,
        };
        this.onPageClick = this.onPageClick.bind(this);
        this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this);
        this.toggleModalShare = this.toggleModalShare.bind(this);
        this.getDisplayName = this.getDisplayName.bind(this);
        this.shareExercise = this.shareExercise.bind(this);
        this.handleChangeSearchTerm = this.handleChangeSearchTerm.bind(this);
        this.handleLinkItem = this.handleLinkItem.bind(this);
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

                this.props.deleteExercise(exercise).then(() => {
                    swal(
                        T.translate('Deleted!'),
                        T.translate('Your exercise has been deleted'),
                        'success'
                    )
                })
            }
        })
        event.preventDefault();
    }

    onClickEditExercise(event, exercise) {
        this.props.history.push(`/auth/admin/exercises/${exercise.id}`);
        event.preventDefault();
    }

    getDevices(exercise){
        let devices ='';
        for (var device of exercise.allowed_devices) {
            devices += `${device.friendly_name}, `;
        }
        return devices;
    }

    getFriendlyType(type){
        if(type == 1 ){
            return T.translate("Regular");
        }
        if(type == 2 ){
            return T.translate("Tutorial");
        }
    }


    getAuthorDisplayName(exercise){
        if(!exercise) return '';
        if(!exercise.author) return '';
        return `${exercise.author.first_name}, ${exercise.author.last_name} (${exercise.author.email})`;
    }

    toggleModalShare() {
        this.setState({ ...this.state,
            shareModalOpen: !this.state.shareModalOpen
        });
    }

    handleChangeSearchTerm(term) {
        this.props.getAllDevicesByPage(1, DEFAULT_PAGE_SIZE, term);
    }

    handleLinkItem(device){
        this.props.shareExercise(this.state.exerciseToShare, device).then(() => {
            this.setState({...this.state,
                exerciseToShare: null,
                shareModalOpen: false,
            });

            swal(
                T.translate('Shared!'),
                T.translate('Your exercise has been shared'),
                'success'
            );
        })
    }

    getDisplayName(exercise){
        return `${exercise.friendly_name}`;
    }

    shareExercise(exercise){
        this.setState({...this.state,
            exerciseToShare: exercise,
            shareModalOpen: true,
        });
    }

    render() {

        let {exercises, matchedDevices, currentUser} = this.props;

        return (
            <div className="animated fadeIn">
                <Modal isOpen={this.state.shareModalOpen}>
                    <ModalHeader toggle={this.toggleModalShare}>{T.translate("Share Exercise")}</ModalHeader>
                    <ModalBody>
                        <SearchBar
                            currentItems={matchedDevices}
                            searchPlaceHolder={T.translate("Search Devices")}
                            handleChangeSearchTerm={this.handleChangeSearchTerm}
                            getDisplayName={this.getDisplayName}
                            onClickPrimaryAction={this.handleLinkItem}
                            primaryActionClass="button-add"
                            primaryActionName={T.translate("Share exercise")}
                            useSecondaryAction={false}
                            searchId="exercise2Share"
                            getDisplayName={this.getDisplayName}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleModalShare}>{T.translate("Cancel")}</Button>
                    </ModalFooter>
                </Modal>
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
                                               onChange={this.handleOnChangeSearch}
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
                                                <th>{T.translate("Type")}</th>
                                                <th>{T.translate("Devices")}</th>
                                                <th>{T.translate("Author")}</th>
                                                <th>&nbsp;</th>
                                                <th>&nbsp;</th>
                                                <th>&nbsp;</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {exercises.map((exercise, i) => {
                                                let {author} = exercise;
                                                return (
                                                    <tr key={exercise.id}>
                                                        <td>{exercise.id}</td>
                                                        <td>{exercise.title}</td>
                                                        <td>{exercise.max_duration/60} {T.translate("Minutes")}</td>
                                                        <td>{this.getFriendlyType(exercise.type)}</td>
                                                        <td>{this.getDevices(exercise)}</td>
                                                        <td>{this.getAuthorDisplayName(exercise)}</td>
                                                        <td className="col-button">
                                                            {! exercise.is_shared &&
                                                            <Button color="primary"
                                                                    onClick={(e) => this.onClickEditExercise(e, exercise)}
                                                                    outline><i
                                                                className="fa fa-edit"></i>&nbsp;{T.translate("Edit")}
                                                            </Button>
                                                            }
                                                            {
                                                                exercise.is_shared &&
                                                                <Badge color="success">{T.translate("Shared")}</Badge>
                                                            }
                                                        </td>
                                                        <td className="col-button">
                                                            <Button color="danger"
                                                                    onClick={(e) => this.onClickDeleteExercise(e, exercise)}
                                                                    outline><i
                                                                className="fa fa-trash"></i>&nbsp;{T.translate("Delete")}
                                                            </Button>
                                                        </td>
                                                        <td className="col-button">
                                                            {author != null && currentUser.id == author.id &&
                                                            <Button color="warning"
                                                                    onClick={(e) => this.shareExercise(exercise)}
                                                                    outline><i
                                                                className="fa fa-share-alt"></i>&nbsp;{T.translate("Share")}
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

const mapStateToProps = ({adminExercisesState, loggedUserState}) => ({
    exercises: adminExercisesState.items,
    exercisesCount: adminExercisesState.count,
    matchedDevices: adminExercisesState.matchedDevices,
    currentUser : loggedUserState.currentUser,
});

export default connect(
    mapStateToProps,
    {
        getMyExercisesByPage,
        deleteExercise,
        getAllDevicesByPage,
        shareExercise,
    }
)(AdminExams);