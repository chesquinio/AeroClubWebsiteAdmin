function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to generate an array of page numbers to display in pagination
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisibleButtons = 5;

    // If there are less than or equal to 7 pages, display all
    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftBound = Math.max(1, currentPage - 2);
      const rightBound = Math.min(
        totalPages,
        leftBound + maxVisibleButtons - 1
      );

      if (leftBound > 1) {
        // Add start button if currentPage is not close to the beginning
        pages.push(1);
        if (leftBound > 2) {
          // Add an ellipsis (...) if currentPage is not adjacent to the start
          pages.push(null);
        }
      }

      // Add pages within the visible range
      for (let i = leftBound; i <= rightBound; i++) {
        pages.push(i);
      }

      if (rightBound < totalPages) {
        if (rightBound < totalPages - 1) {
          // Add an ellipsis (...) if currentPage is not adjacent to the end
          pages.push(null);
        }
        // Add end button if currentPage is not close to the end
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center mb-5">
      {generatePageNumbers().map((pageNumber, index) => (
        <button
          key={index}
          onClick={() => onPageChange(pageNumber)}
          className={`mx-1 px-4 py-2 text-white hover:bg-white hover:text-gray-700 rounded font-semibold transition-all ${
            currentPage === pageNumber
              ? "bg-white shadow-md shadow-gray-700 text-gray-900"
              : ""
          } ${pageNumber === null ? "cursor-default" : ""}`}
          disabled={pageNumber === null}
        >
          {pageNumber === null ? "-" : pageNumber}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
