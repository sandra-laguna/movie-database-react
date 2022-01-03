import React from 'react';
import styles from './Pagination.module.scss';

export const Pagination = ({ postPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  const firstPage = 1;

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  const indexOfLastTodo = firstPage * (totalPosts / postPerPage);
  const indexOfFirstTodo = indexOfLastTodo - totalPosts / postPerPage + 1;

  return (
    <nav>
      <ul className={styles.pagination}>
        <li onClick={() => paginate(indexOfFirstTodo)}>&laquo;</li>
        <li onClick={() => paginate(currentPage - 1)}>&lt;</li>
        {pageNumbers.map(number => (
          <li key={number} onClick={() => paginate(number)}>
            {number}
          </li>
        ))}
        <li onClick={() => paginate(currentPage + 1)}>&gt;</li>
        <li onClick={() => paginate(indexOfLastTodo)}>&raquo;</li>
      </ul>
    </nav>
  );
};
