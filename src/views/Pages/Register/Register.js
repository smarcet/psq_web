import React, {Component} from 'react';
import {
    Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import {getBackURL} from "../../../utils/methods";

class Register extends Component {

    constructor(props) {
        super(props);
        this.onLoginClicked = this.onLoginClicked.bind(this);
    }

    onLoginClicked(event) {
        let {history} = this.props;
        let backUrl = getBackURL();
        history.push(`/?BackUrl=${encodeURIComponent(backUrl)}`);
    }

    render() {
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
                                        <Input type="text" placeholder={T.translate("Email")}/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-user"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" placeholder={T.translate("First name")}/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-user"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" placeholder={T.translate("Surname")}/>
                                    </InputGroup>
                                    <Button color="success" block>{T.translate("Create Account")}</Button>
                                </CardBody>
                                <CardFooter className="p-4">
                                    <Row>
                                        <Col xs="12" sm="12">
                                            <p>{T.translate("Or if you already have an PSQ User")}</p>
                                            <p className="login-button-container">
                                                <Button onClick={this.onLoginClicked}>{T.translate("Log In")}</Button>
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

export default Register;
