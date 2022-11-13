import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  //Todo: get user data through Context (useAuth in ./utils/auth.js)
  useEffect(() => {
    setUser("placeholder"); //temporary placement, this value should be replaced with user login from form data
  }, []);

  const handleLogin = () => {
    auth.login(user);
    navigate("/profile", { replace: true });
  };
  return (
    <div>
      Login
      {/* temporary button, Todo: replace with login form*/}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
