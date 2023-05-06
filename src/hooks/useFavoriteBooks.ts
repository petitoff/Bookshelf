import { useCallback, useEffect, useState } from "react";
import { Book } from "../types/Book";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAppDispatch } from "./hooks";
import { updateUser } from "../store/slices/authSlice";
import { getBookFromFirestore } from "../firebase/services/firestore";

const useFavoriteBooks = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [fetchingStatus, setFetchingStatus] = useState<
    "idle" | "loading" | "error"
  >("idle");

  const dispatch = useAppDispatch();

  const updateUserId = useCallback((newUserId: string) => {
    setUserId(newUserId);
  }, []);

  useEffect(() => {
    const fetchFavoriteBooks = async () => {
      setFetchingStatus("loading");

      try {
        if (!userId) throw new Error("User id is not defined");

        const usernamesDocRef = doc(db, "usernames", userId);
        const usernamesDocSnap = await getDoc(usernamesDocRef);

        if (!usernamesDocSnap.exists()) throw new Error("User does not exist");

        const userDocData = usernamesDocSnap.data();

        if (!userDocData) throw new Error("User data is undefined");
        // setFavoriteBooks(userDocData.favoriteBooks || []);
        // dispatch(updateUser({ favoriteBooks: userDocData.favoriteBooks }));

        const favoriteBooksId = userDocData.favoriteBooksId || [];
        const booksPromises: Book[] = favoriteBooksId.map((bookId: string) =>
          getBookFromFirestore(bookId)
        );

        const fetchedBooks = await Promise.all(booksPromises);

        setFavoriteBooks(fetchedBooks);
        dispatch(updateUser({ favoriteBooks: fetchedBooks }));

        setFetchingStatus("idle");
      } catch (error) {
        setFetchingStatus("error");
        console.log(error);
      }
    };

    if (userId) {
      fetchFavoriteBooks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return { favoriteBooks, fetchingStatus, updateUserId };
};

export default useFavoriteBooks;
