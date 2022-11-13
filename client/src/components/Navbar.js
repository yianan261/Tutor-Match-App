import React from "react";
import "../assets/styles/Navbar.css";
import { NavLink, redirect } from "react-router-dom";
import { useAuth } from "../utils/auth";
// import tutor1 from "../assets/images/tutor1.png";

//Yian
function Navbar() {
  const auth = useAuth();

  //Todo: decorate buttons
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
        className="navbar navbar-dark navbar-expand-md fixed-top"
      >
        <div className="container">
          {/* <img src={tutor1} alt="tutor app logo" /> */}
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
