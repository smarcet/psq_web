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
    Input
} from 'reactstrap';
import T from 'i18n-react';
import {connect} from 'react-redux'
import {DEFAULT_PAGE_SIZE} from "../../../constants";
import {getMyExamsByPage} from "../../../actions/User/exams-actions";
import PaginationContainer from "../../Base/PaginationContainer/PaginationContainer";


class UserExams extends Component {


    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        };
        this.onPageClick = this.onPageClick.bind(this);
        this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this);
    }

    componentWillMount() {
        this.props.getMyExamsByPage(this.state.currentPage);
    }

    handleOnChangeSearch(event) {
        let {value} = event.target;
        this.setState({...this.state, currentPage: 1});
        this.props.getMyExamsByPage(1, DEFAULT_PAGE_SIZE, value);
    }

    onPageClick(event, pageNumber) {
        this.setState({...this.state, currentPage: pageNumber});
        this.props.getMyExamsByPage(pageNumber);
        event.preventDefault();
    }

    onClickViewExam(event, exam) {
        this.props.history.push(`/auth/user/exams/${exam.id}`);
        event.preventDefault();
    }

    getEvaluator(exam){
        let {evaluator} = exam;
        if(evaluator == null) return T.translate("N/A");
        return `${evaluator.first_name} ${evaluator.last_name}`;
    }

    getDuration(exam){
        let {evaluator} = exam;
        if(evaluator == null) return T.translate("N/A");
        return `${evaluator.first_name} ${evaluator.last_name}`;
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
                                <Row className="search-container">
                                    <Col xs="12" sm="4" lg="4">
                                        <Input type="text" className="input-search" id="exams-search"
                                               onChange={this.handleOnChangeSearch}
                                               name="exams-search" placeholder={T.translate("Search Exams")}/>
                                        <i className="fa fa-search filter-search"></i>
                                    </Col>
                                    <Col xs="12" sm="4" lg="3">
                                    </Col>
                                </Row>

                                {

                                    exams.length == 0 &&
                                    <Row>
                                        <Col xs="12" sm="12" lg="12">
                                            <p>{T.translate("List is empty")}</p>
                                        </Col>
                                    </Row>
                                }

                                {exams.length > 0 &&

                                <Row>
                                    <Col xs="12" sm="12" lg="12">

                                        <Table responsive striped>
                                            <thead>
                                            <tr>
                                                <th>{T.translate("Id")}</th>
                                                <th>{T.translate("Title")}</th>
                                                <th>{T.translate("Created")}</th>
                                                <th>{T.translate("Duration")}</th>
                                                <th>{T.translate("Evaluator")}</th>
                                                <th>{T.translate("Status")}</th>
                                                <th>{T.translate("Notes")}</th>
                                                <th>&nbsp;</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {exams.map((exam, i) => {
                                                let {exercise} = exam;
                                                return (
                                                    <tr key={exam.id}>
                                                        <td>{exam.id}</td>
                                                        <td>{exercise.title}</td>
                                                        <td>{new Date(exam.created).toLocaleString()}</td>
                                                        <td>{`${Math.floor(exam.duration / 60)}:${exam.duration % 60}`}</td>
                                                        <td>{this.getEvaluator(exam)}</td>
                                                        <td>
                                                            {
                                                                !exam.evaluator &&
                                                                <Badge color="secondary">Pending</Badge>
                                                            }
                                                            {
                                                                exam.evaluator && !exam.approved &&
                                                                <Badge color="danger">Not Approved</Badge>
                                                            }
                                                            {
                                                                exam.evaluator && exam.approved &&
                                                                <Badge color="success">Approved</Badge>
                                                            }
                                                        </td>
                                                        <td>{exam.notes}</td>
                                                        <td>
                                                            <Button onClick={(e) => this.onClickViewExam(e, exam)}
                                                                    outline color="primary"><i
                                                                className="fa fa-search"></i>&nbsp;{T.translate("View")}
                                                            </Button>
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


const mapStateToProps = ({userExamsState}) => ({
    exams: userExamsState.items,
    examsCount: userExamsState.count,
});

export default connect(
    mapStateToProps,
    {
        getMyExamsByPage,
    }
)(UserExams);