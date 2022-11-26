import React from "react";
import AccountSetting from "../components/AccountSetting";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import Footer from "../components/Footer";

function AccountSettingPage() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <SideNav />
        <AccountSetting />
      </div>
      <Footer />
    </div>
  );
}

AccountSettingPage.propTypes = {};

export default AccountSettingPage;
