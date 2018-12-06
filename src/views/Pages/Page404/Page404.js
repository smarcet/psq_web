import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import T from "i18n-react";

class Page404 extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">404</h1>
                <h4 className="pt-3">{T.translate("Oops! You are lost")}</h4>
                <p className="text-muted float-left">{T.translate("The page you are looking for was not found")}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Page404;
