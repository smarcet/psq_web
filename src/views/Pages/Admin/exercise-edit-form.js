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
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import DevicesSelectorControl from "./devices-selector-control";

class ExerciseEditForm extends Component{

    render(){
        let {onSave, onCancel, handleChange, currentEditExercise, availableDevices, errors} = this.props;
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
                                               invalid={errors.title}
                                               name="title" placeholder={T.translate('Title')}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="abstract">{T.translate('Abstract')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="textarea" name="abstract" id="abstract" rows="9"
                                               onChange={handleChange}
                                               invalid={errors.abstract}
                                               value={currentEditExercise.abstract}
                                               placeholder={T.translate('Abstract')}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="type">{T.translate('Type')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="select"
                                               onChange={handleChange}
                                               invalid={errors.type}
                                               value={currentEditExercise.type}
                                               name="type" id="type">
                                            <option value="0">{T.translate('-- SELECT A TYPE --')}</option>
                                            <option value="1">{T.translate('Regular')}</option>
                                            <option value="2">{T.translate('Tutorial')}</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="max_time">{T.translate('Max. Duration')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input
                                            onChange={handleChange}
                                            invalid={errors.max_duration}
                                            value={currentEditExercise.max_duration}
                                            type="text" id="max_duration" name="max_duration"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="select">Devices</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                     <DevicesSelectorControl
                                         onChange={handleChange}
                                         invalid={errors.allowed_devices}
                                         handleChange={handleChange}
                                         selectedDevices={currentEditExercise.allowed_devices}
                                         availableDevices={availableDevices}/>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <Button type="submit" size="sm" color="primary" onClick={onSave}><i className="fa fa-dot-circle-o"></i> Save</Button>{' '}
                            <Button type="reset" size="sm" color="danger" onClick={onCancel}><i className="fa fa-ban"></i> Cancel</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default ExerciseEditForm;