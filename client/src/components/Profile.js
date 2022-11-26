import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Profile.css";
import {
  AiOutlineMail,
  AiOutlineMessage,
  AiOutlineSchedule,
} from "react-icons/ai";
import { FaRegCalendarCheck } from "react-icons/fa";
import bulb2 from "../assets/images/bulb2.png";
// import PropTypes from "prop-types";

/**
 * Amanda Au-Yeung
 * profile of student
 * @params {props} from profile setting
 * @returns jsx of profile rendering
 */
function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username: "",
    fName: "",
    lName: "",
    email: "",
    subjects: "",
    location: "",
  });
  const [preferredSchedule, setPreferredSchedule] = useState([]);
  const [pic, setPic] = useState(null);

  // if there is no user, then we redirect to login,
  // else we are fetching the existing data
  useEffect(() => {
    const getCurrentUser = async () => {
      await fetch("/getUser")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.user === null) {
            navigate("/login");
          } else {
            fetchExistData();
          }
        });
    };
    getCurrentUser();
  }, []);

  // setting default values
  const fetchExistData = async () => {
    await fetch("/profile/editProfile")
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          let profileInDB = data.profile;
          let profileData = new Map();
          profileData["username"] = profileInDB.displayName;
          profileData["fName"] = profileInDB.fName;
          profileData["lName"] = profileInDB.lName;
          profileData["email"] = profileInDB.email;
          profileData["subjects"] = profileInDB.subjects;
          profileData["location"] = profileInDB.location;
          setProfile(profileData);
          setPreferredSchedule(data.profile.preferredSchedule);
        }
        setPic(data.pic);
      });
  };

  return (
    <div className="container-profile">
      <div className="main-profile">
        <div className="welcome">
          <div>
            <h2>
              {profile.username
                ? "Hi, " + profile.username
                : "Welcome! Please proceed to edit your profile."}
            </h2>
            <br></br>
            <div>
              <AiOutlineMail />{" "}
              {profile.email
                ? profile.email
                : "Add your email in your edit profile settings."}
            </div>
            <br></br>
            <div>
              <FaRegCalendarCheck />{" "}
              {profile.preferredSchedule
                ? "My preferred schedule is " + preferredSchedule.join(", ")
                : "Please select your preferred schedule in Edit Profile"}
              .
            </div>
          </div>
          <img
            className="img-account-profile"
            src={pic || bulb2}
            alt="Not Found"
          />
        </div>

        <div className="dashboard">
          <br></br>
          <h3>Dashboard</h3>
          Welcome!
          <div>Total Classes:</div>
        </div>
      </div>

      <div className="schedule">
        <h3>Schedule</h3>
        <div className="policy">
          Policy:
          <li>Lesson cancellation: 1 hour notice required</li>
          <div>
            <AiOutlineMessage /> Send tutor a message<br></br>
            <AiOutlineSchedule /> Book a Trial
          </div>
        </div>
      </div>
    </div>
  );
}

Profile.propTypes = {
  // classCount: PropTypes.number
};

export default Profile;
