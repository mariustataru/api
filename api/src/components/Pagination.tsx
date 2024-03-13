import { useState } from 'react';
import Pagination from '@mui/material/Pagination';

const PaginationControlled = ({ setCurrentPage, currentPage }) => {
  

  const handleChange = (event, value) => {
    setCurrentPage(value); // Pass the current page value to the parent component
  };

  return (
    <div>
      <Pagination count={10} page={currentPage} onChange={handleChange} />
    </div>
  );
};

export default PaginationControlled;