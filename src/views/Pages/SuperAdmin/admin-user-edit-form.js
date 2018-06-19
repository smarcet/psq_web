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

class SuperAdminAdminUserEditForm extends Component {
    render(){
        let { currentEditAdminUser, handleChange, errors, onSave, onCancel, config } = this.props;
        return(
            <Row>
                <Col xs="12" md="12">
                    <Card>
                        <CardHeader>
                            <strong>{ currentEditAdminUser.id > 0 ? `User #${currentEditAdminUser.id}` : 'New User'}</strong>
                        </CardHeader>
                        <CardBody>
                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="first_name">First Name</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="first_name"
                                               onChange={evt => handleChange(evt, target => target.value.trim() != '') }
                                               invalid={errors.first_name}
                                               name="first_name" value={currentEditAdminUser.first_name} placeholder="First Name"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="last_name">Surname</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="last_name"
                                               invalid={errors.last_name}
                                               onChange={evt => handleChange(evt, target => target.value.trim() != '') }
                                               name="last_name" value={currentEditAdminUser.last_name} placeholder="Surname"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="email">Email</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="email" id="email"
                                               invalid={errors.email}
                                               onChange={
                                                       evt => handleChange(evt, (target) => {
                                                           var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                                           return target.value.trim() != '' && re.test(String(target.value).toLowerCase());
                                                       })}
                                               name="email" placeholder="Enter Email" value={currentEditAdminUser.email}/>
                                        <FormText className="help-block">Please enter your email</FormText>
                                    </Col>
                                </FormGroup>
                                { config.showPassword &&
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="password-input">Password</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="password" id="password-input" name="password-input"
                                                   placeholder="Password"/>
                                            <FormText className="help-block">Please enter a complex password</FormText>
                                        </Col>
                                    </FormGroup>
                                }
                                { config.showBio &&
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="bio">Bio</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="textarea" onChange={handleChange} name="bio" id="bio" rows="9"
                                                   placeholder="Content..." value={currentEditAdminUser.bio}/>
                                        </Col>
                                    </FormGroup>
                                }
                                { config.showPic &&
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="pic">Profile picture</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            {currentEditAdminUser.pic != null &&
                                            <img src={currentEditAdminUser.pic} className="user-pic"/>
                                            }
                                            <Input onChange={handleChange} type="file" id="pic" name="pic"/>
                                        </Col>
                                    </FormGroup>
                                }
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <Button type="submit" size="sm" color="primary" onClick={(e) => onSave(e)}><i className="fa fa-dot-circle-o"></i> { currentEditAdminUser.id > 0 ? 'Save' : 'Create'}</Button>{' '}
                            <Button type="reset" size="sm" color="danger" onClick={(e) => onCancel(e)}><i className="fa fa-ban"></i> Cancel</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default SuperAdminAdminUserEditForm;