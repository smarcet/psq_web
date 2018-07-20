import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    CardBody
} from 'reactstrap';
import {Line} from 'react-chartjs-2';
import T from 'i18n-react';
import {connect} from 'react-redux'
import {getSuperAdminDashBoardReport} from "../../../actions/superAdmin/dashboard-actions";

const brandPrimary = '#20a8d8';
const brandInfo = '#63c2de';


class SuperAdminDashBoard extends Component {

    componentWillMount() {
        this.props.getSuperAdminDashBoardReport();
    }

    render() {

        const monthNames = [
            T.translate("January"),
            T.translate("February"),
            T.translate("March"),
            T.translate("April"),
            T.translate("May"),
            T.translate("June"),
            T.translate("July"),
            T.translate("August"),
            T.translate("September"),
            T.translate("October"),
            T.translate("November"),
            T.translate("December")
        ];

        const now = new Date();
        const monthQty = 6;
        let monthQtyAux = monthQty;
        let monthLabels = [];
        for(let i = now.getMonth(); monthQtyAux > 0; --monthQtyAux, --i){
            monthLabels.push(monthNames[i])
        }
        monthLabels = monthLabels.reverse();


        // card 1
        const cardChartData1 = {
            labels:monthLabels,
            datasets: [
                {
                    label: T.translate('Registered Devices'),
                    backgroundColor: brandPrimary,
                    borderColor: 'rgba(255,255,255,.55)',
                    data: this.props.devices_per_month
                }
            ],
        };

        const cardChartOpts1 = {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        color: 'transparent',
                        zeroLineColor: 'transparent'
                    },
                    ticks: {
                        fontSize: 2,
                        fontColor: 'transparent',
                    }

                }],
                yAxes: [{
                    display: false,
                    ticks: {
                        display: false,
                        min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
                        max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
                    }
                }],
            },
            elements: {
                line: {
                    borderWidth: 1
                },
                point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                },
            }
        }

        // Card Chart 2
        const cardChartData2 = {
            labels: monthLabels,
            datasets: [
                {
                    label: T.translate('Registered Users'),
                    backgroundColor: brandInfo,
                    borderColor: 'rgba(255,255,255,.55)',
                    data: this.props.users_per_month
                }
            ],
        };

        const cardChartOpts2 = {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        color: 'transparent',
                        zeroLineColor: 'transparent'
                    },
                    ticks: {
                        fontSize: 2,
                        fontColor: 'transparent',
                    }

                }],
                yAxes: [{
                    display: false,
                    ticks: {
                        display: false,
                        min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
                        max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
                    }
                }],
            },
            elements: {
                line: {
                    tension: 0.00001,
                    borderWidth: 1
                },
                point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                },
            }
        }
        let totalUsers = this.props.super_admin_user_qty + this.props.admin_user_qty + this.props.raw_user_qty;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6" lg="6">
                        <Card className="text-white bg-primary">
                            <CardBody className="pb-0">
                                <h4 className="mb-0">{T.translate("Total Registered Devices {devices}", {devices: this.props.devices_qty})}</h4>
                                <p>{T.translate('Registered Devices in last {months} months',{ months : monthQty })}</p>
                            </CardBody>
                            <div className="chart-wrapper px-3" style={{height: '120px'}}>
                                <Line data={cardChartData1} options={cardChartOpts1} height={70}/>
                            </div>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6" lg="6">
                        <Card className="text-white bg-info">
                            <CardBody className="pb-0">
                                <h4 className="mb-0">{T.translate("Total Registered Users {users}", {users: totalUsers})}</h4>
                                <p>{T.translate('Registered Users in last {months} months',{ months : monthQty })}</p>
                            </CardBody>
                            <div className="chart-wrapper px-3" style={{height: '120px'}}>
                                <Line data={cardChartData2} options={cardChartOpts2} height={70}/>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>)
    }
}


const mapStateToProps = ({superAdminDashboardState}) => ({
    users_per_month: superAdminDashboardState.users_per_month,
    devices_per_month: superAdminDashboardState.devices_per_month,
    super_admin_user_qty: superAdminDashboardState.super_admin_user_qty,
    admin_user_qty: superAdminDashboardState.admin_user_qty,
    raw_user_qty: superAdminDashboardState.raw_user_qty,
    devices_qty: superAdminDashboardState.devices_qty,
});

export default connect(
    mapStateToProps,
    {
        getSuperAdminDashBoardReport,
    }
)(SuperAdminDashBoard);