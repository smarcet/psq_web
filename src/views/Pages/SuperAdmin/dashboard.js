import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    CardBody
} from 'reactstrap';
import {Bar, Line} from 'react-chartjs-2';
import T from 'i18n-react';

const brandPrimary = '#20a8d8';
const brandSuccess = '#4dbd74';
const brandInfo = '#63c2de';
const brandWarning = '#f8cb00';
const brandDanger = '#f86c6b';

const cardChartData1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Devices',
            backgroundColor: brandPrimary,
            borderColor: 'rgba(255,255,255,.55)',
            data: [65, 59, 84, 84, 51, 55, 40]
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
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Admin Users',
            backgroundColor: brandInfo,
            borderColor: 'rgba(255,255,255,.55)',
            data: [1, 18, 9, 17, 34, 22, 11]
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


class SuperAdminDashBoard extends Component {
    render(){
        return (
            <div className="animated fadeIn">
                <Row>
                <Col xs="12" sm="6" lg="6">
                    <Card className="text-white bg-primary">
                        <CardBody className="pb-0">
                            <h4 className="mb-0">8.023</h4>
                            <p>{T.translate("superAdmin.dashboard.registeredDevicesTitle")}</p>
                        </CardBody>
                        <div className="chart-wrapper px-3" style={{height:'120px'}}>
                            <Line data={cardChartData1} options={cardChartOpts1} height={70}/>
                        </div>
                    </Card>
                </Col>

                <Col xs="12" sm="6" lg="6">
                    <Card className="text-white bg-info">
                        <CardBody className="pb-0">
                            <h4 className="mb-0">9.823</h4>
                            <p>{T.translate("superAdmin.dashboard.registeredUsersTitle")}</p>
                        </CardBody>
                        <div className="chart-wrapper px-3" style={{height:'120px'}}>
                            <Line data={cardChartData2} options={cardChartOpts2} height={70}/>
                        </div>
                    </Card>
                </Col>

            </Row>
            </div>)
    }
}

export default SuperAdminDashBoard;