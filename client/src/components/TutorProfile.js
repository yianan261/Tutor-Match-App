import React from "react";
import PropTypes from "prop-types";

function TutorProfile({ searchword, searchData }) {
  console.log("data", searchData);
  // free pic source:
  // <a href="https://www.freepik.com">designed by Pikisuperstar - Freepik.com</a>
  return (
    <div>
      Tutor Profile {console.log("search in Tutor profile", searchword)}
    </div>
  );
}
TutorProfile.propTypes = {
  searchword: PropTypes.string,
  searchData: PropTypes.array,
};
export default TutorProfile;
