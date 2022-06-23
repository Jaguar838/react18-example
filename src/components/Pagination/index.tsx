import React from "react";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.scss";

type PaginationProps = {
    currentPage: number;
    onChangePage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
                                                          currentPage,
                                                          onChangePage,
                                                      }) => (
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
