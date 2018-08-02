import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText}
from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import 'sweetalert2/dist/sweetalert2.css';
import swal from 'sweetalert2';
import { connect } from 'react-redux'
import { validateStream } from '../../../actions/stream-player-actions'
import URI from "urijs";

class StreamPlayer extends Component {

    constructor(props) {
        super(props);
        this.player = null
        this.videoElement = null;
    }

    componentWillMount(){
        let {isLoggedUser, isValidGuestUser } = this.props;
        if(!isLoggedUser && !isValidGuestUser) return;
        let _this = this;

        document.addEventListener("DOMContentLoaded", function (event) {
            _this.videoElement = document.querySelector("#videoPlayer")
            if (window.MediaSource) {
                // For good web browsers, use dash.js
                _this.player = dashjs.MediaPlayer().create();
                _this.player.initialize(_this.videoElement, null, true);
                _this.player.setFastSwitchEnabled(true);
            }
        });

        let url      = URI(window.location.href);
        let query    = url.search(true);

        let {
            device_id,
            exercise_id,
            user_id,
            exercise_max_duration,
            signature,
            expires
        } = query;

        this.props.validateStream(device_id,
            exercise_id,
            user_id,
            exercise_max_duration,
            signature,
            expires).then(()=>{
            let slug = this.props.device.slug;
            let stream_host = process.env['STREAMING_SERVER_BASE_URL'];

            if (window.MediaSource && this.player != null) {
                this.player.attachSource(`${stream_host}/dash/${slug}/index.mpd`);
            } else if(this.videoElement != null) {
                // For Safari on iOS, use HLS
                this.videoElement.src = `${stream_host}/hls/${slug}/index.m3u8`;
            }
        })
    }

    render(){
        let {isLoggedUser, isValidGuestUser, history, location, validLink } = this.props;

        if(!validLink){
            history.push('/');
            return null;
        }

        if(!isLoggedUser && !isValidGuestUser){
            let backUrl = location.pathname;
            if(backUrl != null && location.search != null && location.search != null){
                backUrl += location.search
            }
            if(backUrl != null && location.hash != null && location.hash != null){
                backUrl += location.hash
            }

            history.push(`/register?BackUrl=${encodeURIComponent(backUrl)}`);

            return null;
        }

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <h1>{this.props.device.friendly_name} - {this.props.exercise.title} - {this.props.user.first_name}, {this.props.user.last_name}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" lg="12">
                        <video id="videoPlayer" className="rounded img-fluid mx-auto d-block" controls />
                    </Col>
                </Row>
            </div>
        )
    }
}


const mapStateToProps = ({StreamPlayerState}) => ({
    exercise: StreamPlayerState.exercise,
    device: StreamPlayerState.device,
    user: StreamPlayerState.user,
    validLink: StreamPlayerState.validLink
});

export default connect(
    mapStateToProps,
    {
        validateStream,
    }
)(StreamPlayer);