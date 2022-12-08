import React from "react";
import AccountSetting from "../components/AccountSetting";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";

function AccountSettingPage() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <SideNav />
        <AccountSetting />
      </div>
    </div>
  );
}

AccountSettingPage.propTypes = {};

export default AccountSettingPage;
