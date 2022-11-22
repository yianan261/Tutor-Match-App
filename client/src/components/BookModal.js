import React from "react";
import "../assets/styles/BookModal.css";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

function BookModal({
  open,
  handleModal,
  addClass,
  confirmClasses,
  tutorProfile,
  bookDates,
}) {
  if (!open) return null;

  const handleDate = (_date, _time) => {
    console.log(_date, _time);
    addClass(_date, _time);
  };

  // const renderButton = ()=>{
  // console.log("check bookClass",bookClass)
  // }

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
                        <button
                          className="hourBtn"
                          onClick={() => handleDate(date, hr)}
                        >
                          {hr}
                        </button>
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
  confirmClasses: PropTypes.func,
  tutorProfile: PropTypes.object,
  bookDates: PropTypes.array,
};
export default BookModal;
