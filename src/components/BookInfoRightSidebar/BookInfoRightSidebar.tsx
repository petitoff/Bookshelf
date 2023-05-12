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
import useMediaQuery from "../../hooks/useMediaQuery";

/**
 * The BookInfoRightSidebar component displays information and details about a book in the right sidebar.
 * It includes the book cover, title, author, basic information section, plot summary, and a button to read the book.
 * @returns JSX.Element
 */
const BookInfoRightSidebar = () => {
  const { isRightSidebarOpen } = useAppSelector((state) => state.sidebar);
  const { activeBook } = useAppSelector((state) => state.books);

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
  }, [dispatch]);

  useMediaQuery("(max-width: 1200px)", (matches: boolean) => {
    if (matches) {
      dispatch(closeRightSidebar());
    } else {
      dispatch(openRightSidebar());
    }
  });

  const handleOpenDetailsPage = () => {
    history.push(`/book/${activeBook?.id}`);
  };

  const renderBookInfo = () => (
    <>
      {imageUrl ? (
        <img src={imageUrl} alt={activeBook?.title} className={styles.image} />
      ) : (
        <div className={styles.image}></div>
      )}
      <h3>{activeBook?.title}</h3>
      <h5>{activeBook?.authorName}</h5>

      {activeBook && <BasicInfoSection book={activeBook} isDarkMode />}

      <div className={styles.plot}>
        <h2>Plot</h2>
        <p>{activeBook?.summary ?? "No summary available for this book."}</p>
      </div>
    </>
  );

  const renderNoBookSelected = () => (
    <div className={styles.noBook}>
      <h3>No book selected</h3>
    </div>
  );

  return (
    <div
      className={`${styles.bookInfo} ${isRightSidebarOpen ? styles.show : ""}`}
    >
      <h2>About the book</h2>

      {activeBook ? renderBookInfo() : renderNoBookSelected()}

      <div className={styles.buttonContainer}>
        <WideButton isActive={!!activeBook} onClick={handleOpenDetailsPage}>
          <p style={{ fontSize: "15px", fontWeight: 700 }}>Read</p>
        </WideButton>
      </div>
    </div>
  );
};

export default BookInfoRightSidebar;
