import React from "react";
import "../assets/styles/Landing.css";
import Navbar from "../components/Navbar";

function Landing() {
  return (
    <>
      <Navbar />
      <h1>Home Page Testing</h1>
      <div className="container mainContainer">
        <div className="test">Test</div>
        {/* <img
          className="img"
          src="https://i.postimg.cc/Y9WbGBpp/f7.png"
          alt="tutor"
        /> */}
      </div>
    </>
  );
}

export default Landing;
