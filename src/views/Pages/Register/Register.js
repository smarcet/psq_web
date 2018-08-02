import React, {Component} from 'react';
import {
    Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText,
    FormFeedback
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import {getBackURL} from "../../../utils/methods";
import {FormValidator, MandatoryField, EmailField} from "../../../utils/form-validator";
import swal from "sweetalert2";
import {connect} from "react-redux";
import {registerGuestUser} from '../../../actions/users-actions';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentGuestRegistration: {
                email: '',
                first_name: '',
                last_name: '',
            },
            validator: new FormValidator(
                [
                    new MandatoryField('email', T.translate('Email')),
                    new EmailField('email', T.translate('Email')),
                    new MandatoryField('first_name', T.translate('First Name')),
                    new MandatoryField('last_name', T.translate('Surname')),
                ]
            )
        };
        this.onLoginClicked = this.onLoginClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onRegisterGuestUser = this.onRegisterGuestUser.bind(this);
    }

    handleChange(event) {
        let {currentGuestRegistration, validator} = this.state;
        let {value, id} = event.target;
        currentGuestRegistration[id] = value;
        validator.validate(currentGuestRegistration);
        this.setState({...this.state, currentGuestRegistration: currentGuestRegistration, validator: validator});
    }

    onLoginClicked(event) {
        let {history} = this.props;
        let backUrl = getBackURL();
        history.push(`/?BackUrl=${encodeURIComponent(backUrl)}`);
    }

    onRegisterGuestUser(event){
        let {validator, currentGuestRegistration} = this.state;
        event.preventDefault();
        if (!validator.isValidData(currentGuestRegistration)) {
            this.setState({...this.state, validator: validator});
            return false;
        }

        this.props.registerGuestUser(this.state.currentGuestRegistration).then(() => {
            swal(
                '',
                T.translate("Your user has been registered."),
                'success'
            );
            this.props.history.goBack();
        });
    }

    render() {
        let {validator, currentGuestRegistration} = this.state;
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <h1>{T.translate("Register")}</h1>
                                    <p className="text-muted">{T.translate("Create your Guest account")}</p>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>@</InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" name="email" id="email"
                                               onChange={this.handleChange}
                                               invalid={validator.isInvalid('email')}
                                               value={currentGuestRegistration.email}
                                               placeholder={T.translate("Email")}/>
                                        <FormFeedback valid={validator.isValid('email')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('email')}</FormFeedback>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-user"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text"
                                               id="first_name" name="first_name"
                                               onChange={this.handleChange}
                                               invalid={validator.isInvalid('first_name')}
                                               value={currentGuestRegistration.first_name}
                                               placeholder={T.translate("First name")}/>
                                        <FormFeedback valid={validator.isValid('first_name')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('first_name')}</FormFeedback>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-user"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" id="last_name"
                                               name="last_name"
                                               onChange={this.handleChange}
                                               invalid={validator.isInvalid('last_name')}
                                               value={currentGuestRegistration.last_name}
                                               placeholder={T.translate("Surname")}/>
                                        <FormFeedback valid={validator.isValid('last_name')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('last_name')}</FormFeedback>
                                    </InputGroup>
                                    <Button color="primary" className="px-4"
                                            onClick={this.onRegisterGuestUser} block>{T.translate("Create Account")}</Button>
                                </CardBody>
                                <CardFooter className="p-4">
                                    <Row>
                                        <Col xs="12" sm="12">
                                            <p>{T.translate("Or if you already have an PSQ User")}</p>
                                            <p className="login-button-container">
                                                <Button
                                                    color="primary" className="px-4"
                                                    onClick={this.onLoginClicked}>{T.translate("Log In")}</Button>
                                            </p>
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}


const mapStateToProps = () => ({

});

export default connect(
    mapStateToProps,
    {
        registerGuestUser,
    }
)(Register);