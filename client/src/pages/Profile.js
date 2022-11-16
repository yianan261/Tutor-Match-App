import React from "react";
import { useAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import SharedLayout from "./SharedLayout";

function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();

  //logout navigates back to home
  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <div>
    <SharedLayout/>
      Welcome {auth.user}
      {/* temporary */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
