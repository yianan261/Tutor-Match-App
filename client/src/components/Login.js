import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  //initializing user with temp value "placeholder",this should be replaced with user data from backend
  const [user, setUser] = useState("Placeholder");
  const auth = useAuth();
  const navigate = useNavigate();
  //Todo: implement fetch to fetch user data from backend (express session),wrap in useEffect
  useEffect(() => {
    setUser("placeholder"); //temporary placement
  }, []);

  const handleLogin = () => {
    auth.login(user);
    navigate("/profile");
  };
  return (
    <div>
      Login
      {/* temporary button */}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
