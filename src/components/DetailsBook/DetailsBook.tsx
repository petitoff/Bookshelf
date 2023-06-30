import { useParams } from "react-router";
import styles from "./DetailsBook.module.scss";
import WideButton from "../common/WideButton/WideButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import LoadingIndicator from "../common/LoadingIndicator/LoadingIndicator";
import { addReadingListBookId } from "../../firebase/services/firestore";
import { useAppSelector } from "../../hooks/hooks";
import { toast } from "react-toastify";
import useBookWithImage from "../../hooks/dataHooks/booksHooks/useBookWithImage";
import StarRatingDistribution from "../StarRatingDistribution/StarRatingDistribution";
import ReviewsSection from "../ReviewsSection/ReviewsSection";
import { useEffect, useState } from "react";
import { Book } from "../../types/Book";
import BookCardStats from "../common/BookCardStats/BookCardStats";
import { FaBookmark } from "react-icons/fa";

const DetailsBook = () => {
  const [activeDetailsBook, setActiveDetailsBook] = useState<Book>();

  const { id } = useParams<{ id: string }>();
  const user = useAppSelector((state) => state.auth.user);

  const books = useAppSelector((state) => state.books.books);

  const {
    book,
    imageUrl,
    isLoading: isImageLoading,
  } = useBookWithImage({
    bookId: id,
  });

  const ratings =
    book?.reviews?.reduce((acc, review) => {
      acc[review.rating - 1] = (acc[review.rating - 1] || 0) + 1;
      return acc;
    }, new Array(5).fill(0)) || [];

  const handleReadOnline = () => {
    toast.info("This book is not available to read online");
  };

  const handleAddBookToReadingList = async () => {
    if (!user?.UID || !book?.id) {
      toast.error("You must be logged in to add a book to your reading list");
      return;
    }

    await addReadingListBookId(user?.UID, book?.id);
  };

  const renderButtonText = (text: string) => (
    <p className={styles.buttonText}>{text}</p>
  );

  const renderWideButton = (
    icon: JSX.Element,
    text: string,
    onClick?: () => void
  ) => (
    <WideButton isActive={true} className={styles.button} onClick={onClick}>
      <div className={styles.innerContainer}>
        <div className={styles.leftItem}>{icon}</div>
        <div className={styles.centerItem}>{renderButtonText(text)}</div>
        <div className={styles.rightItem}></div>
      </div>
    </WideButton>
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    if (books) {
      const bookLocal = books.find((book) => book.id === id);
      setActiveDetailsBook(bookLocal);
    }
  }, [books, id]);

  if (!book) {
    return <LoadingIndicator isFullHeightOfSite />;
  }

  const imagePlaceholder = (
    <div
      className={styles.imagePlaceholder}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#eee",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>Loading...</p>
    </div>
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftContainer}>
        {isImageLoading && imagePlaceholder}
        <img
          src={book?.imageUrl ?? imageUrl ?? ""}
          alt={book.title}
          className={styles.imageContainer}
        />
        <div className={styles.buttonGroup}>
          {renderWideButton(
            <FontAwesomeIcon icon={faBookOpen} size="2x" />,
            "Read online",
            handleReadOnline
          )}
          {renderWideButton(
            <FaBookmark size={32} color="#fff" />,
            "Save to reading list",
            handleAddBookToReadingList
          )}
        </div>
      </div>
      <div className={styles.rightContainer}>
        <h1>{book.title}</h1>
        <p>{book.authorName}</p>

        <BookCardStats book={book} isDarkVersion={false} />

        <h3>Plot</h3>
        <p>{book.summary}</p>

        <div className={styles.reviewSection}>
          <h2>Review section</h2>
          <StarRatingDistribution ratings={ratings} />
          <ReviewsSection
            bookId={id}
            reviews={activeDetailsBook?.reviews ?? book.reviews ?? []}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsBook;
