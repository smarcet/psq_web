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

class UserExercises extends Component {

    onClickViewExam(e, exam){
        this.props.history.push(`/auth/user/exams/${exam.id}`);
        event.preventDefault();
    }

    render(){
        let exercises = [
            {
                id:1,
                title: 'Exercise #1',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                date : '2018-01-01',
                time: '10:00 AM',
                author: "Admin#1",
                available_devices: "Device#1, Device#2",
                takes: 0,
            },
            {
                id:2,
                title: 'Exercise #2',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                date : '2018-01-01',
                time: '10:00 AM',
                author: "Admin#1",
                available_devices: "Device#2",
                takes: 4,
            },
        ];
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> {T.translate("user.exercises.Title")}
                            </CardHeader>
                            <CardBody>
                                <Row className="search-container">
                                    <Col xs="12" sm="4" lg="4" >
                                        <Input type="text" className="input-search" id="input1-group2" name="input1-group2" placeholder="Search Exercise"/>
                                        <i className="fa fa-search filter-search"></i>
                                    </Col>
                                    <Col xs="12" sm="4" lg="3" >
                                        &nbsp;
                                    </Col>
                                </Row>
                                <Table responsive striped>
                                    <thead>
                                    <tr>
                                        <th>{T.translate("user.exercises.IdColTitle")}</th>
                                        <th>{T.translate("user.exercises.TitleColTitle")}</th>
                                        <th>{T.translate("user.exercises.DescColTitle")}</th>
                                        <th>{T.translate("user.exercises.AuthorColTitle")}</th>
                                        <th>{T.translate("user.exercises.DevicesColTitle")}</th>
                                        <th>{T.translate("user.exercises.TakesColTitle")}</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    { exercises.map((exercise ,i) => {

                                        return (
                                            <tr key={exercise.id}>
                                                <td>{exercise.id}</td>
                                                <td>{exercise.title}</td>
                                                <td>{exercise.desc}</td>
                                                <td>{exercise.author}</td>
                                                <td>{exercise.available_devices}</td>
                                                <td>
                                                    {
                                                        !exercise.takes &&
                                                        <Badge color="primary">new</Badge>
                                                    }

                                                    {
                                                        exercise.takes > 0 &&
                                                        <Badge color="success">Done {exercise.takes} times</Badge>
                                                    }
                                                </td>
                                                <td>
                                                    <Button onClick={(e) => this.onClickViewExam(e, exercise)} outline color="primary"><i className="fa fa-search"></i>&nbsp;{T.translate("user.exercises.viewButton")}</Button>
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

export default UserExercises;