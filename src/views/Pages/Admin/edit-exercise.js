import React, {Component} from 'react';
import ExerciseEditForm from "./exercise-edit-form";
import {connect} from "react-redux";
import swal from "sweetalert2";
import T from "i18n-react/dist/i18n-react";
import {
    getMyExerciseById, updateExercise, addNewExercise, getMyAvailableDevices,
    getMyAvailableTutorials
} from "../../../actions/Admin/exercises-actions";
import {FormValidator, GreaterThanField, LowerOrEqualThanField, MandatoryField} from "../../../utils/form-validator";

class AdminEditExercise extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentEditExercise: {...this.props.currentEditExercise},
            validator: new FormValidator(
                [
                    new MandatoryField('title', 'Title'),
                    new MandatoryField('abstract', 'Abstract'),
                    new MandatoryField('max_duration', 'Max. Duration'),
                    new GreaterThanField('max_duration', 0, 'Max. Duration'),
                    new LowerOrEqualThanField('max_duration', 120, 'Max. Duration'),
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
            if (ev.target.className.indexOf("devices")>=0) {
                let { availableDevices } = this.props;
                id    = 'allowed_devices';
                let selectedDevice = availableDevices.filter((i) => i.id == value)[0];
                value = currentEditExercise[id];
                if (ev.target.checked) {
                    value = [...value, selectedDevice]
                }
                else {
                    value = value.filter(i => i.id != selectedDevice.id)
                }
            }
            if (ev.target.className.indexOf("tutorials")>=0) {
                let { availableTutorials } = this.props;
                id    = 'allowed_tutorials';
                let selectedTutorial = availableTutorials.filter((i) => i.id == value)[0];
                value = currentEditExercise[id];
                if (ev.target.checked) {
                    value = [...value, selectedTutorial]
                }
                else {
                    value = value.filter(i => i.id != selectedTutorial.id)
                }
            }
        }

        if (ev.target.type == 'select-one') {
            if(value == '0')
                value = '';
        }

        if(id == 'max_duration')
            value = value * 60;

        currentEditExercise[id] = value;

        validator.validate(currentEditExercise);

        this.setState({...this.state, currentEditExercise: currentEditExercise, validator: validator});
    }

    componentWillMount() {
        let exerciseId = this.props.match.params.exercise_id;
        if (typeof exerciseId != 'undefined' && exerciseId > 0) {
            this.props.getMyExerciseById(exerciseId).then(() => this.props.getMyAvailableDevices().then(() => this.props.getMyAvailableTutorials()));
            return;
        }
        this.props.getMyAvailableDevices().then(() => this.props.getMyAvailableTutorials());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentEditExercise.id != this.state.currentEditExercise.id)
            this.setState({...this.state,
                currentEditExercise: {...nextProps.currentEditExercise}
            });
    }

    render() {
        let {currentEditExercise, validator} = this.state;
        let {availableDevices, availableTutorials} = this.props;
        return (
            <ExerciseEditForm
                currentEditExercise={currentEditExercise}
                availableDevices={availableDevices}
                availableTutorials={availableTutorials}
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
    availableDevices: adminEditExerciseState.availableDevices,
    availableTutorials: adminEditExerciseState.availableTutorials,
});

export default connect(
    mapStateToProps,
    {
        getMyExerciseById,
        addNewExercise,
        updateExercise,
        getMyAvailableDevices,
        getMyAvailableTutorials
    }
)(AdminEditExercise);