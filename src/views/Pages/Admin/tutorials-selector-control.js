import React, {Component} from 'react';
import {
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    FormText
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";

class TutorialsSelectorControl extends Component{

    render(){
        let {availableTutorials, handleChange, selectedTutorials, validator, fieldName} = this.props;
        return (
            <Row>
                <Col xs="12" md="9" className={validator.isInvalid(fieldName) ? "invalid-checkbox-list":""}>
                    {availableTutorials && availableTutorials.map((tutorial, i) => {
                        return (
                            <FormGroup check inline key={tutorial.id}>
                                <Input className="form-check-input multi tutorials"
                                       type="checkbox"
                                       id={`tutorial_${tutorial.id}`}
                                       onChange={handleChange}
                                       checked={selectedTutorials.filter(item => Number.isInteger(item) ? item == tutorial.id : item.id == tutorial.id ).length > 0}
                                       name={`tutorial_${tutorial.id}`}
                                       value={tutorial.id}/>
                                <Label className="form-check-label" check htmlFor={`tutorial_${tutorial.id}`}>{tutorial.title}</Label>
                            </FormGroup>
                        )
                    })
                    }
                    <FormText className="help-block">{T.translate('Please select all allowed tutorials for this exercise')}</FormText>
                    <FormFeedback valid={validator.isValid(fieldName)}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage(fieldName)}</FormFeedback>
                </Col>

            </Row>
        );
    }
}

export default TutorialsSelectorControl;