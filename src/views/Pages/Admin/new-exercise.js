import React, {Component} from 'react';
import {
    Row,
    Col,
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import {connect} from "react-redux";
import swal from "sweetalert2";
import ExerciseEditForm from "./exercise-edit-form";

class NewExercise extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentEditExercise: this.props.currentEditExercise,
            errors: {
                title: true,
                abstract: true,
                max_duration: true,
                type:true,
                allowed_devices: true
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel   = this.onCancel.bind(this);
    }

    render(){
        let config = {};
        return(
            <Row>
                <Col xs="12" md="12" className="mb-4">
                    <ExerciseEditForm
                        onSave={this.onSave}
                        config={config}
                        onCancel={this.onCancel}
                        handleChange={this.handleChange}
                        errors={this.state.errors}
                        currentEditExercise={this.state.currentEditExercise}/>
                </Col>
            </Row>
        );
    }

}

const mapStateToProps = ({ adminEditExerciseState }) => ({
    currentEditExercise : adminEditExerciseState.currentEditExercise,
});

export default connect (
    mapStateToProps,
    {
        createNewExercise
    }
)(NewExercise);