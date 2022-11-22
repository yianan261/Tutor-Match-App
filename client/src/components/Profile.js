import React, {useEffect} from "react";
// import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Profile.css";
// import PropTypes from "prop-types";

/**
 * Amanda Au-Yeung
 * 
 * @returns jsx of profile rendering 
 */
function Profile() {
  const navigate = useNavigate();
  // const [profile, setProfile] = useState({
  //   username: "",
  //   fName: "",
  //   lName: "",
  //   email: "",
  //   subjects: "",
  //   location: "",
  // });
  // const [schedule, setSchedule] = useState([]);
  // const [pic, setPic] = useState(null);

  // // setting default values
  // useEffect(() => {
  //   const fetchExistData = async () => {
  //     await fetch("/profile/editProfile")
  //     .then(res => res.json())
  //     .then(data => {
  //       let profileInDB = data.profile;
  //       let profileData = new Map();
  //       profileData['username'] = profileInDB.displayName;
  //       profileData['fName'] = profileInDB.fName;
  //       profileData['lName'] = profileInDB.lName;
  //       profileData['email'] = profileInDB.email;
  //       profileData['subjects'] = profileInDB.subjects;
  //       profileData['location'] = profileInDB.location;
  //       setProfile(profileData);
  //       setSchedule(data.profile.schedule);
  //       setPic(data.profile.pic);
  //     })
  //   } 
  //   fetchExistData();
  // }, [])

  // if there is no user, then we redirect to login
  useEffect(() => {
    const getCurrentUser = async () => {
      await fetch("/getUser")
      .then(res=>{ console.log(res);
        return res.json()})
      .then(data=>{
       if (data.user === null){
         navigate("/login")
       }
      })
   }
   getCurrentUser();
  }, []);

  return (
    <div className="container-profile">
      <div className="schedule">
      
      </div>
      <div className="main-profile">

      </div>
      <div className="profile">
    <div className=""></div>
      </div>
      
    </div>
  );
}

export default Profile;
