import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const TablePagination = ({ pageInfo }) => {
  const { last_page, current_page, path, total } = pageInfo;
  const [activePage, setActivePage] = useState(current_page);

  const handlePageChange = async (page) => {

    setActivePage(page);
  };
  
  const getPageItems = () => {
    const items = [];

    for (let page = 1; page <= last_page; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === activePage}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <Pagination>
      <Pagination.First className='text-success' onClick={() => handlePageChange(1)} />
      <Pagination.Prev className='text-success'
        onClick={() => handlePageChange(activePage - 1)}
        disabled={activePage === 1}
      />
      {getPageItems()}
      <Pagination.Next
        onClick={() => handlePageChange(activePage + 1)}
        disabled={activePage === last_page}
      />
      <Pagination.Last onClick={() => handlePageChange(last_page)} />
    </Pagination>
  );
};

export default TablePagination;
