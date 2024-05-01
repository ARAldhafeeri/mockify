import React, { useState, useEffect, ReactNode  } from 'react'
import { INextPrevPaginationProps } from 'types/Cards';



const NextPrevPagination: React.FC<INextPrevPaginationProps<any>> = ({ data, itemsPerPage, actions, Cards }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<any[]>([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(data.slice(startIndex, endIndex));
  }, [currentPage, data, itemsPerPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Prevent going below page 1
  };

  const handleNextPage = () => {
    const maxPages = Math.ceil(data.length / itemsPerPage);
    setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPages)); // Prevent going past the last page
  };

  return (
    <div>
      <Cards currentItems={currentItems} actions={actions} />

      {/* Pagination controls */}
      <div className="pagination-controls mt-4 flex items-center justify-between">
          <button className=' bg-light-secondary rounded-lg hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l' onClick={handlePreviousPage}>Previous</button>
          <button className='bg-light-secondary rounded-lg  hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r' onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default NextPrevPagination;