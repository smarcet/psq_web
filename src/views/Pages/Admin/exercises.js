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


class AdminExams extends Component {
    render(){
        let exercises = [
            {
                id:1,
                title: 'Exercise #1',
                devices: 'Device#1, Device#2',
                author: "admin#1",
                takers: 400
            },
            {
                id:2,
                title: 'Exercise #2',
                devices: 'Device#3, Device#2',
                author: "admin#1",
                takers: 100
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
                                            <Input type="text" id="input1-group2" name="input1-group2" placeholder="Search Exercise"/>
                                        </InputGroup>
                                    </Col>
                                    <Col xs="4">
                                        <Button color="primary"><i className="fa fa-plus-circle"></i>{'\u00A0'} {T.translate("admin.exercises.AddExerciseButton")}</Button>
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
                                                <td>{exercise.takers}</td>
                                                <td>
                                                    <Button color="primary" outline><i className="fa fa-edit"></i>&nbsp;Edit</Button>{' '}
                                                    <Button color="danger" outline><i className="fa fa-trash"></i>&nbsp;Delete</Button>{' '}
                                                    <Button color="warning" outline><i className="fa fa-share-alt"></i>&nbsp;Share</Button>{' '}
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