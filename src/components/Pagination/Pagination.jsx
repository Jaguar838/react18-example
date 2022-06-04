import React from "react";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.scss";
export default function Pagination({currentPage, onChangePage}) {
    return (
        <ReactPaginate
            className={css.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            forcePage={currentPage - 1}
            pageCount={3}
            renderOnZeroPageCount={null}
        />
    );
}
