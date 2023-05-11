import { useParams } from "react-router";
import { useSingleBook } from "../../hooks/useSingleBook";
import styles from "./DetailsBook.module.scss";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { useEffect, useState } from "react";
import WideButton from "../common/WideButton/WideButton";
import { AiOutlineBook } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import LoadingIndicator from "../common/LoadingIndicator/LoadingIndicator";
import { addReadingListBookId } from "../../firebase/services/firestore";
import { useAppSelector } from "../../hooks/hooks";
import { toast } from "react-toastify";

const DetailsBook = () => {
  const { id } = useParams<{ id: string }>();
  const user = useAppSelector((state) => state.auth.user);
  const books = useAppSelector((state) => state.books.books);

  const { book, loading } = useSingleBook(id);
  const [bookLocal, setBookLocal] = useState(book);
  const [imageUrl, setImageUrl] = useState<string | null>();
  const { getImageUrl } = useFirebaseImage();

  const handleAddBookToReadingList = async () => {
    if (!user?.UID || !book?.id) {
      toast.error("You must be logged in to add a book to your reading list");
      return;
    }

    await addReadingListBookId(user?.UID, book?.id);
  };

  useEffect(() => {
    if (!books.length) {
      (async () => {
        const fetchedImageUrl = await getImageUrl(book?.imageId);
        fetchedImageUrl && setImageUrl(fetchedImageUrl);
      })();
      return;
    }

    if (!book) return;

    const bookInBooks = books.find((b) => b.id === book.id);

    if (!bookInBooks) return;

    setBookLocal(bookInBooks);
  }, [book, books, getImageUrl]);

  if (loading) {
    return <LoadingIndicator isFullHeightOfSite />;
  }

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftContainer}>
        <img
          src={bookLocal?.imageUrl ?? imageUrl ?? ""}
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
                <p className={styles.buttonText}>Read online</p>
              </div>
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
                <p className={styles.buttonText}>Save to reading list</p>
              </div>
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
