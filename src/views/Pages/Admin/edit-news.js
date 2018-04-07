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

class AdminEditNewsItem extends Component {
    render(){
        return (
            <Row>
                <Col xs="12" md="12">
                    <Card>
                        <CardHeader>
                            <strong>New News Item</strong>
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
                                        <Label htmlFor="textarea-input">Description</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                                               placeholder="Abstract..."/>
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

export default AdminEditNewsItem;