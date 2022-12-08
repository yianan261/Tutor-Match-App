import React from "react";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import blackboard from "../assets/images/blackboard.png";
import "../assets/styles/LoginRegister.css";

function LoginPage() {
  return (
    <main className="main-container">
      <Navbar />
      <div className="row">
        <div className="col">
          <p className="quote">Sign In to Find the Perfect Tutor!</p>
          <img className="blackboard" src={blackboard} alt="A+" />
        </div>
        <div className="col">
          <Login />
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
