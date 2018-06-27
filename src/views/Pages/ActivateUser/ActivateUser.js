import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import swal from "sweetalert2";

class ActivateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                password: '',
                password_confirmation: '',
                token: this.props.match.params.token
            },
            errors: {
                password_confirmation : false,
                password: false
            },
        };
        this.onActivateAccountClicked = this.onActivateAccountClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(ev, isValid = null) {
        let formData = {...this.state.formData};
        let {value, id} = ev.target;
        let errors = this.state.errors;
        errors[id] = false;

        if(isValid != null)
            errors[id] = !isValid(ev.target);
        formData[id] = value;
        this.setState({...this.state, formData: formData, errors: errors});
    }

    onActivateAccountClicked(event){
        if(this.isValidForm())
            this.props.doActivateUser(this.state.formData).then(() => {
                swal(
                    '',
                    'Your user has been successfully activated!.',
                    'success'
                );
                this.props.history.push('/')
            });

        event.preventDefault();
    }

    isValidForm(){
        let { errors } = this.state;
        let isValid = true;
        Object.keys( errors ).forEach( key => {
            isValid = isValid && !errors[key];
        });
        return isValid;
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <h1>User Activation</h1>
                                    <p className="text-muted">Activate your account</p>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-lock"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="password"
                                               placeholder="Password"
                                               id="password" name="password"
                                               invalid={this.state.errors.password}
                                               onChange={
                                                   evt => this.handleChange(evt, (target) => {
                                                       let value = target.value.trim();
                                                       if (value == '') return false;
                                                       if (value.length <  8 ) return false;
                                                       return true;
                                                   })}
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-4">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-lock"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="password" id="password_confirmation"
                                               name="password_confirmation"
                                               invalid={this.state.errors.password_confirmation}
                                               placeholder="Password Confirmation"
                                               onChange={
                                                   evt => this.handleChange(evt, (target) => {
                                                       let confirmValue = target.value.trim();;
                                                       let value = document.getElementById('password').value.trim();
                                                       if (value == '') return false;
                                                       if (value != confirmValue) return false;
                                                       if (value.length <  8 ) return false;
                                                       return true;
                                                   })}/>
                                    </InputGroup>
                                    <Button color="success" block onClick={this.onActivateAccountClicked}>Activate Account</Button>
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

export default ActivateUser;
