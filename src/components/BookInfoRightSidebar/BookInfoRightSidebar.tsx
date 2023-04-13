import { useEffect } from "react";
import BasicInfoSection from "../common/BookCardStats/BookCardStats";
import WideButton from "../common/WideButton/WideButton";
import styles from "./BookInfoRightSidebar.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  closeRightSidebar,
  openRightSidebar,
} from "../../store/slices/sidebarSlice";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { useHistory } from "react-router-dom";

/**
 * The BookInfoRightSidebar component displays information and details about a book in the right sidebar.
 * It includes the book cover, title, author, basic information section, plot summary, and a button to read the book.
 * @returns JSX.Element
 */
const BookInfoRightSidebar = () => {
  const isOpen = useAppSelector((state) => state.sidebar.isRightSidebarOpen);
  const activeBook = useAppSelector((state) => state.books.activeBook);

  const { getImageUrl, imageUrl } = useFirebaseImage();
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (activeBook?.imageId) {
        await getImageUrl(activeBook.imageId);
      }
    };

    fetchImageUrl();
  }, [activeBook, getImageUrl]);

  useEffect(() => {
    dispatch(openRightSidebar());

    return () => {
      dispatch(closeRightSidebar());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenDetailsPage = () => {
    history.push(`/books/${activeBook?.id}`);
  };

  return (
    <div className={`${styles.bookInfo} ${isOpen ? styles.show : ""}`}>
      <h2>About the book</h2>

      {activeBook ? (
        <>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={activeBook.title}
              className={styles.image}
            />
          ) : (
            <div className={styles.image}></div>
          )}
          <h3>{activeBook.title}</h3>
          <h5>{activeBook.authorName}</h5>

          <BasicInfoSection book={activeBook} isDarkMode={true} />

          <div className={styles.plot}>
            <h2>Plot</h2>
            <p>{activeBook.summary ?? "No summary available for this book."}</p>
          </div>
        </>
      ) : (
        <div className={styles.noBook}>
          <h3>No book selected</h3>
        </div>
      )}

      <WideButton
        isActive={activeBook !== null}
        onClick={handleOpenDetailsPage}
      >
        <p style={{ fontSize: "15px", fontWeight: 700 }}>Read</p>
      </WideButton>
    </div>
  );
};

export default BookInfoRightSidebar;
