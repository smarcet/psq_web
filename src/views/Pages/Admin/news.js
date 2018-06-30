import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    Input
} from 'reactstrap';
import T from "i18n-react/dist/i18n-react";
import 'sweetalert2/dist/sweetalert2.css';
import swal from 'sweetalert2';

class AdminNews extends Component {

    onClickAddNewsItem(e){
        this.props.history.push("/auth/admin/news/new");
    }

    onClickDeleteNewsItem(event, exercise){

        swal({
            title: T.translate("Are you sure?"),
            text: T.translate("You will not be able to recover this news item!"),
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                swal(
                    T.translate("Deleted!"),
                    T.translate("Your news item has been deleted."),
                    'success'
                )
            }
        })
        event.preventDefault();
    }

    onClickEditNewsItem(event, newsItem){
        this.props.history.push(`/auth/admin/news/${newsItem.id}`);
        event.preventDefault();
    }

    render(){

        let news = [
            {
                id:1,
                title: 'News #1',
                desc: 'Lorep ip sum',
                date: "01/01/2018 10:00 AM",

            },
            {
                id:2,
                title: 'News #2',
                desc: 'Lorep ip sum',
                date: "01/01/2018 10:30 AM",
            },
        ];

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> {T.translate("Title")}
                            </CardHeader>
                            <CardBody>
                                <Row className="search-container">
                                    <Col xs="12" sm="4" lg="4" >
                                        <Input type="text" className="input-search" id="input1-group2" name="input1-group2" placeholder={T.translate("Search New")}/>
                                        <i className="fa fa-search filter-search"></i>
                                    </Col>
                                    <Col xs="12" sm="4" lg="3" >
                                        <Button onClick={(e) => this.onClickAddNewsItem(e)} className="button-add" color="primary">
                                            <i className="fa fa-plus-circle"></i>{'\u00A0'} {T.translate("Add Bew")}
                                        </Button>
                                    </Col>
                                </Row>
                                <Table responsive striped>
                                    <thead>
                                    <tr>
                                        <th>{T.translate("Id")}</th>
                                        <th>{T.translate("Title")}</th>
                                        <th>{T.translate("Description")}</th>
                                        <th>{T.translate("Date")}</th>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    { news.map((news_item ,i) => {

                                        return (
                                            <tr key={news_item.id}>
                                                <td>{news_item.id}</td>
                                                <td>{news_item.title}</td>
                                                <td>{news_item.desc}</td>
                                                <td>{news_item.date}</td>
                                                <td className="col-button">
                                                    <Button color="primary" onClick={(e) => this.onClickEditNewsItem(e, news_item)}outline><i className="fa fa-edit"></i>&nbsp;{T.translate("Edit")}</Button>
                                                </td>
                                                <td className="col-button">
                                                    <Button color="danger" onClick={(e) => this.onClickDeleteNewsItem(e, news_item)} outline><i className="fa fa-trash"></i>&nbsp;{T.translate("Delete")}</Button>
                                                </td>

                                            </tr>
                                        );
                                    })}

                                    </tbody>
                                </Table>
                                <Pagination>
                                    <PaginationItem disabled><PaginationLink previous href="#">Prev</PaginationLink></PaginationItem>
                                    <PaginationItem active>
                                        <PaginationLink href="#">1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink href="#">4</PaginationLink></PaginationItem>
                                    <PaginationItem><PaginationLink next href="#">Next</PaginationLink></PaginationItem>
                                </Pagination>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>);
    }
}

export default AdminNews;