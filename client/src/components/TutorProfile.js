import React from "react";
import PropTypes from "prop-types";

function TutorProfile({ searchData, query }) {
  console.log("tutor profile data", searchData);
  // free pic source:
  // <a href="https://www.freepik.com">designed by Pikisuperstar - Freepik.com</a>
  return (
    <div>
      Tutor Profile {console.log("search in Tutor profile", query)}
    </div>
  );
}
TutorProfile.propTypes = {
  searchData: PropTypes.array,
  query:PropTypes.string
};
export default TutorProfile;
