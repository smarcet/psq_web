import React, {Component} from 'react';

import {connect} from 'react-redux'
import {getVideosByPage, shareVideo, addVideoView} from "../../../actions/videos-actions";
import {searchUsersExcludeMe} from "../../../actions/users-actions";
import 'sweetalert2/dist/sweetalert2.css';
import VideoLibrary from "../../../components/video-library";

class UserVideos extends VideoLibrary {

    constructor(props) {
        super(props);
    }
}

const mapStateToProps = ({userVideosState, loggedUserState}) => ({
    videos: userVideosState.items,
    videosCount: userVideosState.count,
    currentUser: loggedUserState.currentUser,
    matchedUsers: userVideosState.matchedUsers,
});

export default connect(
    mapStateToProps,
    {
        getVideosByPage,
        searchUsersExcludeMe,
        shareVideo,
        addVideoView,
    }
)(UserVideos);