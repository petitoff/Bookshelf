import React from "react";
import "./ReviewCard.scss";
import RatingIndicator from "../RatingIndicator/RatingIndicator";
import { Review } from "../../types/Book";

interface Props {
  review: Review;
}

const ReviewCard = ({ review }: Props) => {
  const createUserInitialsFromUsername = (username: string) => {
    const names = username.split(" ");
    const initials = names.map((name) => name.charAt(0).toUpperCase());
    return initials.join("");
  };

  return (
    <div className="review-card">
      <div className="review-card__header">
        <div className="review-card__user-info">
          <div className="review-card__avatar">
            {createUserInitialsFromUsername(review.username)}
          </div>
          <div className="review-card__username">{review.username}</div>
        </div>
        <RatingIndicator rating={review.rating} />
      </div>
      <div className="review-card__content">{review.content}</div>
    </div>
  );
};

export default ReviewCard;
