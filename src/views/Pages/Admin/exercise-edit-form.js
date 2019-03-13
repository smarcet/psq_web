import React, {Component} from 'react';
import {
    Row,
    Col,
    Button,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    FormFeedback
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import DevicesSelectorControl from "./devices-selector-control";
import TutorialsSelectorControl from './tutorials-selector-control';

class ExerciseEditForm extends Component{

    getFriendlyType(exercise){
        if(exercise.type == 1){
            return T.translate('Regular')
        }
        return T.translate('Tutorial');
    }

    render(){
        let {onSave, onCancel, handleChange, currentEditExercise, availableDevices, availableTutorials, validator} = this.props;
        return(
            <Row>
                <Col xs="12" md="12">
                    <Card>
                        <CardHeader>
                            <strong>{ currentEditExercise.id > 0 ? T.translate(''): T.translate('New Exercise')}</strong>
                        </CardHeader>
                        <CardBody>
                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">

                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="title">{T.translate('Title')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="title"
                                               onChange={handleChange}
                                               value={currentEditExercise.title}
                                               invalid={validator.isInvalid('title')}
                                               name="title" placeholder={T.translate('Title')}/>
                                        <FormFeedback valid={validator.isValid('title')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('title')}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="abstract">{T.translate('Abstract')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="textarea" name="abstract" id="abstract" rows="9"
                                               onChange={handleChange}
                                               invalid={validator.isInvalid('abstract')}
                                               value={currentEditExercise.abstract}
                                               placeholder={T.translate('Abstract')}/>
                                        <FormFeedback valid={validator.isValid('abstract')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('abstract')}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="type">{T.translate('Type')}</Label>
                                    </Col>
                                    {currentEditExercise.id == 0 &&
                                    <Col xs="12" md="9">
                                        <Input type="select"
                                               readOnly={currentEditExercise.id > 0}
                                               onChange={handleChange}
                                               invalid={validator.isInvalid('type')}
                                               value={currentEditExercise.type}
                                               name="type" id="type">
                                            <option value="">{T.translate('-- SELECT A TYPE --')}</option>
                                            <option value="1">{T.translate('Regular')}</option>
                                            <option value="2">{T.translate('Tutorial')}</option>
                                        </Input>
                                        <FormFeedback valid={validator.isValid('type')}><i
                                            className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('type')}
                                        </FormFeedback>
                                    </Col>
                                    }
                                    {currentEditExercise.id > 0 &&
                                        <Col xs="12" md="9">
                                            <Input
                                                value={currentEditExercise.type}
                                                type="hidden" id="type" name="type"/>

                                            <Input
                                                readOnly={true}
                                                value={this.getFriendlyType(currentEditExercise)}
                                                type="text" id="type_friendly" name="type_friendly"/>
                                        </Col>
                                    }
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="max_duration">{T.translate('Maximum Duration')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input
                                            onChange={handleChange}
                                            invalid={validator.isInvalid('max_duration')}
                                            value={currentEditExercise.max_duration > 0 ? currentEditExercise.max_duration / 60 : ""}
                                            type="number" id="max_duration" name="max_duration"/>
                                        <FormFeedback valid={validator.isValid('max_duration')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('max_duration')}</FormFeedback>
                                        <FormText className="help-block">{T.translate('Please set the maximum exercise duration in minutes')}</FormText>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="daily_repetitions">{T.translate('Daily Repetitions')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input
                                            onChange={handleChange}
                                            invalid={validator.isInvalid('daily_repetitions')}
                                            value={currentEditExercise.daily_repetitions}
                                            type="number" id="daily_repetitions" name="daily_repetitions"/>
                                        <FormFeedback valid={validator.isValid('daily_repetitions')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('daily_repetitions')}</FormFeedback>
                                        <FormText className="help-block">{T.translate('Please set the maximum exercise duration in minutes')}</FormText>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="practice_days">{T.translate('Practice Days')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input
                                            onChange={handleChange}
                                            invalid={validator.isInvalid('practice_days')}
                                            value={currentEditExercise.practice_days}
                                            type="number" id="practice_days" name="practice_days"/>
                                        <FormFeedback valid={validator.isValid('practice_days')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('practice_days')}</FormFeedback>
                                        <FormText className="help-block">{T.translate('Please set the maximum exercise duration in minutes')}</FormText>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="select">{T.translate("Allowed Devices")}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                     <DevicesSelectorControl
                                         onChange={handleChange}
                                         validator={validator}
                                         fieldName={"allowed_devices"}
                                         handleChange={handleChange}
                                         selectedDevices={currentEditExercise.allowed_devices}
                                         availableDevices={availableDevices}/>
                                    </Col>
                                </FormGroup>
                                { currentEditExercise.type == 1 && availableTutorials.length > 0 &&

                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="select">{T.translate("Allowed Tutorials")}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <TutorialsSelectorControl
                                            onChange={handleChange}
                                            validator={validator}
                                            fieldName={"allowed_tutorials"}
                                            handleChange={handleChange}
                                            selectedTutorials={currentEditExercise.allowed_tutorials}
                                            availableTutorials={availableTutorials}/>
                                    </Col>
                                </FormGroup>
                                }
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <Button type="submit" size="sm" color="primary" onClick={onSave}><i className="fa fa-dot-circle-o"></i> {T.translate("Save")}</Button>{' '}
                            <Button type="reset" size="sm" color="danger" onClick={onCancel}><i className="fa fa-ban"></i> {T.translate("Cancel")}</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default ExerciseEditForm;