import React from "react";
import "../assets/styles/SideNav.css";
import { Link } from "react-router-dom";
import { sidebarData } from "./sidebarData";

// Amanda Au-Yeung
function SideNav() {
  return (
    <div role="complementary">
      <div className="sidenav">
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
    </div>
  );
}

SideNav.propTypes = {};

export default SideNav;
