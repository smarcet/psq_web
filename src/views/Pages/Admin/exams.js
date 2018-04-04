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

class AdminExercises extends Component {
    render(){
        let exams = [
            {
                id:1,
                exercise_title: 'Exercise #1',
                taker_fname: 'John',
                taker_lname: 'Doe',
                date : '2018-01-01',
                time: '10:00 AM',
                evaluator: 'Admin#1',
                evaluated: true,
                approved: false,
                notes: 'not approved :('
            },
            {
                id:2,
                exercise_title: 'Exercise #1',
                taker_fname: 'John',
                taker_lname: 'Doe',
                date : '2018-01-01',
                time: '11:00 AM',
                evaluator: 'N/A',
                evaluated: false,
                approved: false,
                notes: ''
            },
        ];
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> {T.translate("admin.exams.Title")}
                            </CardHeader>
                            <CardBody>
                                <Row style={{marginBottom:'10px'}}>
                                    <Col xs="4">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <Button type="button" color="primary"><i className="fa fa-search"></i> Search</Button>
                                            </InputGroupAddon>
                                            <Input type="text" id="input1-group2" name="input1-group2" placeholder="Search Exam"/>
                                        </InputGroup>
                                    </Col>
                                    <Col xs="4">

                                    </Col>
                                </Row>
                                <Table responsive striped>
                                    <thead>
                                    <tr>
                                        <th>{T.translate("admin.exams.IdColTitle")}</th>
                                        <th>{T.translate("admin.exams.ExerciseColTitle")}</th>
                                        <th>{T.translate("admin.exams.TakerFirstNameColTitle")}</th>
                                        <th>{T.translate("admin.exams.TakerLastNameColTitle")}</th>
                                        <th>{T.translate("admin.exams.DateColTitle")}</th>
                                        <th>{T.translate("admin.exams.TimeColTitle")}</th>
                                        <th>{T.translate("admin.exams.EvaluatorColTitle")}</th>
                                        <th>{T.translate("admin.exams.EvaluationStatusColTitle")}</th>
                                        <th>{T.translate("admin.exams.NotesColTitle")}</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    { exams.map((exam ,i) => {

                                        return (
                                            <tr key={exam.id}>
                                                <td>{exam.id}</td>
                                                <td>{exam.exercise_title}</td>
                                                <td>{exam.taker_fname}</td>
                                                <td>{exam.taker_lname}</td>
                                                <td>{exam.date}</td>
                                                <td>{exam.time}</td>
                                                <td>{exam.evaluator}</td>
                                                <td>
                                                    {
                                                        !exam.evaluated &&
                                                        <Badge color="secondary">Pending</Badge>
                                                    }
                                                    {
                                                        exam.evaluated && !exam.approved &&
                                                        <Badge color="danger">Not Approved</Badge>
                                                    }
                                                    {
                                                        exam.evaluated && exam.approved &&
                                                        <Badge color="success">Approved</Badge>
                                                    }
                                                </td>
                                                <td>{exam.notes}</td>
                                                <td>
                                                    { !exam.evaluated &&
                                                    <Button color="warning"><i className="fa fa-pencil"></i>&nbsp;Evaluate</Button>
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

export default AdminExercises;