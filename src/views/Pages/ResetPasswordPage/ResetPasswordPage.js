import React, {Component} from 'react';
import {
    Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText,
    FormFeedback
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import {FormValidator, MandatoryField, EmailField, MinSizeField, EqualToField} from "../../../utils/form-validator";
import swal from "sweetalert2";
import {connect} from "react-redux";
import {resetPasswordRequest, doUserPasswordChange} from '../../../actions/users-actions';

class ResetPasswordPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resetRequest: {
                email: '',
            },
            formData: {
                password: '',
                password_confirmation: '',
                token: this.props.match.params.token
            },
            validator: new FormValidator(
                [
                    new MandatoryField('email', T.translate('Email')),
                    new EmailField('email', T.translate('Email')),
                ]
            ),
            validator2: new FormValidator(
                [
                    new MandatoryField('password', T.translate('Password')
                    ),
                    new MandatoryField('password_confirmation', T.translate('Password Confirmation')
                    ),
                    new EqualToField('password', 'password_confirmation',
                        T.translate('Password'),
                        T.translate('Password Confirmation')),
                    new MinSizeField('password', 8,
                        T.translate('Password')
                    ),
                    new MinSizeField('password_confirmation', 8,
                        T.translate('Password Confirmation')
                    )
                ]
            ),
            sent: false,
            token: this.props.match.params.token
        };
        this.onResetClicked = this.onResetClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.onBack = this.onBack.bind(this);
        this.onChangePasswordClicked = this.onChangePasswordClicked.bind(this);
    }

    componentWillMount(){

        if(this.props.currentUser != null)
        {
            console.log("user is already logged")
            this.props.history.push("/auth");
        }
    }

    handleChange(event) {
        let {resetRequest, validator} = this.state;
        let {value, id} = event.target;
        resetRequest[id] = value;
        validator.validate(resetRequest);
        this.setState({...this.state, resetRequest: resetRequest, validator: validator});
    }

    onResetClicked(event){
        let {validator, resetRequest} = this.state;
        event.preventDefault();
        if (!validator.isValidData(resetRequest)) {
            this.setState({...this.state, validator: validator});
            return false;
        }

        this.props.resetPasswordRequest(this.state.resetRequest).then(() => {
            this.setState({...this.state, sent :true})
        });
    }

    onBack(event){
        this.props.history.goBack();
    }

    handleChange2(event) {
        let {formData, validator2} = this.state;
        let {value, id} = event.target;
        formData[id] = value;
        validator2.validate(formData);
        this.setState({...this.state, formData: formData, validator2: validator2});
    }

    onChangePasswordClicked(event) {

        let {validator2, formData} = this.state;
        event.preventDefault();
        if (!validator2.isValidData(formData)) {
            this.setState({...this.state, validator2: validator2});
            return false;
        }

        this.props.doUserPasswordChange(this.state.formData).then(() => {
            swal(
                T.translate('Success!'),
                T.translate('Your user password has been changed!'),
                'success'
            );
            this.props.history.push('/')
        });
    }

    render() {

        let {validator, resetRequest, sent, token, formData, validator2 } = this.state;
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6" xs="12">
                            <Card className="mx-4">
                                { token != null &&
                                    <CardBody className="p-4">
                                        <h1>{T.translate("Change Password")}</h1>
                                        <p className="text-muted">{T.translate("Password must contain one lowercase letter, one number, and be at least 8 characters long")}</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password"
                                                   placeholder={T.translate("Password")}
                                                   id="password" name="password"
                                                   onChange={this.handleChange2}
                                                   invalid={validator2.isInvalid('password')}
                                                   value={formData.password}
                                            />
                                            <FormFeedback valid={validator2.isValid('password')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator2.getValidationErrorMessage('password')}</FormFeedback>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" id="password_confirmation"
                                                   name="password_confirmation"
                                                   placeholder={T.translate("Password Confirmation")}
                                                   onChange={this.handleChange2}
                                                   invalid={validator2.isInvalid('password_confirmation')}
                                                   value={formData.password_confirmation}
                                            />
                                            <FormFeedback valid={validator2.isValid('password_confirmation')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator2.getValidationErrorMessage('password_confirmation')}</FormFeedback>
                                        </InputGroup>
                                        <Button color="primary" className="px-4"
                                                onClick={this.onChangePasswordClicked}
                                                block>{T.translate("Change Password")}</Button>
                                    </CardBody>
                                }
                                {token == null && !sent &&
                                <CardBody className="p-4">
                                    <h1>{T.translate("Reset your password")}</h1>
                                    <p className="text-muted">{T.translate("Enter your email address and we will send you a link to reset your password")}</p>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>@</InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" name="email" id="email"
                                               onChange={this.handleChange}
                                               invalid={validator.isInvalid('email')}
                                               value={resetRequest.email}
                                               placeholder={T.translate("Enter your email address")}/>
                                        <FormFeedback valid={validator.isValid('email')}><i
                                            className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('email')}
                                        </FormFeedback>
                                    </InputGroup>
                                    <Button color="primary" className="px-4"
                                            onClick={this.onResetClicked}
                                            block>{T.translate("Send password reset email")}</Button>
                                </CardBody>
                                }
                                {token == null && sent &&
                                <CardBody className="p-4">
                                    <h1>{T.translate("Reset your password")}</h1>
                                    <p className="text-muted">{T.translate("Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder")}</p>
                                    <Button color="primary" className="px-4"
                                            onClick={this.onBack}
                                            block>{T.translate("Return to login")}</Button>
                                </CardBody>
                                }
                                <CardFooter className="p-4">

                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = ({ loggedUserState }) => ({
    currentUser: loggedUserState.currentUser,
});

export default connect(
    mapStateToProps,
    {
        resetPasswordRequest,
        doUserPasswordChange,
    }
)(ResetPasswordPage);