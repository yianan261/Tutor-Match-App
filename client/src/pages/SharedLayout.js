import React from "react";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import Footer from "../components/Footer";

function SharedLayout() {
  return (
    <>
      <Navbar />
      <SideNav/>
      <Footer />
    </>
  );
}

export default SharedLayout;
