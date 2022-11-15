import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import SearchTutor from "../components/SearchTutor";
import "../assets/styles/BookClass.css";
import TutorProfile from "../components/TutorProfile";
import TutorInfo from "../components/TutorInfo";
import { useSearchParams } from "react-router-dom";

function BookClass() {
  //Todo: implement paginated search for tutors when users search by keyword
  const [query, setQuery] = useState(null);
  const [search, setSearch] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [render, setRender] = useState(1);
  const [tutorProfile, setTutorProfile] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams("");


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

  const handleReturn = () => {
    setSearch(false);
  };

  /**Yian
   * local storage to persist state when browser is refreshed
   */
  useEffect(() => {
    try {
      const data = window.localStorage.getItem("Current_Query");
      const rend = window.localStorage.getItem("Current_Render");
      const currData = window.localStorage.getItem("Current_Data");
      if (data !== null && data !== "null") {
        setQuery(JSON.parse(data));
        setSearch(true);
      }
      if (rend !== null && rend !== "null") {
        setRender(rend);
      }
      if (currData !== null && currData !== "null") {
        setSearchData(JSON.parse(currData));
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
      if (query) {
        window.localStorage.setItem("Current_Query", JSON.stringify(query));
        if (render) {
          window.localStorage.setItem("Current_Render", JSON.stringify(render));
        }
        if (searchData) {
          window.localStorage.setItem(
            "Current_Data",
            JSON.stringify(searchData)
          );
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [query, render]);

  /**Yian
   * function that clears local storage key "Current_Query" when back button is clicked on browser
   */
  useEffect(() => {
    try {
      const onBackButtonEvent = (evt) => {
        evt.preventDefault();
        console.log("CLICKED");
        window.localStorage.removeItem("Current_Query");
        window.localStorage.removeItem("Current_Render");
        window.localStorage.removeItem("Current_Data");
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

  /**
   * render flag values: 1->SearchTutor component, 2->TutorProfile, 3->TutorInfo
   * function that decides which component to render
   */
  useEffect(() => {
    try {
      if (search && query) {
        setRender(2);
      } else if (!search) {
        setRender(1);
      } else {
        setRender(3);
      }
    } catch (err) {
      console.error(err);
    }
  }, [search]);
  console.log("render", render);
  console.log("search", search);

  //sets render to 3 when called
  const searchProfile = (profile) => {
    setRender(3);
    setTutorProfile(profile);
    setSearchParams(profile._id)
  };

  const returnToSearch = ()=>{
    setRender(2)
  }

  /**
   * function that renders component based on render flag value
   * @returns component for rendering
   */
  const renderFunc = () => {
    if (render === 1) {
      return <SearchTutor handleQuery={handleQuery} search={search} />;
    } else if (render === 2) {
      console.log("RENDER2")
      return (
        <TutorProfile
          searchData={searchData}
          query={query}
          handleReturn={handleReturn}
          searchProfile={searchProfile}
        />
      );
    } else if (render === 3) {
      console.log("RENDER3")
      return <TutorInfo tutorProfile={tutorProfile} searchParams={searchParams} returnToSearch={returnToSearch}/>;
    }
  };

  //Yian
  return (
    <>
      <Navbar />
      <div className="container BookContainer">
        <div className="searchDiv">{renderFunc()}</div>
        <Outlet />
      </div>
    </>
  );
}

export default BookClass;
