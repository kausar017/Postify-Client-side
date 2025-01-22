const TabilPagination = ({ totalPost, postParPage, setCurrentPage, currentPage, Total }) => {
    const totalPages = Math.ceil(totalPost / postParPage);
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    // console.log(totalPost);

    return (
        <div className="md:flex justify-center gap-3 items-center">

            <div className="max-sm:justify-center flex py-2">
                <button className="btn btn-outline btn-sm">{Total}: {totalPost}</button>
            </div>
            <div className="flex flex-wrap justify-center space-x-2">
                {/* Previous Button */}
                <button
                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    className={`btn btn-outline btn-sm ${currentPage === 1 ? 'btn-disabled' : ''}`}>
                    Previous
                </button>

                {/* Page Numbers */}
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`btn btn-outline btn-sm ${currentPage === page ? 'bg-primary text-white' : ''}`}>
                        {page}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                    className={`btn btn-outline btn-sm ${currentPage === totalPages ? 'btn-disabled' : ''}`}>
                    Next
                </button>
            </div>
        </div>
    );
};


export default TabilPagination;