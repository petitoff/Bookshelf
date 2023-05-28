import { useCallback, useEffect, useState } from "react";
import { Book } from "../../../types/Book";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAppDispatch } from "../../hooks";
import { updateUser } from "../../../store/slices/authSlice";
import { getBookByIdFromFirestore } from "../../../firebase/services/firestore";

type FetchingStatus = "idle" | "loading" | "error";

const useFavoriteBooks = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [fetchingStatus, setFetchingStatus] = useState<FetchingStatus>("idle");

  const dispatch = useAppDispatch();

  const updateUserId = useCallback((newUserId: string) => {
    setUserId(newUserId);
  }, []);

  const fetchFavoriteBooks = useCallback(async () => {
    setFetchingStatus("loading");

    try {
      if (!userId) throw new Error("User id is not defined");

      const usernamesDocRef = doc(db, "usernames", userId);
      const usernamesDocSnap = await getDoc(usernamesDocRef);

      if (!usernamesDocSnap.exists()) throw new Error("User does not exist");

      const userDocData = usernamesDocSnap.data();

      if (!userDocData) throw new Error("User data is undefined");

      const favoriteBooksId = userDocData.favoriteBooksId || [];
      const booksPromises: Promise<Book>[] = favoriteBooksId.map(
        (bookId: string) => getBookByIdFromFirestore(bookId)
      );

      const fetchedBooks = await Promise.all(booksPromises);

      setFavoriteBooks(fetchedBooks);
      dispatch(updateUser({ favoriteBooks: fetchedBooks }));

      setFetchingStatus("idle");
    } catch (error) {
      setFetchingStatus("error");
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId) {
      fetchFavoriteBooks();
    }
  }, [fetchFavoriteBooks, userId]);

  return { favoriteBooks, fetchingStatus, updateUserId };
};

export default useFavoriteBooks;
