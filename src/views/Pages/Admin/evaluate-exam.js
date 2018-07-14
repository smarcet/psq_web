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
import { connect } from 'react-redux'
import {getExamById, } from "../../../actions/Admin/exams-actions";

class AdmimEvaluateExam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentEditExam: this.props.currentEditExam,
        };
    }

    componentWillMount() {
        let exam_id = this.props.match.params.exam_id;
        if (typeof exam_id != 'undefined' && exam_id > 0) {
            this.props.getExamById(exam_id);
            return;
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...this.state,
            currentEditExam: {
                ...nextProps.currentEditExam
            }
        });
    }

    onClickApprove(event){

        swal({
            title: T.translate('Are you sure?'),
            text:  T.translate('You will not be able to recover this exam!'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonText:  T.translate('Yes, Approve it!'),
            cancelButtonText:  T.translate('No')
        }).then((result) => {
            if (result.value) {
                swal(
                    T.translate('Approved!'),
                    T.translate('Exam has been Approved.'),
                    'success'
                );
                this.props.history.push("/auth/admin/exams");
            }
        })
        event.preventDefault();
    }

    onClickReject(event){

        swal({
            title: T.translate('Are you sure?'),
            text:  T.translate('You will not be able to recover this exam!'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: T.translate( 'Yes, Reject it!'),
            cancelButtonText:  T.translate('No')
        }).then((result) => {
            if (result.value) {
                swal(
                    T.translate('Rejected!'),
                    T.translate('Exam has been rejected.'),
                    'success'
                )
                this.props.history.push("/auth/admin/exams");
            }
        })
        event.preventDefault();
    }

    render(){
        let { currentEditExam } = this.state;
        if(currentEditExam == null || currentEditExam.id == 0) return null;
        let {taker, exercise, device, videos } = currentEditExam;
        if(taker == null) return null;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>{T.translate('Evaluate Exam')}</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="taker_first_name">{T.translate('Taker First Name')}</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="taker_first_name" name="taker_first_name" readOnly={true} value={taker.first_name}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="taker_last_name">{T.translate('Taker Surname')}</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="taker_last_name" name="taker_last_name" readOnly={true} value={taker.last_name}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="taker_email">{T.translate('Taker Email')}</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="email" id="taker_email" name="taker_email" readOnly={true} value={taker.email}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="duration">{T.translate('Time Used')}</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="duration" name="duration" readOnly={true} value={`${Math.floor(currentEditExam.duration/60)}:${currentEditExam.duration % 60}`}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="email-input">{T.translate('Video')}</Label>
                                        </Col>
                                        <Col xs="12" md="9" xs="12">
                                           <video className="rounded img-fluid mx-auto d-block" controls src={videos[0].video_url}>
                                           </video>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="notes">{T.translate('Notes')}</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="textarea" name="notes" id="notes" rows="9"
                                                   placeholder="Notes..."/>
                                        </Col>
                                    </FormGroup>

                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button onClick={(e) => this.onClickApprove(e)} type="submit" size="sm" color="primary">
                                    <i className="fa fa-dot-circle-o"></i>&nbsp;{T.translate('Approve')}
                                </Button>{' '}
                                <Button onClick={(e) => this.onClickReject(e)} type="reset" size="sm" color="danger">
                                    <i className="fa fa-ban"></i>&nbsp;{T.translate('Reject')}</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}


const mapStateToProps = ({ adminExamState }) => ({
    currentEditExam : adminExamState.currentEditExam,
});

export default connect (
    mapStateToProps,
    {
        getExamById,
    }
)(AdmimEvaluateExam);
