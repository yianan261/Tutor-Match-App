import React from "react";
import "../assets/styles/TutorPagination.css";
import PropTypes from "prop-types";

/**
 * Yian Chen
 * Module that renders pagination for tutor search page
 * @param {prop} prop passed from BookClass.js
 * @returns JSX of pagination
 */
function TutorPagination({ choosePage }) {
  return (
    <div>
      <div className="paginationDiv">
        <div className="btn-paginacao">
          <ul>
            <li className="prev">
              <label htmlFor="paginacaoPrev" id="prev">
                <button
                  className="leftButton"
                  onClick={(evt) => {
                    evt.preventDefault();
                    choosePage("prev");
                  }}
                >
                  <i className="fa-solid fa-angles-left " />
                  Prev
                </button>
              </label>
            </li>
            <li className="next">
              <label htmlFor="paginacaoNext" id="next">
                <button
                  className="rightButton"
                  onClick={(evt) => {
                    evt.preventDefault();
                    choosePage("next");
                  }}
                >
                  Next
                  <i className="fa-solid fa-angles-right" />
                </button>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
TutorPagination.propTypes = {
  choosePage: PropTypes.func,
};
export default TutorPagination;
