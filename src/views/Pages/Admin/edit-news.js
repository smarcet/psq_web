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
    Label,
    Input,
    FormFeedback,
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import 'sweetalert2/dist/sweetalert2.css';
import swal from 'sweetalert2';
import {FormValidator, MandatoryField} from "../../../utils/form-validator";
import {connect} from "react-redux";
import {addNews, getNewById, updateNews} from "../../../actions/Admin/news-actions";

class AdminEditNewsItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentEditNews: this.props.currentEditNews,
            validator: new FormValidator(
                [
                    new MandatoryField('title', T.translate('Title')),
                    new MandatoryField('body', T.translate('Body')),
                ]
            )
        };
         this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        let newsId = this.props.match.params.news_id;
        if (typeof newsId != 'undefined' && newsId > 0) {
            this.props.getNewById(newsId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentEditNews.id != this.state.currentEditNews.id)
            this.setState({...this.state,
                currentEditNews: {
                    ...nextProps.currentEditNews
                }
            });
    }

    handleChange(event) {

        let {currentEditNews, validator} = this.state;
        let {value, id} = event.target;

        currentEditNews[id] = value;

        validator.validate(currentEditNews);
        this.setState({...this.state, currentEditNews: currentEditNews, validator: validator});
    }

    onSave(event) {
        let {currentEditNews, validator} = this.state;

        event.preventDefault();
        if (!validator.isValidData(currentEditNews)) {
            this.setState({...this.state, validator: validator});
            return false;
        }

        if (this.state.currentEditNews.id > 0)
            this.props.updateNews(this.state.currentEditNews).then(() => {
                swal(
                    '',
                    T.translate('News has been successfully updated!'),
                    'success'
                );
                this.props.history.goBack();
            });
        else {
            this.props.addNews(this.state.currentEditNews).then(() => {
                swal(
                    '',
                    T.translate('News has been successfully created!'),
                    'success'
                );
                this.props.history.goBack();
            });
        }
    }

    onCancelEdit(event) {
        this.props.history.goBack();
        event.preventDefault();
    }

    render(){
        let {currentEditNews, validator} = this.state;
        return (
            <Row>
                <Col xs="12" md="12">
                    <Card>
                        <CardHeader>
                            <strong>New News Item</strong>
                        </CardHeader>
                        <CardBody>
                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">

                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="title">{T.translate("Title")}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text"
                                               value={currentEditNews.title}
                                               onChange={this.handleChange}
                                               invalid={validator.isInvalid('title')}
                                               id="title" name="title" placeholder={T.translate("News Title")}/>
                                        <FormFeedback valid={validator.isValid('title')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('title')}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="bodyt">{T.translate("Body")}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="textarea"
                                               name="body"
                                               id="body"
                                               rows="9"
                                               onChange={this.handleChange}
                                               invalid={validator.isInvalid('body')}
                                               value={currentEditNews.body}
                                               placeholder={T.translate("News Body")}/>
                                        <FormFeedback valid={validator.isValid('body')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('body')}</FormFeedback>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <Button type="submit" size="sm" color="primary" onClick={(e) => this.onSave(e)}><i
                                className="fa fa-dot-circle-o"></i>&nbsp;{T.translate('Save')}</Button>{' '}
                            <Button type="reset" size="sm" color="danger" onClick={(e) => this.onCancelEdit(e)}><i
                                className="fa fa-ban"></i>&nbsp;{T.translate('Cancel')}</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        );
    }
}


const mapStateToProps = ({adminEditNewsState}) => ({
    currentEditNews: adminEditNewsState.currentEditNews,
});

export default connect(
    mapStateToProps,
    {
        getNewById,
        updateNews,
        addNews
    }
)(AdminEditNewsItem);