import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getVideosByPage, shareVideo, addVideoView} from "../../../actions/videos-actions";
import {searchUsersExcludeMe} from "../../../actions/users-actions";
import 'sweetalert2/dist/sweetalert2.css';;
import VideoLibrary from "../../../components/video-library";

class AdminVideos extends VideoLibrary {
    constructor(props) {
        super(props);
    }
}

const mapStateToProps = ({adminVideosState, loggedUserState}) => ({
    videos: adminVideosState.items,
    videosCount: adminVideosState.count,
    currentUser: loggedUserState.currentUser,
    matchedUsers: adminVideosState.matchedUsers,
});

export default connect(
    mapStateToProps,
    {
        getVideosByPage,
        searchUsersExcludeMe,
        shareVideo,
        addVideoView,
    }
)(AdminVideos);