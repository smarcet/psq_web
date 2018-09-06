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
    FormFeedback
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import 'sweetalert2/dist/sweetalert2.css';
import swal from 'sweetalert2';
import SearchBar from "../../../components/SearchBar/SearchBar";
import {FormValidator, MandatoryField} from "../../../utils/form-validator";
import Table from "react-bootstrap/es/Table";
import {connect} from "react-redux";
import {DEFAULT_PAGE_SIZE} from "../../../constants";
import {getUserGroup, createUserGroup, updateUserGroup, searchAllowedUsers} from "../../../actions/Admin/user-groups-actions";
import {getMyDevicesByPage} from "../../../actions/Admin/devices-actions";

class AdminEditUserGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentEditGroup: this.props.currentEditGroup,
            validator: new FormValidator(
                [
                    new MandatoryField('name', T.translate('Name')),
                    new MandatoryField('device', T.translate('Device')),
                ]
            )
        };

        this.handleChangeSearchTerm = this.handleChangeSearchTerm.bind(this);
        this.handleLinkItem = this.handleLinkItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChangeSearchTerm(term) {
        this.props.searchAllowedUsers(term, DEFAULT_PAGE_SIZE);
    }

    handleLinkItem(user) {
        this.setState({...this.state, currentEditGroup: {...this.state.currentEditGroup, members : [...this.state.currentEditGroup.members, user]}});
    }

    getDisplayName(item) {
        return `${item.first_name} ${item.last_name} (${item.email})`;
    }

    componentWillMount() {
        let groupId = this.props.match.params.group_id;
        if (typeof groupId != 'undefined' && groupId > 0) {
            this.props.getUserGroup(groupId);
        }
        return this.props.getMyDevicesByPage(1, 9999999999);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentEditGroup.id != this.state.currentEditGroup.id)
            this.setState({...this.state,
                currentEditGroup: {
                    ...nextProps.currentEditGroup
                }
            });
    }

    handleChange(event) {

        let {currentEditGroup, validator} = this.state;
        let {value, id} = event.target;

        if (event.target.type == 'select-one' && value == '0') {
            value = '';
        }

        currentEditGroup[id] = value;

        validator.validate(currentEditGroup);
        this.setState({...this.state, currentEditGroup: currentEditGroup, validator: validator});
    }


    onSave(event) {
        let {currentEditGroup, validator} = this.state;
        event.preventDefault();
        if (!validator.isValidData(currentEditGroup)) {
            this.setState({...this.state, validator: validator});
            return false;
        }


        if (currentEditGroup.id > 0)
            this.props.updateUserGroup(currentEditGroup).then(() => {
                swal(
                    '',
                    T.translate('User Group has been successfully updated!'),
                    'success'
                );
                this.props.history.goBack();
            });
        else {
            this.props.createUserGroup(currentEditGroup).then(() => {
                swal(
                    '',
                    T.translate('User Group has been successfully created!'),
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

    render() {

        let { matchedUsers, allowedDevices } = this.props;
        let {currentEditGroup, validator} = this.state;
        let {members} = currentEditGroup;
        matchedUsers = matchedUsers.filter((m) => {
            for(let i = 0 ; i < members.length ; i++)
                if(members[i].id == m.id)
                    return false;
            return true;
        });

        return (
            <Row>
                <Col xs="12" md="12">
                    <Card>
                        <CardHeader>
                            <strong>{T.translate("New User Group")}</strong>
                        </CardHeader>
                        <CardBody>
                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="name">{T.translate("Name")}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="name" name="name"
                                               value={currentEditGroup.name}
                                               onChange={this.handleChange}
                                               invalid={validator.isInvalid('name')}
                                               placeholder={T.translate("Group Name")}/>
                                        <FormFeedback valid={validator.isValid('name')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('name')}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="device">{T.translate("Device")}</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="select"
                                               name="device"
                                               id="device"
                                               value={currentEditGroup.device != null ? currentEditGroup.device.id : ''}
                                               onChange={this.handleChange}
                                               invalid={validator.isInvalid('device')}>
                                            <option value="0">{T.translate('-- Please select a Device --')}</option>
                                            {
                                                   allowedDevices.map((item, idx) =>
                                                    <option
                                                        key={item.id}
                                                        value={item.id.toString()}>{item.friendly_name}</option>
                                                )
                                            }
                                        </Input>
                                        <FormFeedback valid={validator.isValid('device')}><i className="fa fa-exclamation-triangle"></i>&nbsp;{validator.getValidationErrorMessage('device')}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="users">{T.translate("Members")}</Label>
                                    </Col>
                                    <Col xs="12" md="12">
                                        <Row>
                                            <Col>
                                                <SearchBar
                                                    currentItems={matchedUsers}
                                                    searchPlaceHolder={T.translate("Search Users")}
                                                    handleChangeSearchTerm={this.handleChangeSearchTerm}
                                                    getDisplayName={this.getDisplayName}
                                                    onClickPrimaryAction={this.handleLinkItem}
                                                    primaryActionClass="button-add"
                                                    primaryActionName={T.translate("Link User")}
                                                    useSecondaryAction={false}
                                                    searchId={"members"}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Table responsive striped>
                                                    <thead>
                                                    <tr>
                                                        <th>{T.translate("Id")}</th>
                                                        <th>{T.translate("First Name")}</th>
                                                        <th>{T.translate("Surname")}</th>
                                                        <th>{T.translate("Email")}</th>
                                                        <th>{T.translate("Rol")}</th>
                                                        <th>{T.translate("Status")}</th>
                                                        <th>&nbsp;</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        members.map((member, i) => {

                                                            return (
                                                                <tr key={i}>
                                                                    <td>{member.id}</td>
                                                                    <td>{member.first_name}</td>
                                                                    <td>{member.last_name}</td>
                                                                    <td>{member.email}</td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                </tr>);
                                                        })
                                                    }
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>
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

const mapStateToProps = ({adminEditUserGroupState}) => ({
    currentEditGroup: adminEditUserGroupState.currentEditGroup,
    matchedUsers: adminEditUserGroupState.matchedUsers,
    allowedDevices:  adminEditUserGroupState.allowedDevices,
});

export default connect(
    mapStateToProps,
    {
        searchAllowedUsers,
        getUserGroup,
        getMyDevicesByPage,
        updateUserGroup,
        createUserGroup
    }
)(AdminEditUserGroup);