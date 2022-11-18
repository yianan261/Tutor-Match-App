import React from "react";
import "../assets/styles/BookModal.css";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { dateHelper } from "../utils/bookDates";
import { randHours } from "../utils/dates";

function BookModal({ open, handleModal, addClass }) {
  const newDates = [...new Set(dateHelper(4))];
  if (!open) return null;

  const handleDate = (_date, _time) => {
    console.log(_date, _time);
    addClass(_date,_time)
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
            {newDates.map((date, idx) => {
              return (
                <div className="time" key={idx}>
                  <p>{date}</p>
                  {[...new Set(randHours())].map((hr, i) => {
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
          <button className="confirmBtn">Confirm Booking</button>
        </div>
      </div>
    </div>,
    document.getElementById("modalRoot")
  );
}

BookModal.propTypes = {
  open: PropTypes.bool,
  handleModal: PropTypes.func,
  addClass: PropTypes.func
};
export default BookModal;
