import React from "react";
import PropTypes from "prop-types";

function TutorInfo({ tutorID }) {
  console.log("TutorID", tutorID);
  return <div>Tutor Info</div>;
}

TutorInfo.propTypes = {
  tutorID: PropTypes.string,
};
export default TutorInfo;
