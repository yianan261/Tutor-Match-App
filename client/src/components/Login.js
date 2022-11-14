import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/auth";
import { useNavigate, NavLink } from "react-router-dom";
import "../assets/styles/Login.css";
// import { response } from "express";

function Login() {
  const [user, setUser] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // const fetchData = async () => {
    //   await fetch("/utils/auth.js");
    //   const json = await response.json();
    //   setUser(json);
    // };
    // fetchData().catch(console.error);
    setUser("test");
  }, []);

  const handleLogin = () => {
    auth.login(user);
    navigate("/profile", { replace: true });
  };
  return (
    <div className="card">
      <h5 className="card-title">Sign In</h5>
      <p id="no-ac">No Account?</p>
      <NavLink id="reg-link" to="/register">
        Sign Up!
      </NavLink>
      <div className="card-body">
        <form className="form-body" action="/login/password" method="POST">
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
          <button
            onClick={handleLogin}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
