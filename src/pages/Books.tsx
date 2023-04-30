import BookInfoRightSidebar from "../components/BookInfoRightSidebar/BookInfoRightSidebar";
import BookSection from "../components/BookSection/BookSection";
import ForYouSection from "../components/ForYouSection/ForYouSection";
import { useAppSelector } from "../hooks/hooks";
import { useBooks } from "../hooks/useBooks";
import styles from "./Pages.module.scss";

const Books = () => {
  const booksSearch = useAppSelector((state) => state.books.booksSearch);
  const books = useAppSelector((state) => state.books.books);
  useBooks();

  return (
    <div className={styles.books}>
      <BookInfoRightSidebar />
      <div className={styles.booksLeftContainer}>
        {booksSearch && booksSearch.length > 0 ? (
          <div className={styles.booksContainer}>
            <BookSection
              titleOfSection={"Search Results"}
              books={booksSearch}
            />
          </div>
        ) : (
          <>
            <ForYouSection />
            <div className={styles.booksContainer}>
              <BookSection titleOfSection={"Popular Books"} books={books} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Books;
