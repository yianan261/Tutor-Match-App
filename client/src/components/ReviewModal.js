import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../assets/styles/ReviewModal.css";
import PropTypes from "prop-types";
import Rate from "./Rate";

/**Yian Chen
 * @param {props} props from parent component ClassHistory.js
 * @returns JSX of review modal
 */
function ReviewModal({ handleModal, currTutor }) {
  const [comment, setComment] = useState({
    tutor: currTutor.tutor,
    tutor_lastname: currTutor.last_name,
  });

  /**Yian Chen
   * function that handles submit
   * @param {*} evt
   */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const res = await fetch("/api/addReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      const resMsg = await res.json();
      alert(resMsg.msg);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * function that handles change when user starts typing
   * @param {*} evt
   */
  const handleChange = (evt) => {
    evt.preventDefault();
    const newData = { ...comment };
    newData.review = evt.target.value;
    setComment(newData);
  };

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
      <div className="modalContainerReview">
        <div className="modalRightReview">
          <p className="closeBtnReview" onClick={handleModal}>
            <i className="fa-regular fa-x"></i>
          </p>
          <div className="contentReview">
            <p className="titleReview">We appreciate your feedback ! </p>
            <div className="StarDiv">
              <Rate />
            </div>

            <div className="form-group">
              <form action="post" onSubmit={handleSubmit}>
                <label
                  className="textTitle"
                  htmlFor="exampleFormControlTextarea1"
                >
                  Leave a review for the tutor
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="6"
                  name="review"
                  value={comment.review}
                  onChange={handleChange}
                ></textarea>
                <span className="submitBtnSpan">
                  <button className="reviewBtn" type="submit">
                    Submit Review
                  </button>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modalRootAddReview")
  );
}

ReviewModal.propTypes = {
  handleModal: PropTypes.func,
  currTutor: PropTypes.object,
};
export default ReviewModal;
