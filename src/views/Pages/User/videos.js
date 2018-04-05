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
    Input,
    ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Media
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";

class UserVideos extends Component {
    render(){
        let videos = [
            {
                id:1,
                title: 'Exercise #1',
                own: true,
                author: 'Juan Gomez',
                date : '2018-01-01',
                time: '10:00 AM',
                views: 10
            },
            {
                id:2,
                title: 'Exercise #1',
                own: false,
                author: 'Jose Martinez',
                date : '2018-01-02',
                time: '12:30 PM',
                views: 50
            },

        ];
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> {T.translate("user.videos.Title")}
                            </CardHeader>
                            <CardBody>
                                <Row style={{marginBottom:'10px'}}>
                                    <Col xs="4">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <Button type="button" color="primary"><i className="fa fa-search"></i> Search</Button>
                                            </InputGroupAddon>
                                            <Input type="text" id="input1-group2" name="input1-group2" placeholder="Search Video"/>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row style={{marginBottom:'10px'}}>
                                    <Col lg="12">
                                        <ListGroup>
                                            { videos.map((video ,i) => {

                                                return (
                                                    <ListGroupItem key={i} className="justify-content-between">
                                                        <Row>
                                                            <Col lg="10">
                                                                <Media>
                                                                    <Media left href="#">
                                                                        <Media title="Play it" className="video-thumbnail" object src="/img/video_thumbnail_generic.png" alt={video.title} />
                                                                    </Media>
                                                                    <Media body>
                                                                        <Media heading>
                                                                            {video.title} - {video.date}&nbsp;<Badge pill title="views" color="info">{video.views}</Badge>
                                                                        </Media>
                                                                        {!video.own && <Badge color="success">Shared By</Badge>}
                                                                        &nbsp;{video.author}
                                                                    </Media>
                                                                </Media>
                                                            </Col>
                                                            <Col lg="2">
                                                                {video.own &&
                                                                    <Button outline color="primary" className="float-right"><i
                                                                        className="fa fa-share"></i>&nbsp;share</Button>
                                                                }
                                                            </Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                );
                                            })}
                                        </ListGroup>
                                    </Col>
                                </Row>
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

export default UserVideos;