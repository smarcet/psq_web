import React, {Component} from 'react';
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Button,
    Input
} from 'reactstrap';

import T from "i18n-react/dist/i18n-react";

import {connect} from 'react-redux'
import PaginationContainer from "../../Base/PaginationContainer/PaginationContainer";
import {DEFAULT_PAGE_SIZE} from "../../../constants";
import {geExamsByPage} from "../../../actions/Admin/exams-actions";

class AdminExercises extends Component {


    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        };
        this.onPageClick = this.onPageClick.bind(this);
        this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this);
    }

    componentWillMount() {
        this.props.geExamsByPage(this.state.currentPage);
    }

    handleOnChangeSearch(event) {
        let {value} = event.target;
        this.setState({...this.state, currentPage: 1});
        this.props.geExamsByPage(1, DEFAULT_PAGE_SIZE, value);
    }

    onPageClick(event, pageNumber) {
        this.setState({...this.state, currentPage: pageNumber});
        this.props.geExamsByPage(pageNumber);
        event.preventDefault();
    }

    onClickEvaluateExam(e, exam) {
        this.props.history.push(`/auth/admin/exams/${exam.id}/evaluate`);
        event.preventDefault();
    }

    render() {
        let {exams} = this.props;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> {T.translate("Exams")}
                            </CardHeader>
                            <CardBody>
                                {exams.length > 0 &&
                                    <Row className="search-container">
                                        <Col xs="12" sm="4" lg="4">
                                            <Input type="text"
                                                   className="input-search"
                                                   id="search_exams"
                                                   name="search_exams"
                                                   placeholder={T.translate("Search Exams")}
                                                   onChange={this.handleOnChangeSearch}/>
                                            <i className="fa fa-search filter-search"></i>
                                        </Col>
                                        <Col xs="12" sm="4" lg="3">
                                            &nbsp;
                                        </Col>
                                    </Row>
                                }
                                {
                                    exams.length == 0 &&
                                    <Row>
                                        <Col xs="12" sm="12" lg="12">
                                            <p>{T.translate("List is empty")}</p>
                                        </Col>
                                    </Row>
                                }
                                { exams.length > 0 &&
                                <Row>
                                    <Col xs="12" sm="12" lg="12">
                                        <Table responsive striped>
                                            <thead>
                                            <tr>
                                                <th>{T.translate("Id")}</th>
                                                <th>{T.translate("Title")}</th>
                                                <th>{T.translate("Device")}</th>
                                                <th>{T.translate("First Name")}</th>
                                                <th>{T.translate("Surname")}</th>
                                                <th>{T.translate("Date")}</th>
                                                <th>{T.translate("Time")}</th>
                                                <th>{T.translate("Evaluator")}</th>
                                                <th>{T.translate("Status")}</th>
                                                <th>{T.translate("Notes")}</th>
                                                <th>&nbsp;</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {exams.map((exam, i) => {
                                                let {taker, evaluator, exercise, device} = exam;
                                                return (
                                                    <tr key={exam.id}>
                                                        <td>{exam.id}</td>
                                                        <td>{exercise.title}</td>
                                                        <td>{device.friendly_name}</td>
                                                        <td>{taker.first_name}</td>
                                                        <td>{taker.last_name}</td>
                                                        <td>{exam.created}</td>
                                                        <td>{`${Math.floor(exam.duration / 60)}:${exam.duration % 60}`}</td>
                                                        <td>{evaluator != null ? evaluator.email : T.translate("N/A")}</td>
                                                        <td>
                                                            {
                                                                evaluator == null &&
                                                                <Badge
                                                                    color="secondary">{T.translate("Pending")}</Badge>
                                                            }
                                                            {
                                                                evaluator != null && !exam.approved &&
                                                                <Badge
                                                                    color="danger">{T.translate("Not Approved")}</Badge>
                                                            }
                                                            {
                                                                evaluator != null && exam.approved &&
                                                                <Badge color="success">{T.translate("Approved")}</Badge>
                                                            }
                                                        </td>
                                                        <td>{exam.notes}</td>
                                                        <td>
                                                            {evaluator == null &&
                                                            <Button color="warning"
                                                                    onClick={(e) => this.onClickEvaluateExam(e, exam)}
                                                                    outline><i
                                                                className="fa fa-pencil"></i>&nbsp;{T.translate("Evaluate")}
                                                            </Button>
                                                            }
                                                        </td>
                                                    </tr>
                                                );
                                            })}

                                            </tbody>
                                        </Table>
                                        <PaginationContainer
                                            count={this.props.examsCount}
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

const mapStateToProps = ({adminExamsState}) => ({
    exams: adminExamsState.items,
    examsCount: adminExamsState.count,
});

export default connect(
    mapStateToProps,
    {
        geExamsByPage,
    }
)(AdminExercises);
