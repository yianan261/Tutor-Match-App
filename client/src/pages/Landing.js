import React from "react";
import "../assets/styles/Landing.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";

//Yian
function Landing() {
  return (
    <>
      <Navbar />
      <div className="mainContainer" role="main">
        <div className="banner">
          <div className="subContainer">
            <h1>Tutor Match helps you get the help you need</h1>
            <p>Change your life and learn efficiently</p>
            <NavLink to="/book">
              <button className="bookBtn" style={{ color: "white" }}>
                Book class Now
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

Landing.propTypes = {};
export default Landing;
