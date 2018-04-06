import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    CardBody
} from 'reactstrap';
import Widget02 from "../../Widgets/Widget02";
import {Bar, Line} from 'react-chartjs-2';
import T from "i18n-react/dist/i18n-react";

const brandPrimary = '#20a8d8';
const brandSuccess = '#4dbd74';
const brandInfo = '#63c2de';
const brandWarning = '#f8cb00';
const brandDanger = '#f86c6b';

const cardChartData1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Exams',
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

class AdminDashBoard extends Component {
    render(){
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6" lg="6">
                        <Widget02 header="15" mainText="Users" icon="fa fa-user" color="primary" footer link="users"/>
                    </Col>
                    <Col xs="12" sm="6" lg="6">
                        <Widget02 header="6" mainText="Groups" icon="fa fa-users" color="primary" footer link="user-groups"/>
                    </Col>
                    <Col xs="12" sm="6" lg="6">
                        <Widget02 header="6" mainText="Devices" icon="fa fa-video-camera" color="primary" footer link="devices"/>
                    </Col>
                    <Col xs="12" sm="6" lg="6">
                        <Widget02 header="1" mainText="Pending Exams" icon="fa fa-pencil" color="primary" footer link="exams"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" lg="12">
                        <Card className="text-white bg-primary">
                            <CardBody className="pb-0">
                                <h4 className="mb-0">Monthly Exams</h4>
                            </CardBody>
                            <div className="chart-wrapper px-3" style={{height:'120px'}}>
                                <Line data={cardChartData1} options={cardChartOpts1} height={70}/>
                            </div>
                        </Card>
                    </Col>
                </Row>
        </div>)
    }
}

export default AdminDashBoard;