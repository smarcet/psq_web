import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    Button
} from 'reactstrap';

class DeviceEditForm extends Component {

    render(){

        let { device, handleChange, errors, onSave, onCancel,  } = this.props;
        return(
            <Row>
                <Col xs="12" md="12" lg="12">
                    <Card>
                        <CardHeader>
                            <strong>#{device.id}</strong>
                        </CardHeader>
                        <CardBody>
                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="serial">Serial #</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text"
                                               id="serial"
                                               name="serial"
                                               onChange={evt => handleChange(evt, target => target.value.trim() != '') }
                                               invalid={errors.serial}
                                               value={device.serial} readOnly={true}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="friendly_name">Friendly Name</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text"
                                               id="friendly_name"
                                               name="friendly_name" placeholder="Friendly Name"
                                               onChange={evt => handleChange(evt, target => target.value.trim() != '') }
                                               invalid={errors.friendly_name}
                                               value={device.friendly_name}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="slots">Available Slots #</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="number" id="slots" name="slots" value={device.slots}
                                               onChange={evt => handleChange(evt, target => target.value.trim() != '') }
                                               invalid={errors.slots}
                                        />
                                        <FormText className="help-block"># Users to associate with device</FormText>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>Is Enable?</Label>
                                    </Col>
                                    <Col md="9">
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="is_active" name="is_active" value="option1"/>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <Button type="submit" size="sm" color="primary" onClick={(e) => onSave(e)}><i className="fa fa-dot-circle-o"></i> Save</Button>{' '}
                            <Button type="reset" size="sm" color="danger" onClick={(e) => onCancel(e)}><i className="fa fa-ban"></i> Cancel</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default DeviceEditForm;