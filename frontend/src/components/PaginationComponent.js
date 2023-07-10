import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';

const componentProps = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    onPageChange: PropTypes.func
}
export const PaginationComponent = (props) => {
    let list = [];
    for (let i = 1; i <= props.totalPages; i++) {
        list.push(i)
    }
    return (

        <Pagination aria-label="Page navigation example">
            {
                list.map(i => {return (<PaginationItem key={i} active={props.currentPage === i}>
                                            <PaginationLink key={i} href={i} onClick={(e) => {e.preventDefault(); props.onPageChange(parseInt(e.target.text, 10))}}>{i}</PaginationLink>
                                        </PaginationItem>)})
            }
        </Pagination>
    )
};

PaginationComponent.propTypes = componentProps;