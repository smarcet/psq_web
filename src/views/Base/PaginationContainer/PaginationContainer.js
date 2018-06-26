import React, {Component} from 'react';
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";

class PaginationContainer extends Component
{

    render(){
        let {count, pageSize, currentPage, onPageClick} = this.props;

        let totalPages = Math.ceil(count/pageSize);
        let pages = [];
        for(let i = 1 ; i <= totalPages; i++){
            pages.push(<PaginationItem active={i == currentPage } key={i}><PaginationLink onClick={(evt) => onPageClick(evt, i)} href="#">{i}</PaginationLink></PaginationItem>);
        }
        return (
            <Pagination>
                { pages }
            </Pagination>
        );
    }
}

export default PaginationContainer;