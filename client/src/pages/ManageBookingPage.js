import React from "react";
import ManageBook from "../components/ManageBook";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";

//Yian Chen
//Manage Booking page
function ManageBookingPage() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <SideNav />
        <ManageBook />
      </div>
    </div>
  );
}

ManageBookingPage.propTypes = {};
export default ManageBookingPage;
