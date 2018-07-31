import React, {Component} from 'react';
import {
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    FormText
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";

class DevicesSelectorControl extends Component{

    render(){
        let {availableDevices, handleChange, selectedDevices, validator, fieldName} = this.props;
        return (
            <Row>
                 <Col xs="12" md="9" className={validator.isInvalid(fieldName) ? "invalid-checkbox-list":""}>
                     {availableDevices && availableDevices.map((device, i) => {
                         return (
                             <FormGroup check inline key={device.id}>
                                 <Input className="form-check-input multi devices"
                                        type="checkbox"
                                        id={`device_${device.id}`}
                                        onChange={handleChange}
                                        checked={selectedDevices.filter(item => Number.isInteger(item) ? item == device.id : item.id == device.id ).length > 0}
                                        name={`device_${device.id}`}
                                        value={device.id}/>
                                 <Label className="form-check-label" check htmlFor={`device_${device.id}`}>{device.friendly_name}</Label>
                             </FormGroup>
                         )
                     })
                     }
                     <FormText className="help-block">{T.translate('Please select devices on which exercise will be available.')}</FormText>
                     <FormFeedback valid={validator.isValid(fieldName)}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage(fieldName)}</FormFeedback>
                    </Col>

            </Row>
        );
    }
}

export default DevicesSelectorControl;