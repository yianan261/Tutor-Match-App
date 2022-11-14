import React, { useEffect, useState } from "react";
import "../assets/styles/Navbar.css";
import { NavLink, redirect, useLocation } from "react-router-dom";
import { useAuth } from "../utils/auth";
import bulb2 from "../assets/images/bulb2.png";

//Yian
function Navbar() {
  const auth = useAuth();
  const location = useLocation();
  const [navColor, setNavColor] = useState(false);
  const [navClassName, setNavClassName] = useState(
    "navbar navbar-dark navbar-expand-md fixed-top navHome"
  );

  const changeNavBackground = () => {
    window.scrollY >= 66 ? setNavColor(true) : setNavColor(false);
  };
  useEffect(() => {
    changeNavBackground();
    window.addEventListener("scroll", changeNavBackground);
  }, [navColor]);

  const handleLogin = () => {
    auth.login();
    redirect("/login");
  };

  //conditional rendering when unauthenticated
  const unauthenticated = (
    <NavLink to="/login">
      <button className="loginBtn" onClick={handleLogin}>
        Login
      </button>
    </NavLink>
  );
  const handleLogout = () => {
    auth.logout();
    redirect("/");
  };
  //conditional rendering when authenticated
  const authenticated = (
    <button className="loginBtn" onClick={handleLogout}>
      Logout
    </button>
  );

  /**
   * this function determines navbar design according to location path
   * if at Homepage activate navHome css selector (default),else use navAll
   * on scroll activate navActive
   */
  useEffect(() => {
    if (location.pathname !== "/") {
      navColor
        ? setNavClassName(
            "navbar navbar-dark navbar-expand-md fixed-top navbarActive"
          )
        : setNavClassName(
            "navbar navbar-dark navbar-expand-md fixed-top navAll"
          );
    }
  }, []);

  return (
    <div>
      <nav id="mainNavbar" className={navClassName}>
        <div className="container-xl navContainer">
          <span className="logoSpan">
            <img src={bulb2} className="logo" alt="tutor app logo" />
          </span>

          <div className="navbar-brand">Tutor Match</div>

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
          <span>{auth.user ? authenticated : unauthenticated}</span>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
