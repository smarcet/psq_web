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
import T from "i18n-react";

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
        let { currentEditUser, handleChange, validator, onSave, onCancel, config, countries } = this.props;
        let { showChangePassword } = this.state;
        return(
            <Row>
                <Col xs="12" md="12">
                    <Card>
                        <CardHeader>
                            <strong>{ currentEditUser.id > 0 ? T.translate("User # {user_id}", {user_id: currentEditUser.id})  : T.translate('New User')}</strong>
                        </CardHeader>
                        <CardBody>
                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="first_name">{T.translate('First Name')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="first_name"
                                               onChange={handleChange}
                                               invalid={validator.isInvalid('first_name')}
                                               name="first_name" value={currentEditUser.first_name} placeholder={T.translate('First Name')}/>
                                        <FormFeedback valid={validator.isValid('first_name')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('first_name')}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="last_name">{T.translate('Surname')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="last_name"
                                               onChange={handleChange}
                                               invalid={validator.isInvalid('last_name')}
                                               name="last_name" value={currentEditUser.last_name} placeholder={T.translate('Surname')}/>
                                        <FormFeedback valid={validator.isValid('last_name')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('last_name')}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="email">{T.translate('Email')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="email" id="email"
                                               onChange={handleChange}
                                               invalid={validator.isInvalid('email')}
                                               readOnly={!config.canEditEmail}
                                               name="email" placeholder={T.translate('Enter Email')} value={currentEditUser.email}/>
                                        { config.showEmailChangeWarning &&
                                            <FormText className="help-block">{T.translate('if your change your email you will need to re verify it')}</FormText>
                                        }
                                        <FormFeedback valid={validator.isValid('email')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('email')}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="country">{T.translate('Country')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="select"
                                               name="country"
                                               id="country"
                                               value={currentEditUser.country}
                                               onChange={handleChange}
                                               invalid={validator.isInvalid('country')}>
                                            <option value="">{T.translate('-- Please select Country --')}</option>
                                            {
                                                countries.map(
                                                    (country, idx) => {

                                                        return (<option key={idx} value={country['alpha-3']}>{country.name}</option>)
                                                    }
                                                )
                                            }

                                        </Input>
                                        <FormFeedback valid={validator.isValid('country')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('country')}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="state">{T.translate('State')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text"
                                               id="state"
                                               onChange={handleChange}
                                               invalid={validator.isInvalid('state')}
                                               name="state" value={currentEditUser.state} placeholder={T.translate('State')}/>
                                        <FormFeedback valid={validator.isValid('state')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('state')}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                {config.showSurgeonFields &&
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="title">{T.translate('Title')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="title"
                                               onChange={handleChange}
                                               invalid={validator.isInvalid('title')}
                                               name="title" value={currentEditUser.title}
                                               placeholder={T.translate('Title')}/>
                                        <FormFeedback valid={validator.isValid('title')}><i
                                            className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('title')}
                                        </FormFeedback>
                                    </Col>
                                </FormGroup>
                                }
                                {config.showSurgeonFields &&
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="enrollment">{T.translate('Enrollment')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="enrollment"
                                               onChange={handleChange}
                                               invalid={validator.isInvalid('enrollment')}
                                               name="enrollment" value={currentEditUser.enrollment}
                                               placeholder={T.translate('Enrollment')}/>
                                        <FormFeedback valid={validator.isValid('enrollment')}><i
                                            className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('enrollment')}
                                        </FormFeedback>
                                    </Col>
                                </FormGroup>
                                }
                                {config.showSurgeonFields &&
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="organization">{T.translate('Organization')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="organization"
                                               onChange={handleChange}
                                               invalid={validator.isInvalid('organization')}
                                               name="organization" value={currentEditUser.organization}
                                               placeholder={T.translate('Organization')}/>
                                        <FormFeedback valid={validator.isValid('organization')}><i
                                            className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('organization')}
                                        </FormFeedback>
                                    </Col>
                                </FormGroup>
                                }
                                {config.showSurgeonFields &&
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="hand">{T.translate('Hand')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="select"
                                               name="hand"
                                               id="hand"
                                               value={currentEditUser.hand}
                                               onChange={handleChange}
                                               invalid={validator.isInvalid('hand')}>
                                            <option value="">{T.translate('-- Please select Hand --')}</option>
                                            <option value="1">{T.translate('Left')}</option>
                                            <option value="2">{T.translate('Right')}</option>
                                        </Input>
                                        <FormFeedback valid={validator.isValid('hand')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('hand')}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                }
                                { config.showRole &&
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="role">{T.translate('Role')}</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select"
                                                   name="role"
                                                   id="role"
                                                   value={currentEditUser.role}
                                                   onChange={handleChange}
                                                   invalid={validator.isInvalid('role')}>
                                                <option value="">{T.translate('-- Please select Role --')}</option>
                                                {config.showRoleSuperAdmin &&
                                                    <option value="3">{T.translate('SUPER ADMIN')}</option>
                                                }
                                                <option value="2">{T.translate('TEACHER')}</option>
                                                <option value="1">{T.translate('STUDENT')}</option>
                                                {config.showRoleSuperAdmin &&
                                                <option value="0">{T.translate('GUEST')}</option>
                                                }
                                            </Input>
                                            <FormFeedback valid={validator.isValid('role')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('role')}</FormFeedback>
                                        </Col>
                                    </FormGroup>
                                }
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="locale">{T.translate('Locale')}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="select"
                                               name="locale"
                                               id="locale"
                                               value={currentEditUser.locale}
                                               onChange={handleChange}
                                               invalid={validator.isInvalid('locale')}>
                                            <option value="">{T.translate('-- Please select user language --')}</option>
                                            <option value="1">{T.translate('Spanish')}</option>
                                            <option value="2">{T.translate('English')}</option>
                                            }
                                        </Input>
                                        <FormFeedback valid={validator.isValid('locale')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('locale')}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                {config.showPassword &&
                                    <FormGroup row>
                                        <Col md="3">
                                            <Button color="link" onClick={this.handleOnClickChangePassword}>{!showChangePassword ? T.translate("Change Password") : T.translate("Cancel")}</Button>
                                        </Col>
                                        <Col xs="12" md="9">
                                            &nbsp;
                                        </Col>
                                    </FormGroup>
                                }
                                { config.showPassword && showChangePassword &&

                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="password">{T.translate("Password")}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="password" id="password" name="password"
                                               placeholder={T.translate("Password")}
                                               onChange={handleChange}
                                               invalid={validator.isInvalid('password')}
                                        />
                                        <FormText className="help-block">{T.translate("Please enter a complex password")}</FormText>
                                        <FormFeedback valid={validator.isValid('password')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('password')}</FormFeedback>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="password_confirmation">{T.translate("Confirm Password")}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="password" id="password_confirmation" name="password_confirmation"
                                               placeholder={T.translate("Confirm Password")}
                                               onChange={handleChange}
                                               invalid={validator.isInvalid('password_confirmation')}
                                        />
                                        <FormText className="help-block">{T.translate("Please re enter new password")}</FormText>
                                        <FormFeedback valid={validator.isValid('password')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('password')}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                }
                                { config.showBio &&
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="bio">{T.translate("Bio")}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="textarea"
                                               onChange={handleChange}
                                               name="bio"
                                               id="bio"
                                               rows="9"
                                               placeholder={T.translate("Enter your bio...")}
                                               value={currentEditUser.bio}
                                               invalid={validator.isInvalid('bio')}
                                        />
                                        <FormFeedback valid={validator.isValid('bio')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('bio')}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                }
                                { config.showPic &&
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="pic">{T.translate("Profile picture")}</Label>
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