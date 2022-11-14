import React from "react";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
// import Register from "../compoenets/Register";
import blackboard from "../assets/images/blackboard.png";
import "../assets/styles/Login.css";

function LoginPage() {
  return (
    <div className="main-container">
      <Navbar />
      <div className="row">
        <div className="col">
          <p className="quote">
            Sign In to Find the Perfect Match!
          </p>
          <img className="blackboard" src={blackboard} alt="A+" />
        </div>
        <div className="col">
          <Login />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
