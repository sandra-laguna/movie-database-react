import { useState } from 'react';
import styles from './Pagination.module.scss';

export const Pagination = ({ maxPages, paginate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  let items = [];
  let leftSide = currentPage - 2;
  if (leftSide <= 0) leftSide = 1;
  let rightSide = currentPage + 2;
  if (rightSide > maxPages) rightSide = maxPages;

  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <div
        key={number}
        className={number === currentPage ? `${styles.roundEffect} ${styles.active}` : `${styles.roundEffect}`}
        onClick={() => {
          setCurrentPage(number);
          paginate(number);
        }}>
        {number}
      </div>
    );
  }

  const indexOfFirstTodo = 1;
  const indexOfLastTodo = maxPages;

  const nextPage = () => {
    if (currentPage < maxPages) {
      paginate(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const paginationRender = (
    <div className={styles.pagination}>
      <div className={styles.paginateCtn}>
        <div className={styles.roundEffect} onClick={() => paginate(indexOfFirstTodo)}>
          &laquo;
        </div>
        <div className={styles.roundEffect} onClick={prevPage}>
          &lt;
        </div>
        {items}
        <div className={styles.roundEffect} onClick={nextPage}>
          &gt;
        </div>
        <div className={styles.roundEffect} onClick={() => paginate(indexOfLastTodo)}>
          &raquo;
        </div>
      </div>
    </div>
  );

  return paginationRender;
};
