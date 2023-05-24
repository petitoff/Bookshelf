import { useParams } from "react-router";
import styles from "./DetailsBook.module.scss";
import WideButton from "../common/WideButton/WideButton";
import { AiOutlineBook } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import LoadingIndicator from "../common/LoadingIndicator/LoadingIndicator";
import { addReadingListBookId } from "../../firebase/services/firestore";
import { useAppSelector } from "../../hooks/hooks";
import { toast } from "react-toastify";
import useBookWithImage from "../../hooks/useBookWithImage";
import StarRatingDistribution from "../StarRatingDistribution/StarRatingDistribution";
import ReviewsSection from "../ReviewsSection/ReviewsSection";
import { useEffect, useState } from "react";
import { Book } from "../../types/Book";

const DetailsBook = () => {
  const [activeDetailsBook, setActiveDetailsBook] = useState<Book>();

  const { id } = useParams<{ id: string }>();
  const user = useAppSelector((state) => state.auth.user);

  const books = useAppSelector((state) => state.books.books);

  const { book, imageUrl, isLoading } = useBookWithImage({
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
    icon: React.ReactNode,
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
    if (books) {
      const bookLocal = books.find((book) => book.id === id);
      setActiveDetailsBook(bookLocal);
    }
  }, [books, id]);

  if (isLoading) {
    return <LoadingIndicator isFullHeightOfSite />;
  }

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftContainer}>
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
            <AiOutlineBook size={32} color="#fff" />,
            "Save to reading list",
            handleAddBookToReadingList
          )}
        </div>
      </div>
      <div className={styles.rightContainer}>
        <h1>{book.title}</h1>
        <p>{book.authorName}</p>
        <p>{book.summary}</p>

        <StarRatingDistribution ratings={ratings ?? []} />
        <ReviewsSection
          bookId={id}
          reviews={activeDetailsBook?.reviews ?? book.reviews ?? []}
        />
      </div>
    </div>
  );
};

export default DetailsBook;
