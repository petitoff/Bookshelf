import "./ReviewsSection.scss";
import ReviewCard from "../ReviewCard/ReviewCard";
import { Review } from "../../types/Book";
import CreateReview from "../CreateReview/CreateReview";
import useAddReviewToFirestore from "../../hooks/useAddReviewToFirestore";

interface Props {
  bookId: string;
  reviews: Review[];
}
const ReviewsSection = ({ bookId, reviews }: Props) => {
  const { addReview } = useAddReviewToFirestore(bookId);
  const handleCreateReview = (rating: number, content?: string) => {
    addReview({ rating, content });
  };

  return (
    <div className="reviews-section">
      {reviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}

      {reviews.length === 0 && (
        <p className="reviews-section__no-reviews">
          There are no reviews for this book yet ☹️
        </p>
      )}

      <div className={"reviews-section__create-review"}>
        <CreateReview onSubmit={handleCreateReview} />
      </div>
    </div>
  );
};

export default ReviewsSection;
