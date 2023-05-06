import { useParams } from "react-router-dom";
import useFavoriteBooks from "../hooks/useFavoriteBooks";
import useUserIdFromUsername from "../hooks/useUserIdFromUsername";
import { useEffect } from "react";
import LoadingIndicator from "../components/common/LoadingIndicator/LoadingIndicator";
import BookCard from "../components/common/BookCard/BookCard";
import styles from "./Pages.module.scss";

const UserReadingList = () => {
  const { username } = useParams<{ username: string }>();
  const {
    favoriteBooks,
    fetchingStatus: favoriteBooksFetchingStatus,
    updateUserId,
  } = useFavoriteBooks();
  const {
    userId,
    fetchingStatus: userIdFetchingStatus,
    updateUsername,
  } = useUserIdFromUsername();

  useEffect(() => {
    if (username) {
      updateUsername(username);
    }
  }, [username, updateUsername]);

  useEffect(() => {
    if (userId) {
      updateUserId(userId);
    }
  }, [userId, updateUserId]);

  if (
    favoriteBooksFetchingStatus === "loading" ||
    userIdFetchingStatus === "loading"
  ) {
    return <LoadingIndicator />;
  }

  return (
    <div className={styles.userReadingList}>
      <h1>
        <span className={styles.usernameHightlight}>@{username}</span> reading
        list
      </h1>
      <div>
        {favoriteBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default UserReadingList;
