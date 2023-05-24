import { Book } from "../../../types/Book";
import styles from "./BookCardStats.module.css";

interface Props {
  book: Book;
  isDarkMode: boolean;
}

const BookCardStats = ({ book, isDarkMode }: Props) => {
  const calcRatings = () => {
    let sum = 0;
    book.reviews?.forEach((review) => {
      sum += review.rating;
    });

    if (sum === 0) {
      return 0;
    }

    return sum / (book.reviews?.length ?? 1);
  };

  return (
    <div
      className={`${styles.bookCard}`}
      style={{ backgroundColor: `${isDarkMode ? "#1d1f2b" : "#fff"}` }}
    >
      <p>
        <strong>{book?.pages ?? 0}</strong>
        <span className={`${styles.subtitle}`}>pages</span>
      </p>
      <div className="separator" />
      <p>
        <strong>{book.reviews?.length ?? 0}</strong>
        <span className={`${styles.subtitle}`}>reviews</span>
      </p>
      <div className="separator" />
      <p>
        <strong>{calcRatings()}</strong>
        <span className={`${styles.subtitle}`}>ratings</span>
      </p>
    </div>
  );
};

export default BookCardStats;
