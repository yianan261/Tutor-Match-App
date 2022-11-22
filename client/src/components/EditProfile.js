import React, { useState, useEffect} from "react";
import "../assets/styles/EditProfile.css";
import bulb2 from "../assets/images/bulb2.png";
import { useNavigate } from "react-router-dom";

/**
 * Amanda Au-Yeung
 * Edits profile by making sure it pulls out default information 
 * from the DB before updating
 * @returns jsx of edit-profile rendering
 */
function EditProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username: "",
    fName: "",
    lName: "",
    email: "",
    subjects: "",
    location: "",
  });
  const [schedule, setSchedule] = useState([]);
  const [pic, setPic] = useState(null);

  // setting default values
  useEffect(() => {
    const fetchExistData = async () => {
      await fetch("/profile/editProfile")
      .then(res => res.json())
      .then(data => {
        let profileInDB = data.profile;
        let profileData = new Map();
        profileData['username'] = profileInDB.displayName;
        profileData['fName'] = profileInDB.fName;
        profileData['lName'] = profileInDB.lName;
        profileData['email'] = profileInDB.email;
        profileData['subjects'] = profileInDB.subjects;
        profileData['location'] = profileInDB.location;
        setProfile(profileData);
        setSchedule(data.profile.schedule);
        setPic(data.profile.pic);
      })
    } 
    fetchExistData();
  }, []);
  
  // updates the value
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const profileInfo = await fetch("/profile/editProfile", {
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
        schedule: schedule,
        pic: pic,
      }),
    });
    const resProfile = await profileInfo.json();
    console.log("resProfile in edit profile", resProfile);
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
    setSchedule(preferredSchedule);
  };

  const uploadImage = (file) => {
    window.URL.revokeObjectURL(pic);
    setPic(window.URL.createObjectURL(file));
  };

  return (
    <div className="EditProfile">
      <div className="container-xl px-4 mt-4">
        <div className="row background-white">
          <div className="col-xl-4 no-padding">
            {/* <!-- Profile picture card--> */}
            <div className="mb-4 mb-xl-0" id="uploadProfileCard">
              <div className="card-header">Profile Picture</div>
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
                <div>
                  <label htmlFor="files" className="btn btn-primary">
                    Upload new image
                  </label>
                  <input
                    id="files"
                    type="file"
                    onChange={(e) => {
                      uploadImage(e.target.files[0]);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 pl-3">
            {/* <!-- Account details card--> */}
            <div className="mb-4 pl-3">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form onSubmit={handleSaveProfile}>
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
                      value={profile.username}
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
                        value={profile.fName}
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
                        value={profile.lName}
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
                      value={profile.email}
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
                        value={profile.subjects}
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
                        value={profile.location}
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
                      id="inputState"
                      multiple={true}
                      className="form-control"
                      name="schedule"
                      value={schedule}
                      onChange={(e) => {
                        handleMultiSelect(e.target.selectedOptions);
                      }}
                    >
                      <option value="weekdaysAM">Weekdays AM</option>
                      <option value="weekdaysPM">Weekends PM</option>
                      <option value="weekendsAM">Weekends AM</option>
                      <option value="weekendsPM">Weekends PM</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  {/* <!-- Save changes button--> */}
                  <button className="btn btn-primary" type="submit">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// EditProfile.propTypes = {
//   name: PropTypes.string,
// };

export default EditProfile;
