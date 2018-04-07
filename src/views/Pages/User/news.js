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
import T from "i18n-react/dist/i18n-react";

class UserNews extends Component {
    render(){
        let news = [
            {
                id:1,
                title: 'News #1',
                desc: 'Lorep ip sum',
                date: "01/01/2018 10:00 AM",
                views:3

            },
            {
                id:2,
                title: 'News #2',
                desc: 'Lorep ip sum',
                date: "01/01/2018 10:30 AM",
                views:5
            },
        ];
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> {T.translate("user.news.Title")}
                            </CardHeader>
                            <CardBody>
                                <ListGroup>
                                    { news.map((news_item ,i) => {

                                        return (
                                        <ListGroupItem key={i} className="justify-content-between">
                                            {news_item.title}
                                            <Badge className="float-right" pill>{news_item.views}</Badge>
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

export default UserNews;