import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "../assets/styles/TutorModal.css";

/**
 * Yian Chen
 * @param {props} props from parent ManageBook component
 * @returns UI of tutor detail Modal
 */
function TutorModal({ handleModal, tutorInfo }) {
  return ReactDOM.createPortal(
    <div
      className="overlay"
      style={{
        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        display: "grid",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="modalContainerTutor">
        <div className="modalRightReview">
          <p className="closeBtnReview" onClick={handleModal}>
            <i className="fa-regular fa-x"></i>
          </p>
          <div className="contentReview">
            <p className="titleReview">Tutor Details </p>
            <div className="tutorDetailsDiv">
              <ul className="tutorUL">
                <li className="tutorli">
                  Tutor : {tutorInfo.first_name} {tutorInfo.last_name}
                </li>
                <li className="tutorli"> Subject : {tutorInfo.subjects}</li>
                <li className="tutorli">
                  Tutor Education : {tutorInfo.education}{" "}
                </li>
                <li className="tutorli">
                  Ratings: {tutorInfo.num_of_ratings} ratings by members
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modalRootTutor")
  );
}
TutorModal.propTypes = {
  handleModal: PropTypes.func,
  currTutor: PropTypes.any,
};
export default TutorModal;
