import { useParams } from "react-router";
import { useSingleBook } from "../../hooks/useSingleBook";
import styles from "./DetailsBook.module.scss";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { useEffect } from "react";
import WideButton from "../common/WideButton/WideButton";
import { AiOutlineBook } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

const DetailsBook = () => {
  const { id } = useParams<{ id: string }>();
  const { book, loading } = useSingleBook(id);
  const { getImageUrl, imageUrl } = useFirebaseImage();

  useEffect(() => {
    getImageUrl(book?.imageId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book?.imageId]);

  // if the book is loading, return a loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!book) {
    return <p>Book not found</p>;
  }

  // create a return statement with the book details
  return (
    <div className={styles.container}>
      <div className={styles.item1}>
        <img src={imageUrl ?? ""} alt={book.title} className={styles.image} />
        <div className={styles.buttonContainer}>
          <WideButton isActive={true} className={styles.button}>
            <div className={styles.container}>
              <div className={styles.left}>
                <FontAwesomeIcon icon={faBookOpen} size="2x" />
              </div>
              <div className={styles.center}>
                <p style={{ color: "#fff" }}>Read online</p>
              </div>
              <div className={styles.right}></div>
            </div>
          </WideButton>
          <WideButton isActive={true} className={styles.button}>
            <div className={styles.container}>
              <div className={styles.left}>
                <AiOutlineBook size={32} color="#fff" />
              </div>
              <div className={styles.center}>
                <p style={{ color: "#fff" }}>Save to reading list</p>
              </div>
              <div className={styles.right}></div>
            </div>
          </WideButton>
        </div>
      </div>
      <div className={styles.item2}>
        <h1>{book.title}</h1>
        <p>{book.authorName}</p>
        <p>{book.summary}</p>
      </div>
    </div>
  );
};

export default DetailsBook;
