import React, {Component} from 'react';
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    InputGroup,
    InputGroupAddon,
    Input
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import 'sweetalert2/dist/sweetalert2.css';
import swal from 'sweetalert2';

class AdminExams extends Component {

    onClickAddNewExercise(e){
        this.props.history.push("/auth/admin/exercises/new");
    }

    onClickDeleteExercise(event, exercise){

        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this exercise!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                swal(
                    'Deleted!',
                    'Your exercise has been deleted.',
                    'success'
                )
            }
        })
        event.preventDefault();
    }

    onClickEditExercise(event, exercise){
        this.props.history.push(`/auth/admin/exercises/${exercise.id}`);
        event.preventDefault();
    }

    onClickShareExercise(event, exercise){
        event.preventDefault();
    }

    render(){

        let exercises = [
            {
                id:1,
                title: 'Exercise #1',
                devices: 'Device#1, Device#2',
                author: "admin#1",
                takers: 100,
                type: 1,
            },
            {
                id:2,
                title: 'Exercise #2',
                devices: 'Device#3, Device#2',
                author: "admin#1",
                takers: 5,
                type: 1,
            },
            {
                id:3,
                title: 'Tutorial #1',
                devices: 'Device#1, Device#2',
                author: "admin#1",
                takers: 0,
                type: 2,
            },
        ];

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> {T.translate("admin.exercises.Title")}
                            </CardHeader>
                            <CardBody>
                                <Row className="search-container">
                                    <Col xs="12" sm="4" lg="4" >
                                        <Input type="text" className="input-search" id="input1-group2" name="input1-group2" placeholder="Search Exercise"/>
                                        <i className="fa fa-search filter-search"></i>
                                    </Col>
                                    <Col xs="12" sm="4" lg="3" >
                                        <Button onClick={(e) => this.onClickAddNewExercise(e)} className="button-add" color="primary">
                                            <i className="fa fa-plus-circle"></i>{'\u00A0'} Add Exercise
                                        </Button>
                                    </Col>
                                </Row>
                                <Table responsive striped>
                                    <thead>
                                    <tr>
                                        <th>{T.translate("admin.exercises.IdColTitle")}</th>
                                        <th>{T.translate("admin.exercises.TitleColTitle")}</th>
                                        <th>{T.translate("admin.exercises.DevicesColTitle")}</th>
                                        <th>{T.translate("admin.exercises.CreatorColTitle")}</th>
                                        <th>{T.translate("admin.exercises.TakersColTitle")}</th>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    { exercises.map((exercise ,i) => {

                                        return (
                                            <tr key={exercise.id}>
                                                <td>{exercise.id}</td>
                                                <td>{exercise.title}</td>
                                                <td>{exercise.devices}</td>
                                                <td>{exercise.author}</td>
                                                <td>
                                                    {exercise.type == 1 && exercise.takers}
                                                    {exercise.type == 2 && 'N/A'}
                                               </td>
                                                <td className="col-button">
                                                    <Button color="primary" onClick={(e) => this.onClickEditExercise(e, exercise)}outline><i className="fa fa-edit"></i>&nbsp;Edit</Button>
                                                </td>
                                                <td className="col-button">
                                                    <Button color="danger" onClick={(e) => this.onClickDeleteExercise(e, exercise)} outline><i className="fa fa-trash"></i>&nbsp;Delete</Button>
                                                </td>
                                                <td className="col-button">
                                                    <Button color="warning" onClick={(e) => this.onClickShareExercise(e, exercise)}outline><i className="fa fa-share-alt"></i>&nbsp;Share</Button>
                                                </td>
                                                <td className="col-button">
                                                    {exercise.type == 2 &&
                                                    <Button color="primary"
                                                            onClick={(e) => this.onClickCreateExercise(e, exercise)}
                                                            outline><i className="fa fa-copy"></i>&nbsp;Create
                                                        Exercise</Button>
                                                    }
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    </tbody>
                                </Table>
                                <Pagination>
                                    <PaginationItem disabled><PaginationLink previous href="#">Prev</PaginationLink></PaginationItem>
                                    <PaginationItem active>
                                        <PaginationLink href="#">1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink href="#">4</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink next href="#">Next</PaginationLink></PaginationItem>
                                </Pagination>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>);
    }
}

export default AdminExams;