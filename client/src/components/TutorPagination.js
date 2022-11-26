import React from "react";
import "../assets/styles/TutorPagination.css";
import PropTypes from "prop-types";

function TutorPagination({ searchData }) {
    console.log("searchData",searchData)
    if(searchData.length < 18)return null
  return (
    <div>
      <div className="paginationDiv">
        <div className="btn-paginacao">
          <ul>
            <li className="prev">
              <label htmlFor="paginacaoPrev" id="prev">
                {" "}
                <i className="fa-solid fa-angles-left leftButton"></i>
              </label>
            </li>
            <li>
              <label htmlFor="paginacao1" id="p1">
                {" "}
                1
              </label>
            </li>
            <li>
              <label htmlFor="paginacao2" id="p2">
                2
              </label>
            </li>
            <li>
              <label htmlFor="paginacao3" id="p3">
                3
              </label>
            </li>
            <li>
              <label htmlFor="paginacao4" id="p4">
                4
              </label>
            </li>
            <li className="next">
              <label htmlFor="paginacaoNext" id="next">
                <i className="fa-solid fa-angles-right rightButton"></i>{" "}
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
TutorPagination.propTypes = {
  searchData: PropTypes.array,
};
export default TutorPagination;
