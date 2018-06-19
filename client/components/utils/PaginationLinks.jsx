import React from 'react';
import PropTypes from 'prop-types';

const PaginationLinks = props => (
  <div className="pagination-links d-flex
    justify-content-center pagination-navs"
  >
    <nav aria-label="...">
      <ul className="pagination">
        {props.currentPage === 1 && (
          <li className="page-item disabled previous-link">
            <button className="page-link" tabIndex="-1">
              Previous
            </button>
          </li>
        )}
        {props.currentPage > 1 && (
          <li className="page-item previous-link">
            <button
              className="page-link"
              tabIndex="-1"
              onClick={props.fetchPage}
              id={props.currentPage - 1}
            >
              Previous
            </button>
          </li>
        )}
        <li className="page-item active">
          <button
            className="page-link"
            id={props.currentPage}
            onClick={props.fetchPage}
          >
            {props.currentPage}{' '}
          </button>
        </li>
        <li className="page-item disabled">
          <div className="page-link">/</div>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            onClick={props.fetchPage}
            id={props.currentPage + 1}
          >
            {props.totalPages}{' '}
          </button>
        </li>
        {props.currentPage !== props.totalPages && (
          <li className="page-item">
            <button
              className="page-link next"
              style={{ cursor: 'pointer' }}
              id={props.currentPage + 1}
              onClick={props.fetchPage}
            >
              Next
            </button>
          </li>
        )}
        {props.currentPage === props.totalPages && (
          <li className="page-item disabled">
            <button className="page-link" style={{ cursor: 'pointer' }}>
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  </div>
);

export default PaginationLinks;

PaginationLinks.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  fetchPage: PropTypes.func.isRequired
};
