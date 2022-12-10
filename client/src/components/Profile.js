import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Profile.css";
import { AiOutlineMail, AiOutlineSchedule } from "react-icons/ai";
import { FaRegCalendarCheck } from "react-icons/fa";
import { MdOutlineFreeCancellation } from "react-icons/md";
import bulb2 from "../assets/images/bulb2.png";

/**
 * Amanda Au-Yeung
 * profile of student
 * @params {props} from profile setting
 * @returns jsx of profile rendering
 */
function Profile() {
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

  // setting default values
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
            setPreferredSchedule(data.profile.schedule);
          }
          setPic(data.pic);
        });
    };
    fetchExistData();
  }, []);

  return (
    <main className="container-profile">
      <div className="main-profile">
        <div className="welcome">
          <div className="profileInnerDiv">
            <h1 className="userName">
              {profile.username
                ? "Hi, " + profile.username
                : "Welcome! Please proceed to edit your profile."}
            </h1>
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
              {preferredSchedule
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
              <h2>Policy:</h2>
              <MdOutlineFreeCancellation /> Lesson cancellation: 1 hour notice
              required
              <div className="innerTextPolicy">
                <AiOutlineSchedule />{" "}
                <Link to="/book" className="bookATrial">
                  Book a Trial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

Profile.propTypes = {};

export default Profile;
