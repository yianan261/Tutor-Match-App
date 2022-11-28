import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../assets/styles/Rate.css";

//Yian
//component that renders star ratings in Review Modal
//Source:https://youtu.be/eDw46GYAIDQ
function Rate() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              className="star"
              color={
                ratingValue <= (hover || rating)
                  ? "rgb(243, 224, 49)"
                  : "#C0C2C9"
              }
              size={40}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => {
                setHover(null);
              }}
            />
          </label>
        );
      })}
    </div>
  );
}

Rate.propTypes = {};
export default Rate;
