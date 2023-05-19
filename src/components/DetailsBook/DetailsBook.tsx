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

const DetailsBook = () => {
  const { id } = useParams<{ id: string }>();
  const user = useAppSelector((state) => state.auth.user);

  const { book, imageUrl, isLoading } = useBookWithImage({
    bookId: id,
  });

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
            "Read online"
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
      </div>
    </div>
  );
};

export default DetailsBook;
