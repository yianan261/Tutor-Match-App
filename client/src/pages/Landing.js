import React from "react";
import "../assets/styles/Landing.css";
import Navbar from "../components/Navbar";
import {NavLink} from "react-router-dom"

function Landing() {
  return (
    <>
      <Navbar />
      <div className="mainContainer">
        <div className="banner">
          <div className="subContainer">
            <h1>Tutor App helps you get the help you need</h1>
            <p>Change your life and learn efficiently</p>
            <NavLink to="/book">
            <button className="bookBtn">Book class Now</button>
            </NavLink>
          </div>
          <span className="footer">
            <footer id="footer">
              © Tutor App, Inc. 2022 All Rights Reserved
            </footer>
          </span>
        </div>
      </div>
    </>
  );
}

export default Landing;
