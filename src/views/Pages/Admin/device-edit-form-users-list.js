import React, {Component} from 'react';
import {
    Row,
    Col,
    Button,
    Table,
    Badge
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import SearchBar from "../../../components/SearchBar/SearchBar";

class DeviceEditFormUsersList extends Component {

    getDisplayName(user){
        return `${user.first_name} ${user.last_name} (${user.email})`;
    }

    render() {
        let { availableSlots, deviceUsers, onClickUnlinkUser, handleLinkItem, handleChangeSearchTerm, matchedUsers, onClickAddUser, searchId } = this.props;

        return (
            <Row>
                <Col xs="12" md="12" lg="12">
                    <SearchBar
                        currentItems={matchedUsers}
                        searchPlaceHolder={T.translate("Search Users")}
                        handleChangeSearchTerm={handleChangeSearchTerm}
                        handleLinkItem={handleLinkItem}
                        getDisplayName={this.getDisplayName}
                        onClickPrimaryAction={handleLinkItem}
                        primaryActionClass="button-add"
                        primaryActionName={T.translate("Link User")}
                        useSecondaryAction={true}
                        secondaryActionClass="button-add"
                        secondaryActionName={T.translate("Add User")}
                        onClickSecondaryAction={onClickAddUser}
                        searchId={searchId}
                    />
                    <Row className="available-slots-container">
                        <Col md="4">
                            <span>{T.translate("Available Slots")} <Badge pill color="secondary">{availableSlots}</Badge></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            {
                                !deviceUsers.length &&
                                <p>{T.translate("List is empty")}</p>
                            }
                            {deviceUsers.length > 0 &&
                                <Table responsive striped>
                                    <thead>
                                    <tr>
                                        <th>{T.translate("Id")}</th>
                                        <th>{T.translate("Email")}</th>
                                        <th>{T.translate("First Name")}</th>
                                        <th>{T.translate("SurName")}</th>
                                        <th>{T.translate("Status")}</th>
                                        <th>{T.translate("Role")}</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {deviceUsers.map((user, i) => {

                                        return (
                                            <tr key={i}>
                                                <td>{user.id}</td>
                                                <td>{user.email}</td>
                                                <td>{user.first_name}</td>
                                                <td>{user.last_name}</td>
                                                <td>
                                                    {
                                                        user.is_active &&
                                                        <Badge color="success">{T.translate("Active")}</Badge>
                                                    }
                                                    {
                                                        !user.is_active &&
                                                        <Badge color="secondary">{T.translate("Disabled")}</Badge>
                                                    }
                                                </td>
                                                <td>{user.role}</td>
                                                <td>
                                                    <Button onClick={(e) => {
                                                        onClickUnlinkUser(e, user);
                                                    }} outline
                                                            color="danger">{T.translate("Unlink")}</Button>{' '}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </Table>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default DeviceEditFormUsersList;