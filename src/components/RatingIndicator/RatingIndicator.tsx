import React from "react";
import "./RatingIndicator.scss";

interface Props {
  rating: number;
}
const RatingIndicator = ({ rating }: Props) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`rating-indicator__star ${
          i <= rating ? "rating-indicator__star--filled" : ""
        }`}
      >
        ★
      </span>
    );
  }

  return <div className="rating-indicator">{stars}</div>;
};

export default RatingIndicator;
