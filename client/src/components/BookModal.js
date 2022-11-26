import React from "react";
import "../assets/styles/BookModal.css";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

/**
 * Yian Chen
 * @param {props} props from parent component BookClass.js
 * @returns JSX of book modal UI
 */
function BookModal({
  open,
  handleModal,
  addClass,
  removeClass,
  confirmClasses,
  tutorProfile,
  bookDates,
  bookClassMap,
}) {
  if (!open) return null;

  /**
   * function that renders time buttons
   * adds time to bookClassMap when clicked
   * removes from bookClassMap when clicked again
   * @param {string} _date
   * @param {string} _time
   * @returns button UI
   */
  const renderButton = (_date, _time) => {
    return (
      <button
        className={
          bookClassMap.get(`${_date} ${_time}`) &&
          bookClassMap.get(`${_date} ${_time}`).tutor ===
            tutorProfile.first_name
            ? "hourBtnSelect"
            : "hourBtn"
        }
        onClick={() =>
          bookClassMap.get(`${_date} ${_time}`)
            ? removeClass(_date, _time)
            : addClass(_date, _time)
        }
      >
        {_time}
      </button>
    );
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
      <div className="modalContainer">
        <div className="modalRight">
          <p className="closeBtn" onClick={handleModal}>
            <i className="fa-regular fa-x"></i>
          </p>
          <div className="content">
            {bookDates.map((date, idx) => {
              return (
                <div className="time" key={idx}>
                  <p>{date}</p>
                  {tutorProfile.hours[idx].map((hr, i) => {
                    return (
                      <div key={i} className="hourDiv">
                        {renderButton(date, hr)}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div className="btnContainer">
          <button className="confirmBtn" onClick={() => confirmClasses()}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modalRoot")
  );
}
BookModal.propTypes = {
  open: PropTypes.bool,
  handleModal: PropTypes.func,
  addClass: PropTypes.func,
  removeClass: PropTypes.func,
  confirmClasses: PropTypes.func,
  tutorProfile: PropTypes.object,
  bookDates: PropTypes.array,
  bookClassMap: PropTypes.any,
};
export default BookModal;
