import BookInfoRightSidebar from "../components/BookInfoRightSidebar/BookInfoRightSidebar";
import BookSection from "../components/BookSection/BookSection";
import ForYouSection from "../components/ForYouSection/ForYouSection";
import { useAppSelector } from "../hooks/hooks";
import { useBooks } from "../hooks/useBooks";
import useUserData from "../hooks/useUserData";
import styles from "./Pages.module.scss";
import LoadingIndicator from "../components/common/LoadingIndicator/LoadingIndicator";

const Books = () => {
  const { books, booksSearch } = useAppSelector((state) => state.books);
  const isSearchResults = booksSearch && booksSearch.length > 0;

  const { fetchingStatus } = useBooks();
  useUserData();

  return (
    <div className={styles.books}>
      <BookInfoRightSidebar />
      <div className={styles.booksLeftContainer}>
        {fetchingStatus === "loading" ? (
          <LoadingIndicator />
        ) : (
          <>
            {isSearchResults ? (
              <div className={styles.booksContainer}>
                <BookSection
                  titleOfSection="Search Results"
                  books={booksSearch}
                />
              </div>
            ) : (
              <>
                <ForYouSection />
                <div className={styles.booksContainer}>
                  <BookSection titleOfSection="Popular Books" books={books} />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Books;
