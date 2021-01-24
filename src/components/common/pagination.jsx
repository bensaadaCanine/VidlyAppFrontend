import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ pageSize, itemsCount, currentPage, onPageChange }) => {
  const pagesCount = itemsCount / pageSize;
  if (pagesCount <= 1) return null;

  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={
              currentPage === page
                ? "page-item active clickable"
                : "page-item clickable"
            }
            key={page}
          >
            <button onClick={() => onPageChange(page)} className="page-link">
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
