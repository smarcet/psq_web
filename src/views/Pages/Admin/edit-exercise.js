import React, {Component} from 'react';
import ExerciseEditForm from "./exercise-edit-form";
import {connect} from "react-redux";
import swal from "sweetalert2";
import T from "i18n-react/dist/i18n-react";
import {
    getMyExerciseById, updateExercise, addNewExercise, getMyAvailableDevices
} from "../../../actions/Admin/exercises-actions";
import {FormValidator, GreaterThanField, MandatoryField} from "../../../utils/form-validator";

class AdminEditExercise extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentEditExercise: this.props.currentEditExercise,
            validator: new FormValidator(
                [
                    new MandatoryField('title', 'Title'),
                    new MandatoryField('abstract', 'Abstract'),
                    new MandatoryField('max_duration', 'Max. Duration'),
                    new GreaterThanField('max_duration', 0, 'Max. Duration'),
                    new MandatoryField('type', 'Type'),
                    new MandatoryField('allowed_devices', 'Allowed Devices'),
                ]
            )
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onSave(event) {

        let {currentEditExercise, validator} = this.state;
        event.preventDefault();
        if (!validator.isValidData(currentEditExercise)) {
            this.setState({...this.state, validator: validator});
            return false;
        }

        if (this.state.currentEditExercise.id > 0)
            this.props.updateExercise(this.state.currentEditExercise).then(() => {
                swal(
                    '',
                    T.translate("Your exercise has been successfully updated!."),
                    'success'
                );
                this.props.history.goBack();
            });
        else {
            this.props.addNewExercise(this.state.currentEditExercise).then(() => {
                swal(
                    '',
                    T.translate("Your exercise has been successfully created!."),
                    'success'
                );
                this.props.history.goBack();
            });
        }

    }

    onCancel(event) {
        this.props.history.goBack();
        event.preventDefault();
    }

    handleChange(ev) {
        let {currentEditExercise, validator} = this.state;
        let {value, id} = ev.target;

        if (ev.target.type == 'checkbox') {
            if (ev.target.className.indexOf("multi")) {
                id = 'allowed_devices';
                value = currentEditExercise[id];
                if (ev.target.checked) {
                    value = [...value, parseInt(ev.target.value)]
                }
                else {
                    value = value.filter(elem => elem != parseInt(ev.target.value))
                }
            }
        }

        if (ev.target.type == 'select-one' && value == '0') {
            value = '';
        }

        currentEditExercise[id] = value;

        validator.validate(currentEditExercise);

        this.setState({...this.state, currentEditExercise: currentEditExercise, validator: validator});
    }

    componentWillMount() {
        let exerciseId = this.props.match.params.exercise_id;
        if (typeof exerciseId != 'undefined' && exerciseId > 0) {
            this.props.getMyExerciseById(exerciseId).then(() => this.props.getMyAvailableDevices());
            return;
        }
        this.props.getMyAvailableDevices();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...this.state,
            currentEditExercise: {
                ...nextProps.currentEditExercise,
                allowed_devices: nextProps.currentEditExercise.allowed_devices.map(item => item.id)
            }
        });
    }

    render() {
        let {currentEditExercise, validator} = this.state;
        let {availableDevices} = this.props;
        return (
            <ExerciseEditForm
                currentEditExercise={currentEditExercise}
                availableDevices={availableDevices}
                validator={validator}
                onSave={this.onSave}
                onCancel={this.onCancel}
                handleChange={this.handleChange}
            />
        );
    }
}


const mapStateToProps = ({adminEditExerciseState}) => ({
    currentEditExercise: adminEditExerciseState.currentEditExercise,
    availableDevices: adminEditExerciseState.availableDevices
});

export default connect(
    mapStateToProps,
    {
        getMyExerciseById,
        addNewExercise,
        updateExercise,
        getMyAvailableDevices,
    }
)(AdminEditExercise);