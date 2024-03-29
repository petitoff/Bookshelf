import { useParams } from "react-router-dom";
import useUserIdFromUsername from "../hooks/firebaseHooks/useUserIdFromUsername";
import { useEffect, useState } from "react";
import LoadingIndicator from "../components/common/LoadingIndicator/LoadingIndicator";
import styles from "./Pages.module.scss";
import UserReadingListHeader from "../components/common/UserReadingListHeader/UserReadingListHeader";
import BookList from "../components/BookList/BookList";
import { useAppSelector } from "../hooks/hooks";
import useReadingListBooks from "../hooks/dataHooks/booksHooks/useReadingListBooks";
import { useDeleteBookFromReadingList } from "../hooks/dataHooks/booksHooks/useDeleteBookFromReadingList";

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

  const { deleteBookFromReadingList } = useDeleteBookFromReadingList(userId);

  const [hasBooks, setHasBooks] = useState(false);

  const handleDeleteBookFromReadingList = async (bookId?: string) => {
    deleteBookFromReadingList(bookId);
  };

  useEffect(() => {
    if (username) {
      updateUsername(username);
    }

    if (userId) {
      updateUserId(userId);
    }
  }, [username, updateUsername, userId, updateUserId]);

  useEffect(() => {
    if (user?.readingListBooks) {
      setHasBooks(user?.readingListBooks?.length > 0);
    }
  }, [user?.readingListBooks]);

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

  return (
    <div className={styles.userReadingList}>
      <UserReadingListHeader username={username} />
      {!hasBooks ? (
        <p>
          {isOwner ? "You" : "This user"} don't have any books in their reading
          list
        </p>
      ) : (
        <BookList
          books={readingListBooks}
          customClassName={styles.booksContainer}
          isAllowedToDelete={isOwner}
          onDeleteBook={handleDeleteBookFromReadingList}
        />
      )}
    </div>
  );
};

export default UserReadingListView;
