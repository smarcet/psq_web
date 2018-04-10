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

class AdminEditUserGroup extends Component {
    render(){
        return (
            <Row>
                <Col xs="12" md="12">
                    <Card>
                        <CardHeader>
                            <strong>New User Group</strong>
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
                                        <Label htmlFor="text-input">Code</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="fname-input" name="fname-input" placeholder="Code"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="select">Users</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1"/>
                                            <Label className="form-check-label" check htmlFor="inline-checkbox1">User#1</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="inline-checkbox2" name="inline-checkbox2" value="option2"/>
                                            <Label className="form-check-label" check htmlFor="inline-checkbox2">User#2</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="inline-checkbox3" name="inline-checkbox3" value="option3"/>
                                            <Label className="form-check-label" check htmlFor="inline-checkbox3">User#3</Label>
                                        </FormGroup>
                                        <FormText className="help-block">Please select users that will belong to this group.</FormText>
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

export default AdminEditUserGroup;