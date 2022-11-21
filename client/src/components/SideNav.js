import React from "react";
import "../assets/styles/SideNav.css";
import { Link } from "react-router-dom";
import { sidebarData } from "./sidebarData";

// Amanda Au-Yeung
function SideNav() {
  return (
<<<<<<< HEAD
    <>
      <div className="sidenav">
=======
    <div>
      <aside className="sidenav">
>>>>>>> cc43e1a (fixed book date functions in BookClass.js and BookModal)
        <ul className="sidenav__list">
          {sidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <span className="sideNavIcon">{item.icon}</span>
                  <span className="sideNavText">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default SideNav;
