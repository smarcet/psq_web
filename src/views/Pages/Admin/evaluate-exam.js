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

} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import 'sweetalert2/dist/sweetalert2.css';
import swal from 'sweetalert2';

class AdmimEvaluateExam extends Component {

    onClickApprove(event){

        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this exam!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Approve it!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                swal(
                    'Approved!',
                    'Exam has been Approved.',
                    'success'
                );
                this.props.history.push("/auth/admin/exams");
            }
        })
        event.preventDefault();
    }

    onClickReject(event){

        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this exam!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Reject it!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                swal(
                    'Rejected!',
                    'Exam has been rejected.',
                    'success'
                )
                this.props.history.push("/auth/admin/exams");
            }
        })
        event.preventDefault();
    }

    render(){
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Evaluate Exam</strong>
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
                                        <Col xs="12" md="9" xs="12">
                                           <img  className="video-thumbnail" src="/img/video_thumbnail_generic.png" title="play it"/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="textarea-input">Notes</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                                                   placeholder="Notes..."/>
                                        </Col>
                                    </FormGroup>

                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button onClick={(e) => this.onClickApprove(e)} type="submit" size="sm" color="primary">
                                    <i className="fa fa-dot-circle-o"></i>&nbsp;Approve
                                </Button>{' '}
                                <Button onClick={(e) => this.onClickReject(e)} type="reset" size="sm" color="danger">
                                    <i className="fa fa-ban"></i>&nbsp;Reject</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AdmimEvaluateExam;