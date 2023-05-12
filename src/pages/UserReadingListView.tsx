import { useParams } from "react-router-dom";
import useUserIdFromUsername from "../hooks/useUserIdFromUsername";
import { useEffect } from "react";
import LoadingIndicator from "../components/common/LoadingIndicator/LoadingIndicator";
import styles from "./Pages.module.scss";
import UserReadingListHeader from "../components/common/UserReadingListHeader/UserReadingListHeader";
import BookList from "../components/common/BookList/BookList";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import useReadingListBooks from "../hooks/useReadingListBooks";
import { deleteBookFromReadingList } from "../utils/readingListHelpers";

const UserReadingListView = () => {
  const { username } = useParams<{ username: string }>();
  const user = useAppSelector((state) => state.auth.user);
  const {
    readingListBooks,
    fetchingStatus: readingListBooksFetchingStatus,
    updateUserId,
  } = useReadingListBooks();
  const {
    userId,
    fetchingStatus: userIdFetchingStatus,
    updateUsername,
  } = useUserIdFromUsername();
  const isOwner = user?.username === username;

  const dispatch = useAppDispatch();

  const handleDeleteBookFromReadingList = async (bookId: string) => {
    deleteBookFromReadingList(bookId, user?.UID, dispatch);
  };

  useEffect(() => {
    if (username) {
      updateUsername(username);
    }

    if (userId) {
      updateUserId(userId);
    }
  }, [username, updateUsername, userId, updateUserId]);

  if (
    readingListBooksFetchingStatus === "loading" ||
    userIdFetchingStatus === "loading"
  ) {
    return <LoadingIndicator isFullHeightOfSite />;
  }

  if (
    readingListBooksFetchingStatus === "error" ||
    userIdFetchingStatus === "error"
  ) {
    return (
      <div className={styles.userReadingList}>
        <p>Something went wrong. Please try again.</p>
      </div>
    );
  }

  const hasBooks =
    (user?.readingListBooks && user.readingListBooks.length > 0) ||
    (readingListBooks && readingListBooks.length > 0);

  return (
    <div className={styles.userReadingList}>
      <UserReadingListHeader username={username} />
      {!hasBooks ? (
        <p>
          {isOwner ? "You" : "This user"} don't have any books in reading list
        </p>
      ) : (
        <BookList
          books={user?.readingListBooks ?? readingListBooks}
          customClassName={styles.booksContainer}
          isAllowedToDelete={isOwner}
          onDeleteBook={handleDeleteBookFromReadingList}
        />
      )}
    </div>
  );
};

export default UserReadingListView;
