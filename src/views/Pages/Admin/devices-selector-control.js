import React, {Component} from 'react';
import {
    Row,
    Col,
    FormGroup,
    FormText,
    Label,
    Input,
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";

class DevicesSelectorControl extends Component{

    render(){
        let {availableDevices, handleChange, selectedDevices} = this.props;
        return (
            <Row>
                 <Col xs="12" md="9">

                     {availableDevices && availableDevices.map((device, i) => {
                         return (
                             <FormGroup check inline key={device.id}>
                                 <Input className="form-check-input multi"
                                        type="checkbox"
                                        id={`device_${device.id}`}
                                        onChange={handleChange}
                                        checked={selectedDevices.filter(item => item.id !== device.id).length > 0}
                                        name={`device_${device.id}`}
                                        value={device.id}/>
                                 <Label className="form-check-label" check htmlFor={`device_${device.id}`}>{device.friendly_name}</Label>
                             </FormGroup>
                         )
                     })
                     }
                    <FormText className="help-block">{T.translate('Please select devices on which exercise will be available.')}</FormText>
                    </Col>

            </Row>
        );
    }
}

export default DevicesSelectorControl;