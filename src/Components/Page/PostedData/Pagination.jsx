const Pagination = ({ totalPost, postParPage, setCurrentPage, currentPage }) => {
    const totalPages = Math.ceil(totalPost / postParPage);
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="flex justify-center space-x-2 my-5">
            {/* Previous Button */}
            <button
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                className={`btn btn-outline ${currentPage === 1 ? 'btn-disabled' : ''}`}>
                Previous
            </button>

            {/* Page Numbers */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`btn btn-outline ${currentPage === page ? 'bg-primary text-white' : ''}`}>
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                className={`btn btn-outline ${currentPage === totalPages ? 'btn-disabled' : ''}`}>
                Next
            </button>
        </div>
    );
};


export default Pagination;