import BookInfoRightSidebar from "../components/BookInfoRightSidebar/BookInfoRightSidebar";
import BookSection from "../components/BookSection/BookSection";
import { ForYouSection } from "../components/ForYouSection/ForYouSection";
import { useAppSelector } from "../hooks/hooks";
import { useBooks } from "../hooks/dataHooks/booksHooks/useBooks";
import styles from "./Pages.module.scss";
import LoadingIndicator from "../components/common/LoadingIndicator/LoadingIndicator";
import CategoryList from "../components/common/CategoryList/CategoryList";
import useFilterBooksByCategory from "../hooks/dataHooks/booksHooks/useFilterBooksByCategory";

const Books = () => {
  const { books, booksSearch, activeBookCategory } = useAppSelector(
    (state) => state.books
  );

  const booksFilteredByCategory = useAppSelector(
    (state) => state.books.booksFilteredByCategory
  );

  const isUserHaveFavoriteCategories = !!useAppSelector(
    (state) => state.auth.user?.favouriteCategories?.length
  );

  const isSearchResults = booksSearch && booksSearch.length > 0;

  const { fetchingStatus } = useBooks();
  useFilterBooksByCategory(books, activeBookCategory);

  return (
    <div className={styles.books}>
      <BookInfoRightSidebar />
      <div className={styles.booksLeftContainer}>
        {fetchingStatus === "loading" ? (
          <LoadingIndicator isFullHeightOfSite />
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
                {isUserHaveFavoriteCategories && <ForYouSection />}
                <div className={styles.booksContainer}>
                  <CategoryList />
                  <BookSection
                    titleOfSection=""
                    books={booksFilteredByCategory ?? books}
                  />
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
