import React from "react";
import Navbar from "../components/Navbar";

function BookClass() {
  //Todo: implement paginated search for tutors when users search by keyword
  //Todo: when users click on specific tutor, will redirect to profile page of tutor

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Book Class</h2>
      </div>
    </>
  );
}

export default BookClass;
