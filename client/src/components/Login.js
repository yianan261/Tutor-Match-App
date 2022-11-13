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
    <div className="container">
      <form action="/login/password" method="POST">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We will never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button onClick={handleLogin} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
