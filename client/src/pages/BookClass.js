import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import SearchTutor from "../components/SearchTutor";
import "../assets/styles/BookClass.css";

function BookClass() {
  //Todo: implement paginated search for tutors when users search by keyword
  //Todo: when users click on specific tutor, will redirect to profile page of tutor

  return (
    <>
      <Navbar />
      <div className="container BookContainer">
       
        <div className="searchDiv">
          <SearchTutor />

        </div>
        <Outlet />
      </div>
    </>
  );
}

export default BookClass;
