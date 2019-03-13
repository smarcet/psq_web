import React, {Component} from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    Button,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormFeedback
} from 'reactstrap';
import swal from "sweetalert2";
import T from "i18n-react/dist/i18n-react";
import {EqualToField, FormValidator, MandatoryField, MinSizeField} from "../../../utils/form-validator";
import {doUserPasswordChange, resetPasswordRequest} from "../../../actions/users-actions";
import {doLogout} from "../../../actions/auth-actions";
import {connect} from "react-redux";

class ActivateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                password: '',
                password_confirmation: '',
                token: this.props.match.params.token
            },
            validator: new FormValidator(
                [
                    new MandatoryField('password',
                        T.translate('Password')
                    ),
                    new MandatoryField('password_confirmation',
                        T.translate('Password Confirmation')
                    ),
                    new EqualToField('password', 'password_confirmation', T.translate('Password'),
                        T.translate('Password Confirmation')
                    ),
                    new MinSizeField('password', 8, T.translate('Password')
                    ),
                    new MinSizeField('password_confirmation', 8,
                        T.translate('Password Confirmation')
                    )
                ]
            )
        };
        this.onActivateAccountClicked = this.onActivateAccountClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(event){
        if (event.charCode == 13) {
            this.onActivateAccountClicked(event)
        }
    }

    componentWillMount(){

        if(this.props.currentUser != null)
        {
            console.log("user is already logged")
            this.props.doLogout();
        }
    }

    handleChange(event) {
        let {formData, validator} = this.state;
        let {value, id} = event.target;
        formData[id] = value;
        validator.validate(formData);
        this.setState({...this.state, formData: formData, validator: validator});
    }

    onActivateAccountClicked(event) {

        let {validator, formData} = this.state;
        event.preventDefault();
        if (!validator.isValidData(formData)) {
            this.setState({...this.state, validator: validator});
            return false;
        }

        this.props.doActivateUser(this.state.formData).then(() => {
            swal(
                T.translate('Success!'),
                T.translate('Your user has been successfully activated!'),
                'success'
            );
            this.props.history.push('/')
        });
    }

    render() {
        let {validator, formData} = this.state;
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <h1>{T.translate("User Activation")}</h1>
                                    <p className="text-muted">{T.translate('Activate your account')}</p>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-lock"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="password"
                                               onKeyPress={this.handleKeyPress}
                                               placeholder={T.translate("Password")}
                                               id="password" name="password"
                                               onChange={this.handleChange}
                                               invalid={validator.isInvalid('password')}
                                               value={formData.password}
                                        />
                                        <FormFeedback valid={validator.isValid('password')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('password')}</FormFeedback>
                                    </InputGroup>
                                    <InputGroup className="mb-4">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-lock"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="password" id="password_confirmation"
                                               name="password_confirmation"
                                               onKeyPress={this.handleKeyPress}
                                               placeholder={T.translate("Password Confirmation")}
                                               onChange={this.handleChange}
                                               invalid={validator.isInvalid('password_confirmation')}
                                               value={formData.password_confirmation}
                                              />
                                        <FormFeedback valid={validator.isValid('password_confirmation')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('password_confirmation')}</FormFeedback>
                                    </InputGroup>
                                    <Button color="primary" className="px-4" block
                                            onClick={this.onActivateAccountClicked}>{T.translate("Activate Account")}</Button>
                                </CardBody>
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
        doLogout,
    }
)(ActivateUser);
