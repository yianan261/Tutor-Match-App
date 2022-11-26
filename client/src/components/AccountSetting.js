import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PricePanel from "./PricePanel";
import { useAuth } from "../utils/auth";
import "../assets/styles/AccountSetting.css";
// import CountClasses from "./ClassCount.js";
// import PropTypes from "prop-types";

/**
 * Amanda Au-Yeung
 *
 * @returns jsx of account setting
 */
function AccountSetting() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [user, setUser] = useState("");
  const [classCount, setClassCount] = useState(0);

  // if there is no user, then we redirect to login,
  // set the user as the current user
  useEffect(() => {
    const getCurrentUser = async () => {
      await fetch("/api/getUser")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.user === null) {
            navigate("/login");
          } else {
            setUser(data.user);
          }
        });
    };
    getCurrentUser();
  }, []);

  const alertDel = (e) => {
    e.preventDefault();
    if (confirm("Confirm to permanently cancel your account.")) {
      delAC();
    }
  };

  const delAC = async () => {
    const del = await fetch(`/api/profile/deleteAccount/?id=${user}`, {
      method: "POST",
    });
    const delRes = await del.json();
    alert(delRes.message);
    auth.logout(auth.user);
    navigate("/");
  };

  return (
    <div className="AccountSetting">
      <h1 className="plan-selection">Select your plan</h1>
      <div className="price-container">
        <PricePanel />
        <div className="select-plan">
          <button
            className="btnAccount"
            onClick={() => {
              setClassCount(1 + classCount);
            }}
          >
            ONE TIMER
          </button>
          <button
            className="btnAccount"
            onClick={() => {
              setClassCount(3 + classCount);
            }}
          >
            BRUSH UP PLAN
          </button>
          <button
            className="btnAccount"
            onClick={() => {
              setClassCount(5 + classCount);
            }}
          >
            PRO PLAN
          </button>
        </div>
        <div></div>
      </div>
      <div className="delete-account">
        <button className="delete-button" type="submit" onClick={alertDel}>
          I would like to delete my account...
        </button>
      </div>
    </div>
  );
}

AccountSetting.propTypes = { 
};

export default AccountSetting;
