import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import "../assets/styles/Profile.css";
import {
  AiOutlineMail,
  AiOutlineMessage,
  AiOutlineSchedule,
} from "react-icons/ai";
import { FaRegCalendarCheck } from "react-icons/fa";
import bulb2 from "../assets/images/bulb2.png";

/**
 * Amanda Au-Yeung
 * profile of student
 * @params {props} from profile setting
 * @returns jsx of profile rendering
 */
function Profile() {
  // const navigate = useNavigate();
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
  // useEffect(() => {
  //   const getCurrentUser = async () => {
  //     await fetch("/api/getUser")
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         if (data.user === null) {
  //           navigate("/login");
  //         } else {
  //           fetchExistData();
  //         }
  //       });
  //   };
  //   getCurrentUser();
  // }, []);

  useEffect(() => {
    const fetchExistData = async () => {
      await fetch("/api/profile/editProfile")
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
    fetchExistData()
  }, []);

  // setting default values
  

  return (
    <div className="container-profile">
      <div className="main-profile">
        <div className="welcome">
          <div className="profileInnerDiv">
            <h2 className="userName">
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
          <div className="secondDiv">
            <img
              className="img-account-profile"
              src={pic || bulb2}
              alt="Not Found"
            />
            <div className="policy">
              <h5>Policy:</h5>
              <li>Lesson cancellation: 1 hour notice required</li>
              <div className="innerTextPolicy">
                <AiOutlineMessage /> Send tutor a message<br></br>
                <AiOutlineSchedule /> Book a Trial
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Profile.propTypes = {};

export default Profile;
