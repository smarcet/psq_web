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

} from 'reactstrap';
import 'sweetalert2/dist/sweetalert2.css';
import swal from 'sweetalert2';
import T from "i18n-react/dist/i18n-react";
import classnames from 'classnames';
import { connect } from 'react-redux'
import { getDeviceById, updateDevice, getAvailableAdmins } from '../../../actions/superAdmin/devices-actions';

class SuperAdminEditDevice extends Component {

    constructor(props) {
        super(props);
        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeTab: '1',
            currentEditDevice: this.props.currentEditDevice,
            availableAdminsList: this.props.availableAdminsList,
            errors: {},
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        let deviceId = this.props.match.params.device_id;
        this.props.getAvailableAdmins().then(() => {
            this.props.getDeviceById(deviceId);
        });;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentEditDevice.id != nextProps.currentEditDevice.id) {
            this.setState({ ...this.state, currentEditDevice: nextProps.currentEditDevice});
        }
        if(this.props.availableAdminsList != nextProps.availableAdminsList){
            this.setState({ ...this.state, availableAdminsList: nextProps.availableAdminsList});
        }
    }

    componentDidMount(){

    }

    handleChange(ev, isValid = null) {
        let currentEditDevice = {...this.state.currentEditDevice};
        let {value, id} = ev.target;
        let errors = this.state.errors;
        errors[id] = false;

        if(isValid != null)
            errors[id] = !isValid(ev.target);

        if (ev.target.type == 'checkbox') {
            value = ev.target.checked;
        }
        if (ev.target.type == 'select-one' && value == '0') {
            value = null;
        }
        currentEditDevice[id] = value;
        this.setState({...this.state, currentEditDevice: currentEditDevice, errors: errors});
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                ...this.state,
                activeTab: tab
            });
        }
    }

    onSaveDevice(event){
        if(this.isValidForm())
            this.props.updateDevice(this.state.currentEditDevice).then(() => {
                swal(
                    '',
                    'Your device has been successfully updated!.',
                    'success'
                );
                this.props.history.goBack();
            });

        event.preventDefault();
    }

    onCancelEdit(event){
        this.props.history.goBack();
        event.preventDefault();
    }

    isValidForm(){
        let { errors } = this.state;
        let isValid = true;
        Object.keys( errors ).forEach( key => {
            isValid = isValid && !errors[key];
        });
        return isValid;
    }

    render(){
        let deviceId = this.props.match.params.device_id;
        let currentEditDevice = this.state.currentEditDevice;
        let availableAdminsList = this.state.availableAdminsList;
        console.log('render form');
        let deviceTitle = deviceId != null ? `Device # ${deviceId}` : 'New Device';
        return(
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
                                        <Label htmlFor="text-input">Serial #</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text"
                                               invalid={this.state.errors.serial}
                                               id="serial"
                                               value={currentEditDevice.serial}
                                               name="serial" placeholder="Serial Number"
                                               onChange={evt => this.handleChange(evt, target => target.value.trim() != '') } />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Friendly Name</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text"
                                               invalid={this.state.errors.friendly_name}
                                               id="friendly_name" value={currentEditDevice.friendly_name} name="friendly_name" placeholder="Friendly Name"
                                               onChange={evt => this.handleChange(evt, target => target.value.trim() != '') } />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="slots">Available Slots #</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="number" id="slots" name="slots" value={currentEditDevice.slots}
                                               invalid={this.state.errors.slots}
                                               placeholder="Available Slots #" onChange={(evt) => this.handleChange(evt, (target) => parseInt(target.value) > 0) }/>
                                        <FormText className="help-block">Please enter available slots #</FormText>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="select">Admin Owner</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="select"
                                               name="owner"
                                               id="owner"
                                               value={currentEditDevice.owner != null ? (currentEditDevice.owner.hasOwnProperty('id') ? currentEditDevice.owner.id :  currentEditDevice.owner) : ''}
                                               onChange={this.handleChange}>
                                            <option value="0">-- Please select Owner --</option>
                                            {
                                                availableAdminsList.map((item, idx)=>
                                                    <option
                                                        key={item.id} value={item.id.toString()}>{item.first_name+' '+item.last_name}</option>
                                                )
                                            }
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>Is Enable?</Label>
                                    </Col>
                                    <Col md="9">
                                        <FormGroup check inline>
                                            <Input className="form-check-input"
                                                   type="checkbox"
                                                   checked={currentEditDevice.is_active}
                                                   id="is_active" name="is_active" onChange={this.handleChange}/>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <Button type="submit" size="sm" color="primary" onClick={(e) => this.onSaveDevice(e)}><i className="fa fa-dot-circle-o"></i> Save</Button>{' '}
                            <Button type="reset" size="sm" color="danger" onClick={(e) => this.onCancelEdit(e)}><i className="fa fa-ban"></i> Cancel</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = ({ superAdminEditDevicesState }) => ({
    currentEditDevice : superAdminEditDevicesState.currentEditDevice,
    availableAdminsList: superAdminEditDevicesState.availableAdminsList,
});

export default connect (
    mapStateToProps,
    {
        getDeviceById,
        updateDevice,
        getAvailableAdmins,
    }
)(SuperAdminEditDevice);