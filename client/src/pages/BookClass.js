import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import SearchTutor from "../components/SearchTutor";
import "../assets/styles/BookClass.css";
import "../assets/styles/BookModal.css";
import TutorProfile from "../components/TutorProfile";
import TutorInfo from "../components/TutorInfo";
import { useSearchParams } from "react-router-dom";
import BookModal from "../components/BookModal";

/**Yian
 * BookClass module handles Book class page rendering
 * @returns JSX of Book class UI
 */
function BookClass() {
  const [query, setQuery] = useState(null);
  const [search, setSearch] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [render, setRender] = useState(1);
  const [tutorProfile, setTutorProfile] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const bookClass = useRef({})
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

  /**Yian
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
    setSearchParams(profile._id);
  };

  //when called sets render to value 2
  const returnToSearch = () => {
    setRender(2);
  };

  //toggle function for modal
  const handleModal = () => {
    console.log("open modal");
    setModalIsOpen(!modalIsOpen);
  };

  /**Yian
   * function that renders component based on render flag value
   * @returns component for rendering
   */
  const renderFunc = () => {
    if (render === 1) {
      return <SearchTutor handleQuery={handleQuery} search={search} />;
    } else if (render === 2) {
      console.log("RENDER2");
      return (
        <TutorProfile
          searchData={searchData}
          query={query}
          handleReturn={handleReturn}
          searchProfile={searchProfile}
        />
      );
    } else if (render === 3) {
      console.log("RENDER3");
      return (
        <TutorInfo
          tutorProfile={tutorProfile}
          searchParams={searchParams}
          returnToSearch={returnToSearch}
          handleModal={handleModal}
        />
      );
    }
  };
//todo: update add class/delete class to backend

//Todo: get schedule for backend to check schedule conflicts
useEffect(()=>{},[])
 const addClassBackend = (user,scheduleObj)=>{
  // try{
  //   const tempMapString = mapToString(scheduleMap);
  //   fetch(`/api/addClass?user=${user}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: tempMapString,
  //   });}
  try{
    fetch("/api/addClass?user=test@123", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: scheduleObj,
    });}
  catch(err){console.error(err)}
 }

  /**Yian 
   * function that adds class to bookClass
   * @param {string} date 
   * @param {string} time 
   */
  const addClass = (date, time) => {
    console.log("line 209 BookClass.js, Date",date,"time",time)
    console.log("bookClass.current: ",bookClass.current)
    if (bookClass.current.has(`Date: ${date}, Time: ${time}`)) {
      //to
      console.log("Schedule Conlict, please select a different time")
      alert("Schedule Conlict, please select a different time");
    } else {
      bookClass.current = {...bookClass.current}
      addClassBackend("test_user",bookClass.current)
    }
  };

  //Yian
  return (
    <div className="BookClassMain">
      <Navbar />
      <div className="container BookContainer">
        <div className="searchDiv">{renderFunc()}</div>

        {render === 3 ? (
          <BookModal open={modalIsOpen} handleModal={handleModal} addClass={addClass}/>
        ) : null}
        <Outlet />
      </div>
    </div>
  );
}

export default BookClass;
