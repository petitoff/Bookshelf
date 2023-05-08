import { useCallback, useEffect, useState } from "react";
import { Book } from "../types/Book";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAppDispatch } from "./hooks";
import { updateUser } from "../store/slices/authSlice";
import { getBookByIdFromFirestore } from "../firebase/services/firestore";

const useReadingListBooks = () => {
  const [readingListBooks, setReadingListBooks] = useState<Book[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [fetchingStatus, setFetchingStatus] = useState<
    "idle" | "loading" | "error"
  >("idle");

  const dispatch = useAppDispatch();

  const updateUserId = useCallback((newUserId: string) => {
    setUserId(newUserId);
  }, []);

  useEffect(() => {
    const fetchReadingListBooks = async () => {
      setFetchingStatus("loading");

      try {
        if (!userId) throw new Error("User id is not defined");

        const usernamesDocRef = doc(db, "usernames", userId);
        const usernamesDocSnap = await getDoc(usernamesDocRef);

        if (!usernamesDocSnap.exists()) throw new Error("User does not exist");

        const userDocData = usernamesDocSnap.data();

        if (!userDocData) throw new Error("User data is undefined");

        const readingListBooksId = userDocData.readingListBooksId || [];
        const booksPromises: Book[] = readingListBooksId.map((bookId: string) =>
          getBookByIdFromFirestore(bookId)
        );

        const fetchedBooks = await Promise.all(booksPromises);

        setReadingListBooks(fetchedBooks);
        dispatch(updateUser({ readingListBooks: fetchedBooks }));

        setFetchingStatus("idle");
      } catch (error) {
        setFetchingStatus("error");
        console.log(error);
      }
    };

    if (userId) {
      fetchReadingListBooks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return { readingListBooks, fetchingStatus, updateUserId };
};

export default useReadingListBooks;
