import React from "react";
import "../assets/styles/BookModal.css";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

function BookModal({ open, handleModal }) {
  if (!open) return null;
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
            <p>Book1</p>
            <p>Book2</p>
            <p>Book3</p>
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
};
export default BookModal;
