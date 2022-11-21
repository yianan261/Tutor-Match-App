import React from "react";
import { useAuth } from "../utils/auth";
import SharedLayout from "./SharedLayout";
import Test from "../components/Test"
function Profile() {
  const auth = useAuth();


  return (
    <div>
    <SharedLayout/>
    <Test/>
      Welcome {auth.user}
    </div>
  );
}

export default Profile;
