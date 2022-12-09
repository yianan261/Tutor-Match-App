import React, { useEffect, useState } from "react";
import "../assets/styles/Navbar.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import bulb2 from "../assets/images/bulb2.png";

//Yian
function Navbar() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [navColor, setNavColor] = useState(false);
  const [navClassName, setNavClassName] = useState(
    "navbar navbar-expand-md fixed-top navHome"
  );

  /**
   * Yian Chen
   * This function changes navbar on scroll
   */
  const changeNavBackground = () => {
    window.scrollY >= 66 ? setNavColor(true) : setNavColor(false);
  };
  useEffect(() => {
    try {
      changeNavBackground();
      window.addEventListener("scroll", changeNavBackground);
    } catch (err) {
      console.error(err);
    }
  }, [navColor]);

  // Amanda
  const handleLogin = () => {
    auth.login(auth.user);
    navigate("/login");
  };

  //conditional rendering when unauthenticated
  const unauthenticated = (
    <NavLink to="/login">
      <button className="loginBtn" onClick={handleLogin}>
        Login
      </button>
    </NavLink>
  );

  // Amanda
  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  //conditional rendering when authenticated
  const authenticated = (
    <button className="loginBtn" onClick={handleLogout}>
      Logout
    </button>
  );

  /**Yian Chen
   * this function determines navbar design according to location path
   * if at Homepage activate navHome css selector (default),else use navAll
   * on scroll activate navActive
   */
  useEffect(() => {
    try {
      if (location.pathname !== "/") {
        navColor
          ? setNavClassName("navbar navbar-expand-md fixed-top navbarActive")
          : setNavClassName("navbar navbar-expand-md fixed-top navAll");
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div>
      <nav id="mainNavbar" className={navClassName} role="navigation">
        <div className="container-xl navContainer">
          <span className="logoSpan">
            <img src={bulb2} className="logo" alt="tutor app logo" />
          </span>

          <div className="navbar-brand">
            <NavLink className="navbrand-link" to="/">
              Tutor Match
            </NavLink>
          </div>

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

Navbar.propTypes = {};
export default Navbar;
