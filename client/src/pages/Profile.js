import React from "react";
import { useAuth } from "../utils/auth";
import SharedLayout from "./SharedLayout";

function Profile() {
  const auth = useAuth();

  return (
    <div>
    <SharedLayout/> 
      Welcome {auth.user}
    </div>
  );
}

export default Profile;
