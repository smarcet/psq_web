import React, {Component} from 'react';
import ExerciseEditForm from "./exercise-edit-form";
import {connect} from "react-redux";
import swal from "sweetalert2";
import T from "i18n-react/dist/i18n-react";
import {
    getMyExerciseById, updateExercise, addNewExercise, getMyAvailableDevices
}  from "../../../actions/Admin/exercises-actions";

class AdminEditExercise extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentEditExercise: this.props.currentEditExercise,
            errors: {
                title: true,
                abstract:true,
                max_duration: true,
                allowed_devices: true,
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    isValidForm(){
        let { errors } = this.state;
        let isValid = true;
        Object.keys( errors ).forEach( key => {
            isValid = isValid && !errors[key];
        });
        return isValid;
    }

    onSave(event){
        if(this.isValidForm())
            if(this.state.currentEditExercise.id > 0)
                this.props.updateExercise(this.state.currentEditExercise).then(() => {
                    swal(
                        '',
                        T.translate("Your exercise has been successfully updated!."),
                        'success'
                    );
                    this.props.history.goBack();
                });
            else{
                this.props.addNewExercise(this.state.currentEditExercise).then(() => {
                    swal(
                        '',
                        T.translate("Your exercise has been successfully created!."),
                        'success'
                    );
                    this.props.history.goBack();
                });
            }

        event.preventDefault();
    }

    onCancel(event){
        this.props.history.goBack();
        event.preventDefault();
    }

    handleChange(ev, isValid = null) {
        let currentEditExercise = {...this.state.currentEditExercise};
        let {value, id} = ev.target;
        let errors = this.state.errors;
        errors[id] = false;

        if(isValid != null)
            errors[id] = !isValid(ev.target);

        if (ev.target.type == 'checkbox') {
            if(ev.target.className.indexOf("multi")){
                id = 'allowed_devices';
                value = currentEditExercise[id];
                if(ev.target.checked){
                     value = [...value, ev.target.value]
                }
                else{
                    value = value.filter(elem => elem != ev.target.value)
                }
                errors[id] = value.length == 0;
            }
            else
                value = ev.target.checked;
        }

        if (ev.target.type == 'select-one' && value == '0') {
            value = null;
        }

        currentEditExercise[id] = value;
        this.setState({...this.state, currentEditExercise: currentEditExercise, errors: errors});
    }

    componentWillMount() {
        let exerciseId = this.props.match.params.exercise_id;
        if(typeof exerciseId != 'undefined' && exerciseId > 0)
            this.props.getMyExerciseById(exerciseId);
        this.props.getMyAvailableDevices();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...this.state, currentEditExercise: nextProps.currentEditExercise});
    }

    render(){
        let {currentEditExercise} = this.state;
        let {availableDevices} = this.props;
        return (
          <ExerciseEditForm
              currentEditExercise={currentEditExercise}
              availableDevices={availableDevices}
              errors={this.state.errors}
              onSave={this.onSave}
              onCancel={this.onCancel}
              handleChange={this.handleChange}
          />
        );
    }
}


const mapStateToProps = ({ adminEditExerciseState }) => ({
    currentEditExercise : adminEditExerciseState.currentEditExercise,
    availableDevices: adminEditExerciseState.availableDevices
});

export default connect (
    mapStateToProps,
    {
        getMyExerciseById,
        addNewExercise,
        updateExercise,
        getMyAvailableDevices,
    }
)(AdminEditExercise);