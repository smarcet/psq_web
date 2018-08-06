import React, {Component} from 'react';
import {
    Row,
    Col,
    Button,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Badge

} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";


class UserViewExam extends Component {

    onClickBack(e){
        this.props.history.push('/auth/user/exams');
        event.preventDefault();
    }

    render(){
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>{T.translate("View Exam")}</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Taker First Name</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="fname-input" name="fname-input" readOnly={true} value="Jose"/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Taker Surname</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="lname-input" name="lname-input" readOnly={true} value="Perez"/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="email-input">Taker Email</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="email" id="email-input" name="email-input" readOnly={true} value="jperez@gmail.com"/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="email-input">Time Used</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="email" id="email-input" name="email-input" readOnly={true} value="10:00"/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="email-input">Video</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <img className="video-thumbnail" src="/img/video_thumbnail_generic.png" title="play it"/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="email-input">Evaluator</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="email" id="email-input" name="email-input" readOnly={true} value="Admin#1"/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="textarea-input">Notes</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                                                   value={"Not approved :("} readOnly={true} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="email-input">Status</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Badge color="danger">Not Approved</Badge>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button onClick={(e) => this.onClickBack(e)} type="submit" size="sm" color="primary">
                                    <i className="fa fa-dot-circle-o"></i>&nbsp;Back
                                </Button>{' '}

                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UserViewExam;