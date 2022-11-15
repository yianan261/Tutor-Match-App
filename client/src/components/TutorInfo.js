import React from "react";
import PropTypes from "prop-types";
import "../assets/styles/TutorInfo.css";

function TutorInfo({ tutorProfile }) {
  console.log("TutorID", tutorProfile);
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
  console.log("Check type",typeof(tutorProfile.reviews))
  
  const renderProfile = (reviews) => {
    return reviews.map((review, idx) => {
      <div className="innerDiv" key={idx}>
        <section className="rectangle">
          <div className="wrapper">
            <div className="review">
              <div className="review-base">
                <blockquote className="review-text">{review}</blockquote>
              </div>
            </div>
          </div>
        </section>
      </div>;
    });
  };

  return (
    <>
      <div className="card-group2 " id="cardGroup2">
        <div className="card2 container-xl" id="cardimage2">
          <div className="card-body2">
            <div className="row">
              <div className="col div1">
                <h5 className="card-title2">
                  {" "}
                  Tutor : {tutorProfile.first_name} {tutorProfile.last_name}
                </h5>
                <img
                  className="imgs2"
                  src={tutorProfile.image}
                  alt="image of tutorProfile"
                />
                <div className="card-text-div2">
                  <p className="card-text2">
                    Subject: {tutorProfile.subjects}
                    <br />
                    Ratings: {starReview(tutorProfile.stars)} by{" "}
                    {tutorProfile.num_of_ratings} members
                    <br />
                    Education: {tutorProfile.education}
                  </p>
                </div>
                <div className="cardlink2"></div>
              </div>
              <div className="col div2">
                {console.log(tutorProfile.reviews)}
                {renderProfile(tutorProfile.reviews)}
                {/* {tutorProfile.reviews.map((review, idx) => {
                  <div className="innerDiv" key={idx}>
                    <section className="rectangle">
                      <div className="wrapper">
                        <div className="review">
                          <div className="review-base">
                            <blockquote className="review-text">
                              {review}
                            </blockquote>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>;
                })} */}
              </div>
            </div>
          </div>
          <span className="btnSpan">
            <button className="bookBtn">
              Book Class with {tutorProfile.first_name}
            </button>
          </span>
        </div>
      </div>
    </>
  );
}

TutorInfo.propTypes = {
  tutorProfile: PropTypes.object,
};
export default TutorInfo;
