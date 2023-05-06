import { useParams } from "react-router-dom";
import useFavoriteBooks from "../hooks/useFavoriteBooks";
import useUserIdFromUsername from "../hooks/useUserIdFromUsername";
import { useEffect } from "react";

const UserReadingList = () => {
  const { username } = useParams<{ username: string }>();
  const { favoriteBooks, updateUserId } = useFavoriteBooks();
  const { userId, updateUsername } = useUserIdFromUsername();

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

  console.log("favoriteBooks", favoriteBooks);

  return (
    <div>
      <h1>UserReadingList</h1>
      <p>username: {username}</p>
      <p>userId: {userId}</p>
      <p>favoriteBooks: {}</p>
    </div>
  );
};

export default UserReadingList;
