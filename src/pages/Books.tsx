import BookInfoRightSidebar from "../components/BookInfoRightSidebar/BookInfoRightSidebar";
import BookSection from "../components/BookSection/BookSection";
import { ForYouSection } from "../components/ForYouSection/ForYouSection";
import { useAppSelector } from "../hooks/hooks";
import { useBooks } from "../hooks/dataHooks/booksHooks/useBooks";
import styles from "./Pages.module.scss";
import LoadingIndicator from "../components/common/LoadingIndicator/LoadingIndicator";
import CategoryList from "../components/common/CategoryList/CategoryList";
import useFilterBooksByCategory from "../hooks/dataHooks/booksHooks/useFilterBooksByCategory";
import { SearchResults } from "../features/SearchResults/SearchResults";

const Books = () => {
  const { fetchingStatus } = useBooks();

  const { books, booksSearch, activeBookCategory, booksFilteredByCategory } =
    useAppSelector((state) => state.books);

  const isUserHaveFavoriteCategories = useAppSelector(
    (state) => !!state.auth.user?.favouriteCategories?.length
  );

  const isSearchResults = !!booksSearch?.length;

  useFilterBooksByCategory(books, activeBookCategory);

  const renderContent = () => {
    if (fetchingStatus === "loading") {
      return <LoadingIndicator isFullHeightOfSite />;
    }

    if (isSearchResults) {
      return <SearchResults booksDataFromSearchResult={booksSearch} />;
    }

    // default
    return (
      <div className={styles.container}>
        {isUserHaveFavoriteCategories && <ForYouSection />}
        <CategoryList />
        <BookSection
          titleOfSection=""
          books={booksFilteredByCategory ?? books}
        />
      </div>
    );
  };

  return (
    <div className={styles.books}>
      <div className={styles["left-container"]}>{renderContent()}</div>

      <div className={styles["right-container"]}>
        <BookInfoRightSidebar />
      </div>

      {/* <div className={styles.booksLeftContainer}>
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
      </div> */}
    </div>
  );
};

export default Books;
