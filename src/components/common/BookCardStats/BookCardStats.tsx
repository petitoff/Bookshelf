import { Book } from "../../../types/Book";
import styles from "./BookCardStats.module.css";

interface Props {
  book: Book;
  isDarkVersion?: boolean;
}

const BookCardStats = ({ book, isDarkVersion = false }: Props) => {
  const calcRatings = () => {
    let sum = 0;
    book.reviews?.forEach((review) => {
      sum += review.rating;
    });

    if (sum === 0) {
      return 0;
    }

    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        {sum / (book.reviews?.length ?? 1)}
        <h4
          style={{
            padding: 0,
            margin: 0,
            fontSize: "0.8rem",
            paddingLeft: "0.2rem",
          }}
        >
          /5
        </h4>
      </div>
    );
  };

  return (
    <div
      className={`${styles.bookCard}`}
      style={{ backgroundColor: `${isDarkVersion ? "#1d1f2b" : "#f7f9fd"}` }}
    >
      <p>
        <strong style={{ color: isDarkVersion ? "#f7f9fd" : "#1d1f2b" }}>
          {calcRatings()}
        </strong>
        <span
          className={`${styles.subtitle}`}
          style={{ color: isDarkVersion ? "#f7f9fd" : "#1d1f2b" }}
        >
          ratings
        </span>
      </p>
      <div className="separator" />

      <p>
        <strong style={{ color: isDarkVersion ? "#f7f9fd" : "#1d1f2b" }}>
          {book?.pages ?? 0}
        </strong>
        <span
          className={`${styles.subtitle}`}
          style={{ color: isDarkVersion ? "#f7f9fd" : "#1d1f2b" }}
        >
          pages
        </span>
      </p>
      <div className="separator" />
      <p>
        <strong style={{ color: isDarkVersion ? "#f7f9fd" : "#1d1f2b" }}>
          {book.reviews?.length ?? 0}
        </strong>
        <span
          className={`${styles.subtitle}`}
          style={{ color: isDarkVersion ? "#f7f9fd" : "#1d1f2b" }}
        >
          reviews
        </span>
      </p>
    </div>
  );
};

export default BookCardStats;
