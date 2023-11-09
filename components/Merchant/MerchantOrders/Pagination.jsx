import ReactPaginate from "react-paginate";
import MerchantOrderDetail from "./MerchantOrderDetail";
import { useEffect, useState } from "react";

function PaginatedItems(
  { items, itemsPerPage },
) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <MerchantOrderDetail ordersData={currentItems} />
      <ReactPaginate
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< Prev"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="mx-auto"
        nextClassName="page-item"
        nextLinkClassName=""
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination-container border border-gray-400 rounded-md"
        activeClassName="item-active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
export default PaginatedItems;
