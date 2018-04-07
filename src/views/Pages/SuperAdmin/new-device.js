import React, {Component} from 'react';
import {
    Row,
    Col,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Collapse,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap';

class SuperAdminNewDevice extends Component {

    render(){
        let deviceId = this.props.hasOwnProperty('deviceId') ? this.props.deviceId : null;
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
                                        <Input type="text" id="text-input" name="text-input" placeholder="Serial Number"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Friendly Name</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="text-input" name="text-input" placeholder="Friendly Name"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="email-input">Available Slots #</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="number" id="email-input" name="email-input" placeholder="l"/>
                                        <FormText className="help-block">Please enter available slots #</FormText>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="select">Admin Owner</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="select" name="select" id="select">
                                            <option value="0">-- Please select Owner --</option>
                                            <option value="1">Admin#1</option>
                                            <option value="2">Admin#1</option>
                                            <option value="3">Admin#3</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>Is Enable?</Label>
                                    </Col>
                                    <Col md="9">
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1"/>
                                        </FormGroup>

                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Create</Button>{' '}
                            <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Cancel</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default SuperAdminNewDevice;