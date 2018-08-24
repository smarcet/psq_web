import React, {Component} from 'react';
import {Input, FormGroup, Form, Button, Label} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import T from "i18n-react";
import '../../scss/statistics.scss';

class UserStatistics extends Component {

    constructor (props) {
        super(props)
        this.state = {
            startDate: moment(),
            endDate: moment(),
            exercise: 0,
        };
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    }

    handleChangeStartDate(date) {
        this.setState({
            startDate: date
        });
    }

    componentWillMount () {

    }

    handleChangeEndDate(date) {
        this.setState({
            endDate: date
        });
    }

    render(){
        return (
            <div className="animated fadeIn">
                <Form inline>
                <FormGroup>
                    <Label for="exercise" className="mr-sm-2">{T.translate("Exercise")}&nbsp;</Label>
                    <Input type="select" name="exercise" id="exercise">
                        <option value="0">{T.translate("-- Select Exercise -- ")}</option>
                        <option value="1">Exercise#1</option>
                        <option value="2">Exercise#2</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="startDate" className="mr-sm-2">{T.translate("From")}&nbsp;</Label>
                    <DatePicker
                        name='startDate'
                        selected={this.state.startDate}
                        onChange={this.handleChangeStartDate}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="endDate" className="mr-sm-2">{T.translate("To")}&nbsp;</Label>
                    <DatePicker
                        name='endDate'
                        selected={this.state.endDate}
                        onChange={this.handleChangeEndDate}
                    />
                </FormGroup>
                    <Button>{T.translate("Get Statistics")}</Button>
                </Form>
            </div>
        );
    }
}

export default UserStatistics;