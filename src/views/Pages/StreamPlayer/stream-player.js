import React, {Component} from 'react';
import {
    Container, Row, Col
}
    from 'reactstrap';
import 'sweetalert2/dist/sweetalert2.css';
import {connect} from 'react-redux'
import {validateStream} from '../../../actions/stream-player-actions'
import URI from "urijs";
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import './stream-player.scss'
import { withRouter } from 'react-router'
import {GUEST} from "../../../constants";

const LAUNCH_DELAY = 5 * 1000; // secs

class StreamPlayer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            validLink: true,
            useHLS : false,
        }

        this.dashPlayer = null;
        this.hlsPlayer = null;
        this.video = null;

        this.setVideoRef = element => {
            this.video = element;
        };

        this.loadStream = this.loadStream.bind(this);
    }

    componentWillMount() {
        console.log("StreamPlayer.componentWillMount");
    }

    buildStreamURI(device, broadcasting) {
        let slug = `${device.slug}_${broadcasting.start_at}`;
        let stream_host = process.env['STREAMING_SERVER_BASE_URL'];
        if (Hls.isSupported() && this.state.useHLS) {
            console.log('HLS Supported');
            return `${stream_host}/hls/${slug}.m3u8`;
        }
        console.log("DASH Suppported");
        return `${stream_host}/dash/${slug}.mpd`;
    }

    componentDidMount() {
        console.log("StreamPlayer.componentDidMount")
        let {currentUser, history, location} = this.props;

        if (currentUser == null) {
            let backUrl = location.pathname;
            if (backUrl != null && location.search != null && location.search != null) {
                backUrl += location.search
            }
            if (backUrl != null && location.hash != null && location.hash != null) {
                backUrl += location.hash
            }
            console.log("StreamPlayer.componentDidMount: not valid user return to registration");
            history.push(`/register?BackUrl=${encodeURIComponent(backUrl)}`);
            return;
        }

        if (!this.state.validLink) {
            console.log("StreamPlayer.componentDidMount: not valid link return to logout");
            if(currentUser.role == GUEST) {
                history.push('/logout');
                return;
            }
            history.push('/auth');
            return;
        }

        let url = URI(window.location.href);
        let query = url.search(true);

        let {
            device_id,
            exercise_id,
            user_id,
            exercise_max_duration,
            signature,
            expires
        } = query;

        this.props.validateStream
        (
            device_id,
            exercise_id,
            user_id,
            exercise_max_duration,
            signature,
            expires).then((payload) => {
            window.setTimeout(this.loadStream, LAUNCH_DELAY);
        });

    }

    componentWillReceiveProps(nextProps) {
        console.log("StreamPlayer.componentWillReceiveProps")
        this.setState({...this.state, validLink: nextProps.validLink});
    }

    componentDidUpdate() {
        console.log("StreamPlayer.componentDidUpdate")
        if (!this.state.validLink) {
            let {currentUser, history} = this.props;
            console.log("StreamPlayer.componentDidMount: not valid link return to logout");
            if(currentUser.role == GUEST) {
                history.push('/logout');
                return;
            }
            history.push('/auth');
        }
    }


    loadStream() {
        let {device, broadcasting} = this.props;
        if (device == null) return;
        if (broadcasting == null) return;
        this.setupPlayer();
        this.setPlayerSource(
            this.buildStreamURI(device, broadcasting)
        );
    }

    setupPlayer() {
        if (this.video == null) return;

        if (Hls.isSupported() && this.state.useHLS) {
            this.hlsPlayer = new Hls();
            this.hlsPlayer.attachMedia(this.video);
            this.hlsPlayer.on(Hls.Events.MANIFEST_PARSED, function () {
                this.video.play();
            });
        }

        this.dashPlayer = dashjs.MediaPlayer().create();
        this.dashPlayer.initialize(this.video, null, true);
        this.dashPlayer.setFastSwitchEnabled(true);
        this.dashPlayer.getDebug().setLogToBrowserConsole(true);

    }

    setPlayerSource(sourceUrl) {
        if (this.dashPlayer !== null) {
            this.dashPlayer.attachSource(sourceUrl);
            this.dashPlayer.play();
        }
        else if(this.hlsPlayer != null){
            this.hlsPlayer.loadSource(sourceUrl);
        }
        else {
            if (this.video == null) return;
            this.video.src = sourceUrl;
        }
    }

    render() {
        console.log("StreamPlayer.render")
        let {currentUser, device, exercise, user} = this.props;

        if (currentUser == null) {
            return null;
        }

        if (!this.state.validLink) {
            return null;
        }

        if (device == null) return null;
        if (exercise == null) return null;
        if (user == null) return null;

        return (

            <div className="app player">
                <Header currentUser={currentUser}/>
                <div className="app-body">
                    <main className="main">
                        <Container fluid>
                            <div className="animated fadeIn">
                                <Row>
                                    <Col xs="12" lg="12">
                                        <h1>{device.friendly_name} - {exercise.title} - {user.first_name}, {user.last_name}</h1>
                                        <hr></hr>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" lg="12">
                                        <video className="rounded img-fluid mx-auto d-block" id="videoPlayer"
                                               ref={this.setVideoRef} controls></video>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </main>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = ({StreamPlayerState, loggedUserState}) => ({
    exercise: StreamPlayerState.exercise,
    device: StreamPlayerState.device,
    user: StreamPlayerState.user,
    broadcasting: StreamPlayerState.broadcasting,
    validLink: StreamPlayerState.validLink,
    currentUser: loggedUserState.currentUser,
});

export default withRouter(connect(
    mapStateToProps,
    {
        validateStream,
    }
)(StreamPlayer));