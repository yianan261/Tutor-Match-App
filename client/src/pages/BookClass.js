import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import SearchTutor from "../components/SearchTutor";
import "../assets/styles/BookClass.css";
import TutorProfile from "../components/TutorProfile";

function BookClass() {
  //Todo: implement paginated search for tutors when users search by keyword
  //Todo: when users click on specific tutor, will redirect to profile page of tutor
  const [query, setQuery] = useState(null);
  const [search, setSearch] = useState(false);
  const [searchData, setSearchData] = useState([]);

  /**Yian
   * function that sets state in BookClass when search is triggered in SearchTutor.js
   * @param {string} the query string
   * @param {object} data from search result in SearchTutor.js
   */
  const handleQuery = (val, data) => {
    setQuery(val);
    setSearch(true);
    setSearchData(data);
  };

  /**Yian
   * local storage to persist state when browser is refreshed
   */
  useEffect(() => {
    try {
      const data = window.localStorage.getItem("Current_Query");
      if (data !== null) {
        setQuery(JSON.parse(data));
        setSearch(true);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  /**Yian
   * function to help persist state with local storage
   */
  useEffect(() => {
    try {
      window.localStorage.setItem("Current_Query", JSON.stringify(query));
      console.log("Query", query);
    } catch (err) {
      console.error(err);
    }
  }, [query]);

  /**Yian
   * function that clears local storage key "Current_Query" when back button is clicked on browser
   */
  useEffect(() => {
    try {
      const onBackButtonEvent = (evt) => {
        evt.preventDefault();
        window.localStorage.removeItem("Current_Query");
        setSearch(false);
        setQuery(null);
        setSearchData([]);
      };
      window.addEventListener("popstate", onBackButtonEvent);
      //cleanup (unmount)
      return () => {
        window.localStorage.clear();
        window.removeEventListener("popstate", onBackButtonEvent);
      };
    } catch (err) {
      console.error(err);
    }
  }, []);

  //Yian
  return (
    <>
      <Navbar />
      <div className="container BookContainer">
        <div className="searchDiv">
          {search && query ? (
            <TutorProfile searchData={searchData} query={query} />
          ) : (
            <SearchTutor handleQuery={handleQuery} search={search} />
          )}
          {console.log("search", search)}
          Query:{query}
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default BookClass;
