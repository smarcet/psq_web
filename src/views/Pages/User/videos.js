import React, {Component} from 'react';
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button,
    Input,
    ListGroup, ListGroupItem
} from 'reactstrap';

import T from 'i18n-react';
import {connect} from 'react-redux'
import {DEFAULT_PAGE_SIZE} from "../../../constants";
import {getVideosByPage} from "../../../actions/User/videos-actions";
import PaginationContainer from "../../Base/PaginationContainer/PaginationContainer";


class UserVideos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        };
        this.onPageClick = this.onPageClick.bind(this);
        this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this);
    }

    componentWillMount() {
        this.props.getVideosByPage(this.state.currentPage);
    }

    handleOnChangeSearch(event) {
        let {value} = event.target;
        this.setState({...this.state, currentPage: 1});
        this.props.getVideosByPage(1, DEFAULT_PAGE_SIZE, value);
    }

    onPageClick(event, pageNumber) {
        this.setState({...this.state, currentPage: pageNumber});
        this.props.getVideosByPage(pageNumber);
        event.preventDefault();
    }


    render(){
        let {videos, currentUser} = this.props;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> {T.translate("Video Library")}
                            </CardHeader>
                            <CardBody>
                                <Row className="search-container">
                                    <Col xs="12" sm="4" lg="4">
                                        <Input type="text" className="input-search" id="video-search"
                                               onChange={this.handleOnChangeSearch}
                                               name="vudei-search" placeholder={T.translate("Search Video Library")}/>
                                        <i className="fa fa-search filter-search"></i>
                                    </Col>
                                    <Col xs="12" sm="4" lg="3">
                                    </Col>
                                </Row>
                                <Row style={{marginBottom:'10px'}}>
                                    <Col lg="12">
                                        <ListGroup>
                                            { videos.map((video ,i) => {
                                                let { taker, exercise } = video;
                                                let videos_inner = video.videos;
                                                return (
                                                    <ListGroupItem key={i} className="justify-content-between">
                                                        <Row>
                                                            <Col xs="12" lg="10">
                                                                <Row>
                                                                    <Col xs="12" lg="4">
                                                                        <video className="rounded img-fluid mx-auto d-block" controls>
                                                                            { videos_inner.map((video_inner, idx) =>
                                                                                <source src={video_inner.video_url} key={idx} type={video_inner.type}></source>
                                                                            )}
                                                                        </video>
                                                                    </Col>
                                                                    <Col xs="12" lg="12">
                                                                        <b>{T.translate("Title")}</b>:{exercise.title}&nbsp;<Badge pill title="views" color="info">{video.video_views}</Badge>
                                                                    </Col>
                                                                    <Col xs="12" lg="12">
                                                                       {taker.id != currentUser.id && <Badge color="success">Shared By</Badge> }
                                                                       {taker.id == currentUser.id && ' '  }
                                                                        <b>{T.translate("Author")}</b>: {taker.first_name} {taker.last_name}
                                                                    </Col>
                                                                    <Col xs="12" lg="12">
                                                                        <b>{T.translate("Created")}</b>: {video.created}
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col xs="12" lg="2">
                                                                {taker.id == currentUser.id&&
                                                                    <Button outline color="primary"><i
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
                                <PaginationContainer
                                    count={this.props.videosCount}
                                    pageSize={DEFAULT_PAGE_SIZE}
                                    currentPage={this.state.currentPage}
                                    onPageClick={this.onPageClick}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>);
    }
}


const mapStateToProps = ({userVideosState, loggedUserState}) => ({
    videos: userVideosState.items,
    videosCount: userVideosState.count,
    currentUser: loggedUserState.currentUser
});

export default connect(
    mapStateToProps,
    {
        getVideosByPage,
    }
)(UserVideos);