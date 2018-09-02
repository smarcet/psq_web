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
import T from "i18n-react";
import {connect} from 'react-redux'
import {getExamById} from '../../../actions/User/exams-actions';


class UserViewExam extends Component {

    onClickBack(e){
        this.props.history.push('/auth/user/exams');
        event.preventDefault();
    }

    componentWillMount() {
        let examId = this.props.match.params.exam_id;
        this.props.getExamById(examId);
    }

    niceDuration(seconds){
        let remainingSeconds = seconds % 60;
        let strRemainingSeconds = remainingSeconds < 10 ? '0'+remainingSeconds: remainingSeconds;
        return `${Math.floor(seconds / 60)}:${strRemainingSeconds}`
    }

    render(){
        let {currentExam} = this.props;
        if(currentExam == null) return null;
        let {taker, exercise, evaluator, videos} = currentExam;
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
                                            <Label htmlFor="first_name">{T.translate("Taker First Name")}</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="first_name" name="first_name" readOnly={true} value={taker.first_name}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="last_name">{T.translate("Taker Surname")}</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="last_name" name="last_name" readOnly={true} value={taker.last_name}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="email">{T.translate("Taker Email")}</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="email" id="email" name="email" readOnly={true} value={taker.email}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="duration">{T.translate("Time Consumed")}</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="duration" name="duration" readOnly={true} value={this.niceDuration(currentExam.duration)}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label>{T.translate("Video")}</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <video className="rounded img-fluid mx-auto d-block"
                                                   controls>
                                                {videos.map((video, idx) =>
                                                    <source src={video.video_url} key={idx}
                                                            type={video.type}></source>
                                                )}
                                            </video>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="evaluator">{T.translate("Evaluator")}</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            { evaluator == null &&
                                                <Label>{T.translate("N/A")}</Label>
                                            }
                                            { evaluator &&
                                                <Input type="text" id="evaluator" name="evaluator" readOnly={true}
                                                       value={`${evaluator.first_name}  ${evaluator.last_name}`}/>
                                            }
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="notes">{T.translate("Notes")}</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="textarea" name="notes" id="notes" rows="9"
                                                   value={currentExam.notes} readOnly={true} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="status">{T.translate("Status")}</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            {
                                                evaluator == null &&
                                                <Badge
                                                    color="secondary">{T.translate("Pending")}</Badge>
                                            }
                                            {
                                                evaluator != null && !currentExam.approved &&
                                                <Badge
                                                    color="danger">{T.translate("Not Approved")}</Badge>
                                            }
                                            {
                                                evaluator != null && currentExam.approved &&
                                                <Badge color="success">{T.translate("Approved")}</Badge>
                                            }
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button onClick={(e) => this.onClickBack(e)} type="submit" size="sm" color="primary">
                                    <i className="fa fa-dot-circle-o"></i>&nbsp;{T.translate("Back")}
                                </Button>{' '}
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({userExamViewState}) => ({
    currentExam: userExamViewState.currentExam,
});

export default connect(
    mapStateToProps,
    {
        getExamById,
    }
)(UserViewExam);