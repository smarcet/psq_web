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
    FormText,
    Label,
    Input,
    FormFeedback

} from 'reactstrap';
import 'sweetalert2/dist/sweetalert2.css';
import swal from 'sweetalert2';
import T from "i18n-react/dist/i18n-react";
import {connect} from 'react-redux'
import {getDeviceById, updateDevice, getAvailableAdmins} from '../../../actions/superAdmin/devices-actions';
import {FormValidator, MandatoryField, GreaterThanField, RegexField} from "../../../utils/form-validator";

class SuperAdminEditDevice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentEditDevice: {...this.props.currentEditDevice},
            availableAdminsList: this.props.availableAdminsList,
            validator: new FormValidator(
                [
                    new MandatoryField('friendly_name', T.translate('Friendly Name')),
                    new MandatoryField('serial', T.translate('Serial')),
                    new RegexField('^([a-z]|[0-9]|\-)*$','serial', T.translate('Serial')),
                    new MandatoryField('slots', T.translate('Available Slots #')),
                    new GreaterThanField('slots', 0,  T.translate('Available Slots #')),
                ]
            )
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        let deviceId = this.props.match.params.device_id;
        this.props.getAvailableAdmins().then(() => {
            this.props.getDeviceById(deviceId);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentEditDevice.id != nextProps.currentEditDevice.id) {
            this.setState({...this.state, currentEditDevice: nextProps.currentEditDevice});
        }
        if (this.props.availableAdminsList != nextProps.availableAdminsList) {
            this.setState({...this.state, availableAdminsList: nextProps.availableAdminsList});
        }
    }

    componentDidMount() {

    }

    handleChange(event) {

        let {currentEditDevice, validator} = this.state;
        let {value, id} = event.target;

        if (event.target.type == 'checkbox') {
            value = event.target.checked;
        }

        if (event.target.type == 'select-one' && value == '0') {
            value = '';
        }

        currentEditDevice[id] = value;

        validator.validate(currentEditDevice);
        this.setState({...this.state, currentEditDevice: currentEditDevice, validator: validator});
    }

    onSaveDevice(event) {

        let {currentEditDevice, validator} = this.state;
        event.preventDefault();

        if (!validator.isValidData(currentEditDevice)) {
            this.setState({...this.state, validator: validator});
            return false;
        }

        this.props.updateDevice(this.state.currentEditDevice).then(() => {
            swal(
                '',
                T.translate('Your device has been successfully updated!.'),
                'success'
            );
            this.props.history.goBack();
        });

        event.preventDefault();
    }

    onCancelEdit(event) {
        this.props.history.goBack();
        event.preventDefault();
    }

    render() {
        let deviceId = this.props.match.params.device_id;
        let currentEditDevice = this.state.currentEditDevice;
        let availableAdminsList = this.state.availableAdminsList;
        let validator = this.state.validator;

        let deviceTitle = deviceId != null ? T.translate('Device # ${device_id}', {device_id: deviceId}) : T.translate('New Device');
        return (
            <Row>
                <Col xs="12" md="12" lg="12">
                    <Card>
                        <CardHeader>
                            <strong>{deviceTitle}</strong>
                        </CardHeader>
                        <CardBody>
                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="serial">{T.translate('Serial #')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text"
                                               invalid={validator.isInvalid('serial')}
                                               id="serial"
                                               value={currentEditDevice.serial}
                                               name="serial"
                                               placeholder={T.translate('Serial Number')}
                                               onChange={this.handleChange}/>
                                        <FormFeedback valid={validator.isValid('serial')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('serial')}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="mac_address">{T.translate('MAC Address')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text"
                                               readOnly={true}
                                               id="mac_address"
                                               defaultValue={currentEditDevice.mac_address}
                                               name="mac_address"
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">{T.translate('Friendly Name')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text"
                                               invalid={validator.isInvalid('friendly_name')}
                                               id="friendly_name"
                                               value={currentEditDevice.friendly_name}
                                               name="friendly_name"
                                               placeholder={T.translate('Friendly Name')}
                                               onChange={this.handleChange}/>
                                        <FormFeedback valid={validator.isValid('friendly_name')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('friendly_name')}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="slots">{T.translate('Available Slots #')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="number" id="slots" name="slots" value={currentEditDevice.slots}
                                               invalid={validator.isInvalid('slots')}
                                               placeholder={T.translate('Available Slots #')}
                                               onChange={this.handleChange}/>
                                        <FormText className="help-block">Please enter available slots #</FormText>
                                        <FormFeedback valid={validator.isValid('slots')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('slots')}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="owner">{T.translate('Admin Owner')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="select"
                                               name="owner"
                                               id="owner"
                                               invalid={validator.isInvalid('owner')}
                                               value={currentEditDevice.owner != null ? (currentEditDevice.owner.hasOwnProperty('id') ? currentEditDevice.owner.id : currentEditDevice.owner) : ''}
                                               onChange={this.handleChange}>
                                            <option value="0">{T.translate('-- Please select Owner --')}</option>
                                            {
                                                availableAdminsList.map((item, idx) =>
                                                    <option
                                                        key={item.id}
                                                        value={item.id.toString()}>{item.first_name + ' ' + item.last_name}</option>
                                                )
                                            }
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>{T.translate('Is Enable?')}</Label>
                                    </Col>
                                    <Col md="9">
                                        <FormGroup check inline>
                                            <Input className="form-check-input"
                                                   type="checkbox"
                                                   checked={currentEditDevice.is_active}
                                                   id="is_active" name="is_active"
                                                   onChange={this.handleChange}/>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <Button type="submit" size="sm" color="primary" onClick={(e) => this.onSaveDevice(e)}><i
                                className="fa fa-dot-circle-o"></i>&nbsp;{T.translate('Save')}</Button>{' '}
                            <Button type="reset" size="sm" color="danger" onClick={(e) => this.onCancelEdit(e)}><i
                                className="fa fa-ban"></i>&nbsp;{T.translate('Cancel')}</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = ({superAdminEditDevicesState}) => ({
    currentEditDevice: superAdminEditDevicesState.currentEditDevice,
    availableAdminsList: superAdminEditDevicesState.availableAdminsList,
});

export default connect(
    mapStateToProps,
    {
        getDeviceById,
        updateDevice,
        getAvailableAdmins,
    }
)(SuperAdminEditDevice);