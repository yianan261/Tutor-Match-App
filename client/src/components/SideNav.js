import React from "react";
import "../assets/styles/SideNav.css";

function SideNav() {
  return (
    <div>
      <aside className="sidenav">
        <ul className="sidenav__list">
          <li className="sidenav__list-item">
            <i className="fa-solid fa-pen-to-square sideNavIcon" /> Edit Profile
          </li>
          <li className="sidenav__list-item">
            <i className="fa-solid fa-calendar sideNavIcon" /> Manage Bookings
          </li>
          <li className="sidenav__list-item">
            <i className="fa-solid fa-clock-rotate-left sideNavIcon" />
            Class History
          </li>
          <li className="sidenav__list-item">
            <i className="fa-solid fa-gear sideNavIcon" />
            Account Settings
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default SideNav;
