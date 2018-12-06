import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    CardBody
} from 'reactstrap';
import Widget02 from "../../Widgets/Widget02";
import {Bar, Line} from 'react-chartjs-2';
import T from 'i18n-react';
import {connect} from 'react-redux'
import {getAdminDashBoardReport} from "../../../actions/Admin/dashboard-actions"

const brandPrimary = '#20a8d8';
const brandSuccess = '#4dbd74';
const brandInfo = '#63c2de';
const brandWarning = '#f8cb00';
const brandDanger = '#f86c6b';

class AdminDashBoard extends Component {

    componentWillMount() {
        this.props.getAdminDashBoardReport();
    }

    render(){
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
                    label: T.translate('Exams evaluated per month'),
                    backgroundColor: brandPrimary,
                    borderColor: 'rgba(255,255,255,.55)',
                    data: this.props.exams_evaluated_per_month
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

        // card 2
        const cardChartData2 = {
            labels:monthLabels,
            datasets: [
                {
                    label: T.translate('Exams approved per month'),
                    backgroundColor: brandPrimary,
                    borderColor: 'rgba(255,255,255,.55)',
                    data: this.props.exams_approved_per_month
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
                    borderWidth: 1
                },
                point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                },
            }
        }

        // card 3
        const cardChartData3 = {
            labels:monthLabels,
            datasets: [
                {
                    label: T.translate('Exams rejected per month'),
                    backgroundColor: brandPrimary,
                    borderColor: 'rgba(255,255,255,.55)',
                    data: this.props.exams_reject_per_month
                }
            ],
        };

        const cardChartOpts3 = {
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
                        min: Math.min.apply(Math, cardChartData3.datasets[0].data) - 5,
                        max: Math.max.apply(Math, cardChartData3.datasets[0].data) + 5,
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

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6" lg="6">
                        <Widget02 header={this.props.users_qty.toString()}
                                  mainText={T.translate("Users")}
                                  icon="fa fa-user"
                                  color="primary"
                                  footer link="users"/>
                    </Col>
                    <Col xs="12" sm="6" lg="6">
                        <Widget02
                            header={this.props.user_groups_qty.toString()}
                            mainText={T.translate("User Groups")}
                            icon="fa fa-users" color="primary" footer link="user-groups"/>
                    </Col>
                    <Col xs="12" sm="6" lg="6">
                        <Widget02
                            header={this.props.devices_qty.toString()}
                            mainText={T.translate("Devices")}
                            icon="fa fa-video-camera" color="primary" footer link="devices"/>
                    </Col>
                    <Col xs="12" sm="6" lg="6">
                        <Widget02
                            header={this.props.pending_exams_qty.toString()}
                            mainText={T.translate("Pending Exams")}
                            icon="fa fa-pencil" color="primary" footer link="exams"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" lg="12">
                        <Card className="text-white bg-primary">
                            <CardBody className="pb-0">
                                <h4 className="mb-0">{T.translate("Total Evaluated Exams {exams}", {exams: this.props.exams_evaluated_qty})}</h4>
                                <p>{T.translate('Evaluated Exams in last {months} months',{ months : monthQty })}</p>
                            </CardBody>
                            <div className="chart-wrapper px-3" style={{height:'120px'}}>
                                <Line data={cardChartData1} options={cardChartOpts1} height={70}/>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" lg="12">
                        <Card className="text-white bg-primary">
                            <CardBody className="pb-0">
                                <h4 className="mb-0">{T.translate("Total Approved Exams {exams}", {exams: this.props.exams_approved_qty})}</h4>
                                <p>{T.translate('Approved Exams in last {months} months',{ months : monthQty })}</p>
                            </CardBody>
                            <div className="chart-wrapper px-3" style={{height:'120px'}}>
                                <Line data={cardChartData2} options={cardChartOpts2} height={70}/>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" lg="12">
                        <Card className="text-white bg-primary">
                            <CardBody className="pb-0">
                                <h4 className="mb-0">{T.translate("Total Rejected Exams {exams}", {exams: this.props.exams_reject_qty})}</h4>
                                <p>{T.translate('Rejected Exams in last {months} months',{ months : monthQty })}</p>
                            </CardBody>
                            <div className="chart-wrapper px-3" style={{height:'120px'}}>
                                <Line data={cardChartData3} options={cardChartOpts3} height={70}/>
                            </div>
                        </Card>
                    </Col>
                </Row>
        </div>)
    }
}



const mapStateToProps = ({adminDashboardState}) => ({
    exams_evaluated_per_month: adminDashboardState.exams_evaluated_per_month,
    exams_evaluated_qty: adminDashboardState.exams_evaluated_qty,
    exams_approved_per_month: adminDashboardState.exams_approved_per_month,
    exams_approved_qty: adminDashboardState.exams_approved_qty,
    exams_reject_per_month: adminDashboardState.exams_reject_per_month,
    exams_reject_qty: adminDashboardState.exams_reject_qty,
    users_qty: adminDashboardState.users_qty,
    devices_qty: adminDashboardState.devices_qty,
    pending_exams_qty: adminDashboardState.pending_exams_qty,
    user_groups_qty: adminDashboardState.user_groups_qty,
});

export default connect(
    mapStateToProps,
    {
        getAdminDashBoardReport,
    }
)(AdminDashBoard);