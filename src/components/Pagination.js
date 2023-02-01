import React, { useEffect } from "react";
import { useState } from "react";
import "./Pagination.css";

const Pagination = ({ searchResultData, pageHandler }) => {
  const [CurrentPage, setCurrentPage] = useState(1);

  let pageNumbers = [];
  for (var i = 1; i < Math.ceil(searchResultData.length / 5) + 1; i++) {
    pageNumbers.push(i);
  }

  const currentPageSetPrev = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const currentPageSetNext = () => {
    setCurrentPage((prev) => prev + 1);
  };
  useEffect(() => {
    pageHandler(CurrentPage);
  }, [CurrentPage]);
  const Pages = pageNumbers.map((pageNumber) => {
    return (
      <li
        className={CurrentPage == pageNumber ? "page-item active" : "page-item"}
      >
        <span
          className="page-link"
          onClick={() => {
            setCurrentPage(pageNumber);
          }}
        >
          {pageNumber}
        </span>
      </li>
    );
  });

  console.log(CurrentPage);

  return (
    <>
      <center>
        <div className="pageNumbers">
          <ul className="pagination m-5">
            <li
              className={CurrentPage == 1 ? "page-item disabled" : "page-item"}
            >
              <span
                className="page-link"
                id="prevNext"
                onClick={currentPageSetPrev}
              >
                &laquo;
              </span>
            </li>
            {Pages}
            <li
              className={
                CurrentPage == pageNumbers.length
                  ? "page-item disabled"
                  : "page-item"
              }
            >
              <span
                className="page-link"
                id="prevNext"
                onClick={currentPageSetNext}
              >
                &raquo;
              </span>
            </li>
          </ul>
        </div>
      </center>
    </>
  );
};
export default Pagination;
