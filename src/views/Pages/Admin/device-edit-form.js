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
import T from "i18n-react/dist/i18n-react";

class DeviceEditForm extends Component {

    render(){

        let { device, handleChange, errors, onSave, onCancel  } = this.props;
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
                                        <Label htmlFor="serial">{T.translate("Serial #")}</Label>
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
                                        <Label htmlFor="friendly_name">{T.translate("Friendly Name")}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text"
                                               id="friendly_name"
                                               name="friendly_name" placeholder={T.translate("Friendly Name")}
                                               onChange={evt => handleChange(evt, target => target.value.trim() != '') }
                                               invalid={errors.friendly_name}
                                               value={device.friendly_name}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="slots">{T.translate("Max. Slots #")}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="number" id="slots" name="slots" value={device.slots}
                                               onChange={evt => handleChange(evt, target => target.value.trim() != '') }
                                               invalid={errors.slots}
                                               readOnly={true}
                                        />
                                        <FormText className="help-block">{T.translate("Max. # Users to associate with device")}</FormText>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>{T.translate("Is Enable?")}</Label>
                                    </Col>
                                    <Col md="9">
                                        <FormGroup check inline>
                                            <Input className="form-check-input"
                                                   type="checkbox"
                                                   id="is_active"
                                                   name="is_active"
                                                   onChange={handleChange}
                                                   checked={device.is_active}
                                            />
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <Button type="submit" size="sm" color="primary" onClick={(e) => onSave(e)}><i className="fa fa-dot-circle-o"></i>&nbsp;{T.translate("Save")}</Button>{' '}
                            <Button type="reset" size="sm" color="danger" onClick={(e) => onCancel(e)}><i className="fa fa-ban"></i>&nbsp;{T.translate("Cancel")}</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default DeviceEditForm;