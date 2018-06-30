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
import T from "i18n-react/dist/i18n-react";

class UserEditForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showChangePassword: false,
        };
        this.handleOnClickChangePassword = this.handleOnClickChangePassword.bind(this);
    }

    handleOnClickChangePassword(evt){
        let newVal = !this.state.showChangePassword;
        this.setState({...this.state, showChangePassword: newVal});
        let { onShowPasswordChangeVisibilityChange } = this.props;
        if(onShowPasswordChangeVisibilityChange != null)
            onShowPasswordChangeVisibilityChange(newVal);
        evt.preventDefault();
    }

    render(){
        let { currentEditUser, handleChange, errors, onSave, onCancel, config } = this.props;
        let { showChangePassword } = this.state;
        return(
            <Row>
                <Col xs="12" md="12">
                    <Card>
                        <CardHeader>
                            <strong>{ currentEditUser.id > 0 ? `User #${currentEditUser.id}` : T.translate('New User')}</strong>
                        </CardHeader>
                        <CardBody>
                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="first_name">{T.translate('First Name')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="first_name"
                                               onChange={evt => handleChange(evt, target => target.value.trim() != '') }
                                               invalid={errors.first_name}
                                               name="first_name" value={currentEditUser.first_name} placeholder={T.translate('First Name')}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="last_name">{T.translate('Surname')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="last_name"
                                               invalid={errors.last_name}
                                               onChange={evt => handleChange(evt, target => target.value.trim() != '') }
                                               name="last_name" value={currentEditUser.last_name} placeholder={T.translate('Surname')}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="email">{T.translate('Email')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="email" id="email"
                                               invalid={errors.email}
                                               onChange={
                                                   evt => handleChange(evt, (target) => {
                                                       var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                                       return target.value.trim() != '' && re.test(String(target.value).toLowerCase());
                                                   })}
                                               name="email" placeholder={T.translate('Enter Email')} value={currentEditUser.email}/>
                                        <FormText className="help-block">{T.translate('Please enter your email')}</FormText>
                                    </Col>
                                </FormGroup>
                                { config.showRole &&
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="role">{T.translate('Role')}</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select"
                                                   name="role" id="role"
                                                   invalid={errors.role}
                                                   onChange={handleChange}>
                                                <option value="0">{T.translate('-- Please select Role --')}</option>
                                                <option value="2">{T.translate('TEACHER')}</option>
                                                <option value="1">{T.translate('STUDENT')}</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                }
                                {config.showPassword &&
                                    <FormGroup row>
                                        <Col md="3">
                                            <Button color="link" onClick={this.handleOnClickChangePassword}>{!showChangePassword ? "change password" : "cancel"}</Button>
                                        </Col>
                                        <Col xs="12" md="9">
                                            &nbsp;
                                        </Col>
                                    </FormGroup>
                                }
                                { config.showPassword && showChangePassword &&

                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="password">Password</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="password" id="password" name="password"
                                               placeholder="Password"
                                               invalid={errors.password}
                                               onChange={
                                                   evt => handleChange(evt, (target) => {
                                                       let value = target.value.trim();
                                                       if (value == '') return false;
                                                       if (value.length <  8 ) return false;
                                                       return true;
                                                   })}
                                        />
                                        <FormText className="help-block">Please enter a complex password</FormText>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="password" id="password_confirmation" name="password_confirmation"
                                               invalid={errors.password_confirmation}
                                               placeholder="Password Confirmation"
                                               onChange={
                                                   evt => handleChange(evt, (target) => {
                                                       let confirmValue = target.value.trim();;
                                                       let value = document.getElementById('password').value.trim();
                                                       if (value == '') return false;
                                                       if (value != confirmValue) return false;
                                                       if (value.length <  8 ) return false;
                                                       return true;
                                                   })}
                                        />
                                        <FormText className="help-block">Please re enter new password</FormText>
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
                                               placeholder="Content..." value={currentEditUser.bio}/>
                                    </Col>
                                </FormGroup>
                                }
                                { config.showPic &&
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="pic">Profile picture</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        {currentEditUser.pic_url != null && currentEditUser.pic_url != '' &&
                                        <img src={currentEditUser.pic_url} className="user-pic"/>
                                        }
                                        <Input onChange={handleChange} type="file" id="pic" name="pic"/>
                                    </Col>
                                </FormGroup>
                                }
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <Button type="submit" size="sm" color="primary" onClick={(e) => onSave(e)}><i className="fa fa-dot-circle-o"></i> { currentEditUser.id > 0 ? T.translate('Save') : T.translate('Create')}</Button>{' '}
                            <Button type="reset" size="sm" color="danger" onClick={(e) => onCancel(e)}><i className="fa fa-ban"></i> {T.translate('Cancel')}</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default UserEditForm;