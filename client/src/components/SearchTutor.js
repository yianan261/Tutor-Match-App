import React, { useState, useEffect } from "react";
import "../assets/styles/SearchTutor.css";
import { useSearchParams } from "react-router-dom";
// import TutorInfo from "../components/TutorInfo";
import study2 from "../assets/images/study2.jpg";
import PropTypes from "prop-types";

/** Yian
 * This module handles the search query for tutors
 * @param {function} handleQuery prop passed in from parent component in SearchTutor.js
 * @returns JSX of search tutor rendering
 */
function SearchTutor({ notFound, search, handleSubmit, page }) {
  const [searchword, setSearchword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");

  /**Yian Chen
   * function that handles change on search input
   * @param {*} evt
   */
  const handleChange = (evt) => {
    evt.preventDefault();
    setSearchword(evt.target.value);
    setSearchParams({ query: evt.target.value, page: page });
  };

  /**
   * This function clears searchParams when search is false
   */
  useEffect(() => {
    if (!search) {
      setSearchParams("");
    }
  }, [search]);

  /**
   * This function allows users to search with keypress "enter"
   */
  useEffect(() => {
    const keyDownHandler = (evt) => {
      if (evt.key === "Enter") {
        evt.preventDefault();
        handleSubmit(searchword, 0);
      }
    };
    window.addEventListener("keydown", keyDownHandler);
    //cleanup (unmount)
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [searchParams]);

  //function for when search button is clicked
  const handleClick = (evt) => {
    evt.preventDefault();
    handleSubmit(searchword, 0);
  };

  //renders no result
  const noRes = () => {
    const res = (
      <div
        className="flash flash-warning alert alert-dismissible fade show"
        role="alert"
      >
        <span>No results. Please try another keyword. </span>
        <a data-bs-dismiss="alert" aria-label="Close">
          <i className="fas fa-times"></i>
        </a>
      </div>
    );
    return res;
  };

  return (
    <>
      <div className="wrap" role="main">
        <h1 className="searchHeader">Find a tutor</h1>
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            value={searchword}
            onChange={handleChange}
            placeholder="What would you like to work on?"
          />
          <button
            type="button"
            aria-label="search"
            className="searchButton"
            onClick={handleClick}
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="imgContainer" role="complementary">
        {notFound ? noRes() : null}
        <div className="imageDiv">
          <img src={study2} className="study2pic" alt="study picture" />
        </div>
      </div>
    </>
  );
}

SearchTutor.propTypes = {
  notFound: PropTypes.bool,
  search: PropTypes.bool,
  page: PropTypes.number,
  handleSubmit: PropTypes.func,
};
export default SearchTutor;
