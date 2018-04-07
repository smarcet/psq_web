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

class UserExams extends Component {

    onClickViewExam(e, exam){
        this.props.history.push(`/auth/user/exams/${exam.id}`);
        event.preventDefault();
    }

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
                                <i className="fa fa-align-justify"></i> {T.translate("user.exams.Title")}
                            </CardHeader>
                            <CardBody>
                                <Row className="search-container">
                                    <Col xs="12" sm="4" lg="4" >
                                        <Input type="text" className="input-search" id="input1-group2" name="input1-group2" placeholder="Search Exam"/>
                                        <i className="fa fa-search filter-search"></i>
                                    </Col>
                                    <Col xs="12" sm="4" lg="3" >
                                        &nbsp;
                                    </Col>
                                </Row>
                                <Table responsive striped>
                                    <thead>
                                    <tr>
                                        <th>{T.translate("user.exams.IdColTitle")}</th>
                                        <th>{T.translate("user.exams.ExerciseColTitle")}</th>
                                        <th>{T.translate("user.exams.DateColTitle")}</th>
                                        <th>{T.translate("user.exams.TimeColTitle")}</th>
                                        <th>{T.translate("user.exams.EvaluatorColTitle")}</th>
                                        <th>{T.translate("user.exams.EvaluationStatusColTitle")}</th>
                                        <th>{T.translate("user.exams.NotesColTitle")}</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    { exams.map((exam ,i) => {

                                        return (
                                            <tr key={exam.id}>
                                                <td>{exam.id}</td>
                                                <td>{exam.exercise_title}</td>
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
                                                    <Button onClick={(e) => this.onClickViewExam(e, exam)} outline color="primary"><i className="fa fa-search"></i>&nbsp;{T.translate("user.exams.viewButton")}</Button>
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

export default UserExams;