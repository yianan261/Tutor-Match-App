import React, { useEffect, useState } from "react";
import "../assets/styles/Navbar.css";
import { NavLink, redirect } from "react-router-dom";
import { useAuth } from "../utils/auth";
import bulb2 from "../assets/images/bulb2.png";

//Yian
function Navbar() {
  const auth = useAuth();
  const [navColor, setNavColor] = useState(false);

  const changeNavBackground = () => {
    window.scrollY >= 66 ? setNavColor(true) : setNavColor(false);
  };
  useEffect(() => {
    changeNavBackground();
    window.addEventListener("scroll", changeNavBackground);
  },[navColor]);

  const handleLogin = () => {
    auth.login();
    redirect("/login");
  };
  //conditional rendering when unauthenticated
  const unauthenticated = (
    <NavLink to="/login">
      <button onClick={handleLogin}>Login</button>
    </NavLink>
  );
  const handleLogout = () => {
    auth.logout();
    redirect("/");
  };
  //conditional rendering when authenticated
  const authenticated = <button onClick={handleLogout}>Logout</button>;
  return (
    <div>
      <nav
        id="mainNavbar"
        className={navColor? "navbar navbar-dark navbar-expand-md fixed-top navbarActive":"navbar navbar-dark navbar-expand-md fixed-top"}
      >
        <div className="container-xl navContainer">
          <span className="logoSpan">
            <img src={bulb2} className="logo" alt="tutor app logo" />
          </span>

          <div className="navbar-brand">Tutor Match</div>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navLinks">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  My Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/book">
                  Book Class
                </NavLink>
              </li>
            </ul>
          </div>
          <span>
            {auth.user ? authenticated : unauthenticated}
            <i className="fa-solid fa-right-from-bracket"></i>
          </span>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
