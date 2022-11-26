import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../assets/styles/TutorProfile.css";


/**
 * Yian
 * @param {props} searchData object and query string
 * @returns JSX
 */
function TutorProfile({ searchData, query, handleReturn, searchProfile }) {
  const [displayPairs, setDisplayPairs] = useState([]);

  /**
   * This function creates the tutor profiles in pairs
   */
  useEffect(() => {
    try {
      //push a new copy to pairs array each time
      let pairs = [];
      let i = 0;
      while (i < searchData.length) {
        if (searchData.length && 1) {
          pairs.push(searchData.slice(i, (i += 2)));
        }
      }
      setDisplayPairs(pairs);
    } catch (err) {
      console.error(err);
    }
  }, [searchData]);

  //This function handles the back button
  const handleClick = () => {
    window.localStorage.removeItem("Current_Query");
    handleReturn();
  };

  console.log("displaypairs", displayPairs);
  console.log("tutor profile data", searchData);

  /**
   * function that generates number of stars in tutor profile
   * @param {int} num of stars
   * @returns star icon JSX element
   */
  const starReview = (num) => {
    let s = [];
    for (let i = 0; i < num; i++) {
      s.push(<i key={i} className="fa-solid fa-star" />);
    }
    return s;
  };

  return (
    <div>
      <h3 className="searchRes">Search Results for &quot;{query}&quot;</h3>
      <div className="backDiv">
        <span className="back" onClick={handleClick}>
          <i className="fa-solid fa-arrow-left-long" /> Back to Search
        </span>
      </div>
      <div className="imgRender">
        {displayPairs.map((tutorData, idx) => (
          <div className="card-group " id="cardGroup" key={idx}>
            {tutorData.map((tutorProfile) => (
              <div
                className="card container"
                id="cardimage"
                key={tutorProfile._id}
                onClick={(evt) => {
                  evt.preventDefault();
                  searchProfile(tutorProfile);
                }}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    {" "}
                    Tutor : {tutorProfile.first_name} {tutorProfile.last_name}
                  </h5>
                  <img
                    className="imgs"
                    src={tutorProfile.image}
                    alt="image of tutor"
                  />
                  <div className="card-text-div">
                    <p className="card-text">
                      Subject: {tutorProfile.subjects}
                      <br />
                      Ratings: {starReview(tutorProfile.stars)} by{" "}
                      {tutorProfile.num_of_ratings} members
                      <br />
                      Education: {tutorProfile.education}
                    </p>
                  </div>
                  <div className="cardlink"></div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
TutorProfile.propTypes = {
  searchData: PropTypes.array,
  query: PropTypes.string,
  handleReturn: PropTypes.func,
  searchProfile: PropTypes.func,
};
export default TutorProfile;
