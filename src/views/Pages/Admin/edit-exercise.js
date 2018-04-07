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

class AdminEditExercise extends Component {
    render(){
        return (
            <Row>
                <Col xs="12" md="12">
                    <Card>
                        <CardHeader>
                            <strong>New Exercise</strong>
                        </CardHeader>
                        <CardBody>
                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">

                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Title</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="fname-input" name="fname-input" placeholder="Title"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="textarea-input">Abstract</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                                               placeholder="Abstract..."/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Max. Time</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="time" id="lname-input" name="lname-input"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="select">Devices</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="select" name="select" id="select" multiple>
                                            <option value="1">DEVICE#1</option>
                                            <option value="2">DEVICE#2</option>
                                            <option value="3">DEVICE#3</option>
                                        </Input>
                                        <FormText className="help-block">Please select devices on which exercise will be available.</FormText>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="file-input">Video Tutorial</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="file" id="file-input" name="file-input"/>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Save</Button>{' '}
                            <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Cancel</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default AdminEditExercise;