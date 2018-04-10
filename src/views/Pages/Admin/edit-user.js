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

class AdminEditUser extends Component {
    render(){
        let title = 'New User';
        return (
            <Row>
                <Col xs="12" md="12">
                    <Card>
                        <CardHeader>
                            <strong>{title}</strong>
                        </CardHeader>
                        <CardBody>
                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">

                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">First Name</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="fname-input" name="fname-input" placeholder="First Name"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Surname</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="lname-input" name="lname-input" placeholder="Surname"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="email-input">Email</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="email" id="email-input" name="email-input" placeholder="Enter Email"/>
                                        <FormText className="help-block">Please enter your email</FormText>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="password-input">Password</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="password" id="password-input" name="password-input" placeholder="Password"/>
                                        <FormText className="help-block">Please enter a complex password</FormText>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="textarea-input">Bio</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                                               placeholder="Content..."/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="select">Gender</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="select" name="select" id="select">
                                            <option value="0">--Please select--</option>
                                            <option value="1">Male</option>
                                            <option value="2">Female</option>
                                            <option value="3">Prefer not to said</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="select">Role</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="select" name="select" id="select">
                                            <option value="0">-- Please select Role --</option>
                                            <option value="1">TEACHER</option>
                                            <option value="2">STUDENT</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="file-input">Profile picture</Label>
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

export default AdminEditUser;