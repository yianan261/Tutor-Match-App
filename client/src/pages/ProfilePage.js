import React from "react";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import Footer from "../components/Footer";
import Profile from "../components/Profile";

// Amanda
function ProfilePage() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <SideNav />
        <Profile />
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
