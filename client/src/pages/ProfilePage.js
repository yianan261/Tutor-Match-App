import React from "react";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
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
    </div>
  );
}

export default ProfilePage;
