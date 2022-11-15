import React, { useState, useEffect } from "react";
import "../assets/styles/SearchTutor.css";
import { useSearchParams } from "react-router-dom";
// import TutorInfo from "../components/TutorInfo";
import study2 from "../assets/images/study2.jpg";
import PropTypes from "prop-types";

/** Yian
 * This module handles the search query for tutors
 * @param {function} handleQuery prop passed in from parent component in SearchTutor.js
 * @returns JSX of rendering
 */
function SearchTutor({ handleQuery, search }) {
  const [searchword, setSearchword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");
  const [notFound, setNotFound] = useState(false);

  const handleChange = (evt) => {
    evt.preventDefault();
    setSearchword(evt.target.value);
    setSearchParams({ query: evt.target.value });
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
   * This function allows users to search with keypress "enter", activates whenever optimizeDebounce is triggered
   */
  useEffect(() => {
    const keyDownHandler = (evt) => {
      if (evt.key === "Enter") {
        evt.preventDefault();
        handleSubmit();
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
    handleSubmit();
  };

  /**
   * function that handles submission for search
   */
  const handleSubmit = async () => {
    try {
      const res = await fetch(`/book/tutors/?query=${searchword}`, {
        method: "POST",
        body: searchParams.get("query"),
      });
      const resQuery = await res.json();
      if (resQuery.data.length === 0) {
        console.log("no search result");
        setNotFound(true);
        //reset notFound to false after 2 seconds
        setTimeout(() => {
          setNotFound(false);
        }, 2000);
      } else {
        console.log("resQuery.data", resQuery.data);
        //calls handleQuery function in parent component
        handleQuery(searchParams.get("query"), resQuery.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //renders no result
  const noRes = () => {
    const res = (
      <div
        className="flash flash-warning alert alert-dismissible fade show"
        role="alert"
      >
        <span>No search results </span>
        <a data-bs-dismiss="alert" aria-label="Close">
          <i className="fas fa-times"></i>
        </a>
      </div>
    );
    return res;
  };

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            value={searchword}
            onChange={handleChange}
            placeholder="What would you like to work on?"
          />
          <button type="button" className="searchButton" onClick={handleClick}>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="imgContainer">
        {notFound ? noRes() : null}
        <div className="imageDiv">
          <img src={study2} className="study2pic" alt="study picture" />
        </div>
      </div>
    </>
  );
}

SearchTutor.propTypes = {
  handleQuery: PropTypes.func,
  search: PropTypes.bool,
};
export default SearchTutor;
