import React, { useState, useEffect, useRef } from "react";
import "../assets/styles/EditProfile.css";
import bulb2 from "../assets/images/bulb2.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth.js";

/**
 * Amanda Au-Yeung
 * Edits profile by making sure it pulls out default information
 * from the DB before updating
 * @returns jsx of edit-profile rendering
 */
function EditProfile() {
  const navigate = useNavigate();
  const auth = useAuth();
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
  const form = useRef(null);

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
            setPreferredSchedule(data.profile.preferredSchedule);
          }
          setPic(data.pic);
        });
    };
    fetchExistData();
  }, []);

  // updates the value
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const profileInfo = await fetch("/api/profile/editProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName: profile.username,
        fName: profile.fName,
        lName: profile.lName,
        email: profile.email,
        subjects: profile.subjects,
        location: profile.location,
        schedule: preferredSchedule,
      }),
    });
    const resProfile = await profileInfo.json();
    alert(resProfile.message);
    navigate("/Profile");
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMultiSelect = (schedule) => {
    let preferredSchedule = [];
    for (const element of schedule) {
      preferredSchedule.push(element.value);
    }
    setPreferredSchedule(preferredSchedule);
  };

  const uploadImage = (file) => {
    window.URL.revokeObjectURL(pic);
    setPic(window.URL.createObjectURL(file));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    let uploadImg = new FormData(form.current);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: uploadImg,
    });
    const uploadStatus = await res.json();
    if (uploadStatus.status === "OK") {
      alert("Profile Picture Saved!");
      navigate("/profile/editProfile");
    }
  };

  const delPic = async (e) => {
    e.preventDefault();
    await fetch(`/api/delPic?id=${auth.user}`, {
      method: "POST",
    });
    setPic(bulb2);
    alert("Your profile picture was removed.");
  };

  return (
    <main className="EditProfile">
      <div className="container-xl px-4 mt-4">
        <div className="row background-white">
          <div className="col-xl-4 no-padding">
            {/* <!-- Profile picture card--> */}
            <div className="mb-4 mb-xl-0" id="uploadProfileCard">
              <h1 className="card-header">Profile</h1>
              <div className="card-body text-center">
                {/* <!-- Profile picture image--> */}
                <img
                  className="img-account-profile rounded-circle mb-2"
                  src={pic || bulb2}
                  alt="Not Found"
                />
                {/* <!-- Profile picture help block--> */}
                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>
                {/* <!-- Profile picture upload button--> */}
                <form
                  id="picForm"
                  name="picForm"
                  ref={form}
                  onSubmit={handleUpload}
                >
                  <div>
                    <label htmlFor="files" className="btnEditProfile">
                      Upload new image
                    </label>
                    <input
                      id="files"
                      name="img"
                      type="file"
                      onChange={(e) => {
                        uploadImage(e.target.files[0]);
                      }}
                    />
                    <button className="btnEditProfile" type="submit">
                      Save Profile Picture
                    </button>
                    <button className="btnEditProfile" onClick={delPic}>
                      Delete Profile Picture
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-xl-8 pl-3">
            {/* <!-- Account details card--> */}
            <div className="mb-4 pl-3">
              <h2 className="card-header">Account Details</h2>
              <div className="card-body">
                <form id="mainForm" onSubmit={handleSaveProfile}>
                  {/* <!-- Form Group (username)--> */}
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputUsername">
                      Displayed Username
                    </label>
                    <input
                      className="form-control"
                      id="inputUsername"
                      type="text"
                      placeholder="Enter your username"
                      name="username"
                      value={profile.username || ""}
                      onChange={onInputChange}
                    />
                  </div>
                  {/* <!-- Form Row--> */}
                  <div className="row gx-3 mb-3">
                    {/* <!-- Form Group (first name)--> */}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputFirstName">
                        First name
                      </label>
                      <input
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        placeholder="Enter your first name"
                        name="fName"
                        value={profile.fName || ""}
                        onChange={onInputChange}
                      />
                    </div>
                    {/* <!-- Form Group (last name)--> */}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLastName">
                        Last name
                      </label>
                      <input
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        placeholder="Enter your last name"
                        name="lName"
                        value={profile.lName || ""}
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputEmailAddress">
                      Email address
                    </label>
                    <input
                      className="form-control"
                      id="inputEmailAddress"
                      type="email"
                      placeholder="Enter your email address"
                      name="email"
                      value={profile.email || ""}
                      onChange={onInputChange}
                    />
                  </div>

                  {/* <!-- Form Row        --> */}
                  <div className="row gx-3 mb-3">
                    {/* <!-- Form Group (organization name)--> */}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="Subject">
                        Interested Subjects
                      </label>
                      <input
                        className="form-control"
                        id="inputSubjects"
                        type="text"
                        placeholder="Subject"
                        name="subjects"
                        value={profile.subjects || ""}
                        onChange={onInputChange}
                      />
                    </div>
                    {/* <!-- Form Group (location)--> */}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLocation">
                        Location
                      </label>
                      <input
                        className="form-control"
                        id="inputLocation"
                        type="text"
                        placeholder="Enter your location"
                        name="location"
                        value={profile.location || ""}
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                  {/* <!-- Form Group (Schedule preference)--> */}
                  <div className="mb-3">
                    <label
                      className="small mb-1"
                      htmlFor="inputSchedulePrefernce"
                    >
                      Schedule Preference
                    </label>
                    <select
                      aria-label="selectPreferredSchedule"
                      id="inputState"
                      multiple={true}
                      className="form-control"
                      name="schedule"
                      value={preferredSchedule || ""}
                      onChange={(e) => {
                        handleMultiSelect(e.target.selectedOptions);
                      }}
                    >
                      <option value="weekdays AM">Weekdays AM</option>
                      <option value="weekdays PM">Weekends PM</option>
                      <option value="weekends AM">Weekends AM</option>
                      <option value="weekends PM">Weekends PM</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  {/* <!-- Save changes button--> */}
                  <button className="btnEditProfile" type="submit">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

EditProfile.propTypes = {};

export default EditProfile;
