import { useParams } from "react-router-dom";
import useUserIdFromUsername from "../hooks/useUserIdFromUsername";
import { useEffect } from "react";
import LoadingIndicator from "../components/common/LoadingIndicator/LoadingIndicator";
import styles from "./Pages.module.scss";
import UserReadingListHeader from "../components/common/UserReadingListHeader/UserReadingListHeader";
import BookList from "../components/common/BookList/BookList";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { removeReadingListBookId } from "../firebase/services/firestore";
import useReadingListBooks from "../hooks/useReadingListBooks";
import { removeBookFromReadingListById } from "../store/slices/authSlice";

const UserReadingListView = () => {
  const { username } = useParams<{ username: string }>();
  const user = useAppSelector((state) => state.auth.user);
  const { fetchingStatus: readingListBooksFetchingStatus, updateUserId } =
    useReadingListBooks();

  const {
    userId,
    fetchingStatus: userIdFetchingStatus,
    updateUsername,
  } = useUserIdFromUsername();
  const isOwner = user?.name === username;

  const dispatch = useAppDispatch();

  const handleDeleteBookFromReadingList = async (id: string) => {
    if (!user?.UID) return;

    const response = await removeReadingListBookId(user?.UID, id);
    if (response.status !== "success") return;

    dispatch(removeBookFromReadingListById(id));
  };

  useEffect(() => {
    if (username) {
      updateUsername(username);
    }
  }, [username, updateUsername]);

  useEffect(() => {
    if (userId) {
      updateUserId(userId);
    }
  }, [updateUserId, userId]);

  if (
    readingListBooksFetchingStatus === "loading" ||
    userIdFetchingStatus === "loading"
  ) {
    return <LoadingIndicator />;
  }

  if (
    readingListBooksFetchingStatus === "error" ||
    userIdFetchingStatus === "error"
  ) {
    return <p>Something went wrong. Please try again.</p>;
  }

  const hasBooks =
    user && user.readingListBooks && user.readingListBooks.length > 0;

  return (
    <div className={styles.userReadingList}>
      <UserReadingListHeader username={username} />
      {!hasBooks ? (
        <p>
          {isOwner ? "You" : "This user"} don't have any books in reading list
        </p>
      ) : (
        <BookList
          books={user?.readingListBooks ?? []}
          customClassName={styles.booksContainer}
          isAllowedToDelete={isOwner}
          onDeleteBook={handleDeleteBookFromReadingList}
        />
      )}
    </div>
  );
};

export default UserReadingListView;
