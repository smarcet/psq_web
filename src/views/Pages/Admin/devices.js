import React, {Component} from 'react';
import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Button,
    Input
} from 'reactstrap';

import T from 'i18n-react';
import 'sweetalert2/dist/sweetalert2.css';
import { connect } from 'react-redux'
import PaginationContainer from "../../Base/PaginationContainer/PaginationContainer";
import {DEFAULT_PAGE_SIZE} from "../../../constants";
import {getMyDevicesByPage} from "../../../actions/Admin/devices-actions";


class AdminDevices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        };
        this.onPageClick = this.onPageClick.bind(this);
        this.handleOnChangeSearch = this.handleOnChangeSearch.bind(this);
    }

    componentWillMount () {
        this.props.getMyDevicesByPage(this.state.currentPage);
    }

    handleOnChangeSearch(event){
        let {value} = event.target;
        this.setState({...this.state, currentPage: 1});
        this.props.getMyDevicesByPage(1, DEFAULT_PAGE_SIZE, value);
    }

    onPageClick(event, pageNumber){
        this.setState({...this.state, currentPage: pageNumber});
        this.props.getMyDevicesByPage(pageNumber);
        event.preventDefault();
    }

    onClickEditDevice(e, device){
        this.props.history.push(`/auth/admin/devices/${device.id}`);
    }

    onClickTransferDeviceOwnership(event, device){
        event.preventDefault();
    }

    render(){

        let { devices, currentUser } = this.props;
        let currentUserIid = currentUser.id;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i>&nbsp;{T.translate('Devices')}
                            </CardHeader>
                            <CardBody>
                                <Row className="search-container">
                                    <Col xs="12" sm="4" lg="4" >
                                        <Input type="text"
                                               className="input-search"
                                               id="search_devices"
                                               name="search_devices"
                                               placeholder={T.translate("Search Devices")}
                                               onChange={this.handleOnChangeSearch}/>
                                        <i className="fa fa-search filter-search"></i>
                                    </Col>
                                    <Col xs="12" sm="4" lg="3" >
                                        &nbsp;
                                    </Col>
                                </Row>
                                 <Table responsive striped>
                                    <thead>
                                    <tr>
                                        <th>{T.translate("Id")}</th>
                                        <th>{T.translate("Serial #")}</th>
                                        <th>{T.translate("Friendly Name")}</th>
                                        <th>{T.translate("Owner")}</th>
                                        <th>{T.translate("Slots")}</th>
                                        <th>{T.translate("Status")}</th>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    { devices.map((device, i) => {
                                        let ownerId = device.owner != null ? device.owner.id : null;
                                        let ownerEmail = device.owner != null ? device.owner.email : T.translate('Not Set');
                                        return (

                                            <tr key={device.id}>
                                                <td>{device.id}</td>
                                                <td>{device.serial}</td>
                                                <td>{device.friendly_name}</td>
                                                <td>{ownerEmail}</td>
                                                <td>{device.slots}</td>
                                                <td>
                                                    {
                                                        device.is_active &&
                                                        <Badge color="success">{T.translate("Active")}</Badge>
                                                    }
                                                    {
                                                        !device.is_active &&
                                                        <Badge color="secondary">{T.translate("Disabled")}</Badge>
                                                    }
                                                </td>
                                                <td className="col-button">
                                                    <Button outline color="primary" onClick={(e) => this.onClickEditDevice(e, device)}><i className="fa fa-edit"></i>&nbsp;{T.translate("Edit")}</Button>
                                                </td>
                                                <td className="col-button">
                                                    { ownerId == currentUserIid &&
                                                        <Button outline color="warning"
                                                                onClick={(e) => this.onClickTransferDeviceOwnership(e, device)}><i
                                                            className="fa fa-exchange"></i>&nbsp;{T.translate("Transfer Ownership")}
                                                        </Button>
                                                    }

                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </Table>
                                <PaginationContainer
                                    count={this.props.devicesCount}
                                    pageSize={DEFAULT_PAGE_SIZE}
                                    currentPage={this.state.currentPage}
                                    onPageClick={this.onPageClick}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>);
    }
}

const mapStateToProps = ({ adminDevicesState, loggedUserState }) => ({
    devices : adminDevicesState.items,
    devicesCount : adminDevicesState.count,
    currentUser: loggedUserState.currentUser,
});

export default connect (
    mapStateToProps,
    {
        getMyDevicesByPage,
    }
)(AdminDevices);