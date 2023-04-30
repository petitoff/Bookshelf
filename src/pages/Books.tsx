import BookInfoRightSidebar from "../components/BookInfoRightSidebar/BookInfoRightSidebar";
import BookSection from "../components/BookSection/BookSection";
import ForYouSection from "../components/ForYouSection/ForYouSection";
import { useAppSelector } from "../hooks/hooks";
import { useBooks } from "../hooks/useBooks";
import styles from "./Pages.module.scss";

const Books = () => {
  useBooks();

  const booksSearch = useAppSelector((state) => state.books.booksSearch);
  const books = useAppSelector((state) => state.books.books);

  const isSearchResults = booksSearch && booksSearch.length > 0;

  return (
    <div className={styles.books}>
      <BookInfoRightSidebar />
      <div className={styles.booksLeftContainer}>
        {isSearchResults ? (
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
