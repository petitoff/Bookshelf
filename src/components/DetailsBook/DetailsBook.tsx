import { useParams } from "react-router";
import { useSingleBook } from "../../hooks/useSingleBook";
import styles from "./DetailsBook.module.scss";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { useEffect } from "react";
import WideButton from "../common/WideButton/WideButton";
import { AiOutlineBook } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import LoadingIndicator from "../common/LoadingIndicator/LoadingIndicator";
import { addFavoriteBookId } from "../../firebase/services/firestore";
import { useAppSelector } from "../../hooks/hooks";

const DetailsBook = () => {
  const { id } = useParams<{ id: string }>();
  const { book, loading } = useSingleBook(id);
  const user = useAppSelector((state) => state.auth.user);
  const { getImageUrl, imageUrl } = useFirebaseImage();

  const handleAddBookToReadingList = async () => {
    if (!user?.UID || !book?.id) return;

    addFavoriteBookId(user?.UID, book?.id);
  };

  useEffect(() => {
    if (!book?.imageId) return;

    getImageUrl(book?.imageId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book?.imageId]);

  // if the book is loading, return a loading message
  if (loading) {
    return <LoadingIndicator />;
  }

  if (!book) {
    return <p>Book not found</p>;
  }

  // create a return statement with the book details
  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftContainer}>
        <img
          src={imageUrl ?? ""}
          alt={book.title}
          className={styles.imageContainer}
        />
        <div className={styles.buttonGroup}>
          <WideButton isActive={true} className={styles.button}>
            <div className={styles.innerContainer}>
              <div className={styles.leftItem}>
                <FontAwesomeIcon icon={faBookOpen} size="2x" />
              </div>
              <div className={styles.centerItem}>
                <p style={{ color: "#fff" }}>Read online</p>
              </div>
              <div className={styles.rightItem}></div>
            </div>
          </WideButton>
          <WideButton
            isActive={true}
            className={styles.button}
            onClick={handleAddBookToReadingList}
          >
            <div className={styles.innerContainer}>
              <div className={styles.leftItem}>
                <AiOutlineBook size={32} color="#fff" />
              </div>
              <div className={styles.centerItem}>
                <p style={{ color: "#fff" }}>Save to reading list</p>
              </div>
              <div className={styles.rightItem}></div>
            </div>
          </WideButton>
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
