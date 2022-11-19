import React from "react";
import "../assets/styles/Landing.css";

// Amanda
function Footer() {
    const year = new Date().getFullYear();
    return <span className="footer"><footer id="footer">© Tutor App, Inc. {year} All Rights Reserved</footer></span>
}

export default Footer;