import React, { useState, useEffect } from "react";
import "../assets/styles/SearchTutor.css";
import TutorProfile from "../components/TutorProfile";
import { useSearchParams, redirect } from "react-router-dom";
// import TutorInfo from "../components/TutorInfo";
import study2 from "../assets/images/study2.jpg";

function SearchTutor() {
  const [searchword, setSearchword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");
  const [searchData, setSearchData] = useState([]);

  const handleChange = (evt) => {
    evt.preventDefault();
    setSearchword(evt.target.value);
    setSearchParams({ query: evt.target.value });
  };

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
      const res = await fetch(
        `http://localhost:5001/book/tutors/?query=${searchword}`,
        {
          method: "POST",
          body: searchParams.get("query"),
        }
      );
      const resQuery = await res.json();
      if (resQuery.data.length === 0) {
        //todo render no search result
        console.log("no search result");
      } else {
        console.log("resQuery.data", resQuery.data);
        setSearchData(resQuery.data);
        redirect(searchParams.get("query"));
        //todo: render result
      }
    } catch (err) {
      console.error(err);
    }
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
        <div className="imageDiv">
          <img src={study2} className="study2pic" alt="study picture" />
        </div>
      </div>
      <TutorProfile searchword={searchword} searchData={searchData} />
      {/* <h3>TEST USERS: {user}</h3> */}
    </>
  );
}

export default SearchTutor;
