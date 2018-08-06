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
    ListGroup,
    ListGroupItem,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import SearchBar from "../components/SearchBar/SearchBar";
import T from 'i18n-react';
import {DEFAULT_PAGE_SIZE} from "../constants";
import PaginationContainer from "../views/Base/PaginationContainer/PaginationContainer";
import 'sweetalert2/dist/sweetalert2.css';
import swal from 'sweetalert2';


class VideoLibrary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            shareModalOpen: false,
            videoToShare: null,
        };
        this.onPageClick = this.onPageClick.bind(this);
        this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this);
        this.toggleModalShare = this.toggleModalShare.bind(this);
        this.handleChangeSearchTerm = this.handleChangeSearchTerm.bind(this);
        this.handleLinkItem = this.handleLinkItem.bind(this);
        this.getDisplayName = this.getDisplayName.bind(this);
        this.shareVideo = this.shareVideo.bind(this);
    }

    componentWillMount() {
        this.props.getVideosByPage(this.state.currentPage);
    }

    componentDidMount(){
        this.addEventHandlers();
    }

    addEventHandlers(){
        let videos = document.getElementsByTagName("video");
        let _this = this;
        for(var i = 0 ; i < videos.length ; i++){
            videos[i].addEventListener("play", function(event) {
                _this.props.addVideoView(parseInt(event.target.dataset.videoId));
            }, true);
        }
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

    shareVideo(video){
        this.setState({...this.state,
            videoToShare: video,
            shareModalOpen: true,
        });
    }

    toggleModalShare() {
        this.setState({ ...this.state,
            shareModalOpen: !this.state.shareModalOpen
        });
    }

    handleChangeSearchTerm(term) {
        this.props.searchUsersExcludeMe(DEFAULT_PAGE_SIZE, term);
    }

    handleLinkItem(user){
        this.props.shareVideo(this.state.videoToShare, user).then(() => {
            this.setState({...this.state,
                videoToShare: null,
                shareModalOpen: false,
            });
        })
    }

    getDisplayName(user){
        return `${user.first_name} ${user.last_name} (${user.email})`;
    }

    render(){
        let {videos, currentUser, matchedUsers} = this.props;
        return (
            <div className="animated fadeIn">
                <Modal isOpen={this.state.shareModalOpen}>
                    <ModalHeader toggle={this.toggleModalShare}>{T.translate("Share Video")}</ModalHeader>
                    <ModalBody>
                        <SearchBar
                            currentItems={matchedUsers}
                            searchPlaceHolder={T.translate("Search Users")}
                            handleChangeSearchTerm={this.handleChangeSearchTerm}
                            getDisplayName={this.getDisplayName}
                            onClickPrimaryAction={this.handleLinkItem}
                            primaryActionClass="button-add"
                            primaryActionName={T.translate("Share video")}
                            useSecondaryAction={false}
                            searchId="user2Share"
                            getDisplayName={this.getDisplayName}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleModalShare}>{T.translate("Cancel")}</Button>
                    </ModalFooter>
                </Modal>
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
                                                                        <video data-video-id={video.id} className="rounded img-fluid mx-auto d-block" controls>
                                                                            { videos_inner.map((video_inner, idx) =>
                                                                                <source src={video_inner.video_url} key={idx} type={video_inner.type}></source>
                                                                            )}
                                                                        </video>
                                                                    </Col>
                                                                    <Col xs="12" lg="12">
                                                                        <b>{T.translate("Title")}</b>:{exercise.title}&nbsp;
                                                                        {video.video_views > 0 &&
                                                                        <Badge pill title="views"
                                                                               color="info">{video.video_views}</Badge>
                                                                        }
                                                                    </Col>
                                                                    <Col xs="12" lg="12">
                                                                        {taker.id != currentUser.id && <Badge color="success">{T.translate("Shared By")}</Badge> }
                                                                        {' '}
                                                                        <b>{T.translate("Author")}</b>: {taker.first_name} {taker.last_name}
                                                                    </Col>
                                                                    <Col xs="12" lg="12">
                                                                        <b>{T.translate("Created")}</b>: {video.created}
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col xs="12" lg="2">
                                                                {taker.id == currentUser.id&&
                                                                <Button outline color="primary" onClick={() => this.shareVideo(video)}><i className="fa fa-share"></i>&nbsp;share</Button>
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

export default VideoLibrary