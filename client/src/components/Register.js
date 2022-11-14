import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import "../assets/styles/LoginRegister.css";

// import { response } from "express";

function Register() {
  const [user, setUser] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // const fetchData = async () => {
    //     await fetch("/utils/auth.js");
    //     const json = await response.json();
    //     setUser(json);
    //   };
    //   fetchData().catch(console.error);
    setUser("placeholder");
  }, []);

  const handleRegister = () => {
    auth.login(user);
    navigate("/profile", { replace: true });
  };
  return (
    <div className="card">
      <h5 className="card-title">Sign Up</h5>
      <p id="acc-holder">Already have an account?</p>
      <Link id="sign-in" to="/login">
        Sign In
      </Link>
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
            <label htmlFor="inputPassword5">Password</label>
            <input
              type="password"
              id="inputPassword5"
              className="form-control"
              aria-describedby="passwordHelpBlock"
            />
            <small id="passwordHelpBlock" className="form-text text-muted">
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </small>
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword5">Confirm Password</label>
            <input
              type="password"
              id="inputPassword5"
              className="form-control"
              aria-describedby="passwordHelpBlock"
            />
          </div>
          <button
            onClick={handleRegister}
            type="submit"
            className="btn"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
