import React from "react";

const Pagination = ({ currentPage, onPageChange, totalPages }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        -
      </button>
      <span>
        Page {currentPage} / {Number(totalPages)}
      </span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        +
      </button>
    </div>
  );
};

export default Pagination;
