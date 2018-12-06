import React, {Component} from 'react';
import {
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
import 'sweetalert2/dist/sweetalert2.css';
import swal from 'sweetalert2';
import {connect} from "react-redux";
import {getNewsByPage, deleteNews} from "../../../actions/Admin/news-actions";
import {DEFAULT_PAGE_SIZE} from "../../../constants";
import PaginationContainer from "../../Base/PaginationContainer/PaginationContainer";

class AdminNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        };
        this.onPageClick = this.onPageClick.bind(this);
        this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this);
    }

    componentWillMount() {
        this.props.getNewsByPage(this.state.currentPage);
    }

    handleOnChangeSearch(event) {
        let {value} = event.target;
        this.setState({...this.state, currentPage: 1});
        this.props.getNewsByPage(1, DEFAULT_PAGE_SIZE, value);
    }

    onPageClick(event, pageNumber) {
        this.setState({...this.state, currentPage: pageNumber});
        this.props.getNewsByPage(pageNumber);
        event.preventDefault();
    }

    onClickDeleteNewsItem(event, newsItem) {

        swal({
            title: T.translate("Are you sure?"),
            text: T.translate("You will not be able to recover this news item!"),
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: T.translate('Yes, delete it!'),
            cancelButtonText: T.translate('No, keep it')
        }).then((result) => {

            if (result.value) {
                this.props.deleteNews(newsItem).then(() => {
                    swal(
                        T.translate("Deleted!"),
                        T.translate("Your news item has been deleted"),
                        'success'
                    )
                });
            }
        })
        event.preventDefault();
    }

    onClickEditNewsItem(event, newsItem) {
        this.props.history.push(`/auth/admin/news/${newsItem.id}`);
        event.preventDefault();
    }

    onClickAddNews(event) {
        this.props.history.push(`/auth/admin/news/new`);
        event.preventDefault();
    }

    render() {

        let {news, newsCount} = this.props;

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> {T.translate("News")}
                            </CardHeader>
                            <CardBody>
                                <Row className="search-container">
                                    <Col xs="12" sm="4" lg="4">
                                        <Input type="text"
                                               className="input-search"
                                               id="search_news"
                                               name="search_news"
                                               onChange={this.handleOnChangeSearch}
                                               placeholder={T.translate("Search News")}/>
                                        <i className="fa fa-search filter-search"></i>
                                    </Col>
                                    <Col xs="12" sm="4" lg="3">
                                        <Button onClick={(e) => this.onClickAddNews(e)} className="button-add"
                                                color="primary">
                                            <i className="fa fa-plus-circle"></i>{'\u00A0'} {T.translate("Add News")}
                                        </Button>
                                    </Col>
                                </Row>
                                {
                                    news.length == 0 &&
                                    <Row>
                                        <Col xs="12" sm="12" lg="12">
                                            <p>{T.translate("List is empty")}</p>
                                        </Col>
                                    </Row>
                                }
                                { news.length > 0 &&
                                <Row>
                                    <Col xs="12" sm="12" lg="12">
                                        <Table responsive striped>
                                            <thead>
                                            <tr>
                                                <th>{T.translate("Id")}</th>
                                                <th>{T.translate("Title")}</th>
                                                <th>{T.translate("Body")}</th>
                                                <th>{T.translate("Created Date")}</th>
                                                <th>&nbsp;</th>
                                                <th>&nbsp;</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {news.map((news_item, i) => {

                                                return (
                                                    <tr key={news_item.id}>
                                                        <td>{news_item.id}</td>
                                                        <td>{news_item.title}</td>
                                                        <td>{news_item.body}</td>
                                                        <td>{news_item.created}</td>
                                                        <td className="col-button">
                                                            <Button color="primary"
                                                                    onClick={(e) => this.onClickEditNewsItem(e, news_item)}
                                                                    outline><i
                                                                className="fa fa-edit"></i>&nbsp;{T.translate("Edit")}
                                                            </Button>
                                                        </td>
                                                        <td className="col-button">
                                                            <Button color="danger"
                                                                    onClick={(e) => this.onClickDeleteNewsItem(e, news_item)}
                                                                    outline><i
                                                                className="fa fa-trash"></i>&nbsp;{T.translate("Delete")}
                                                            </Button>
                                                        </td>

                                                    </tr>
                                                );
                                            })}

                                            </tbody>
                                        </Table>
                                        <PaginationContainer
                                            count={newsCount}
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

const mapStateToProps = ({adminNewsState, loggedUserState}) => ({
    news: adminNewsState.items,
    newsCount: adminNewsState.count,
    currentUser: loggedUserState.currentUser,
});

export default connect(
    mapStateToProps,
    {
        getNewsByPage,
        deleteNews,
    }
)(AdminNews);