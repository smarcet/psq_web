import React, {Component} from 'react';
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import T from 'i18n-react';
import {connect} from 'react-redux'
import {getTopNews} from "../../../actions/User/news-actions";


class UserNews extends Component {

    componentWillMount() {
        this.props.getTopNews(10);
    }

    render(){
        let {news} = this.props;

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> {T.translate("News")}
                            </CardHeader>
                            <CardBody>
                                <ListGroup>
                                    { news.map((news_item ,i) => {

                                        return (
                                        <ListGroupItem key={i} className="justify-content-between">
                                            <p>
                                                <b>{news_item.title}</b>&nbsp;<Badge color="success">{new Date(news_item.created).toLocaleString()}</Badge>
                                            </p>
                                            <hr></hr>
                                            <p>{news_item.body}</p>
                                        </ListGroupItem>
                                        );
                                    })}
                                </ListGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>);
    }
}



const mapStateToProps = ({userNewsState}) => ({
    news: userNewsState.items,
    newsCount: userNewsState.count,
});

export default connect(
    mapStateToProps,
    {
        getTopNews,
    }
)(UserNews);