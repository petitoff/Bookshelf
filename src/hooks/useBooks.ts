import { db } from "../firebase/config";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setBooks } from "../store/slices/bookSlice";

export function useBooks() {
  const user = useAppSelector((state) => state.auth.user);
  const [fetchingStatus, setFetchingStatus] = useState<
    "idle" | "loading" | "succeeded" | "failed"
  >("idle");
  const dispatch = useAppDispatch();

  useEffect(() => {
    let unsubscribe: () => void;

    const fetchBooks = async () => {
      setFetchingStatus("loading");
      const booksCollection = query(collection(db, "books"));
      unsubscribe = onSnapshot(booksCollection, (snapshot) => {
        const bookList = snapshot.docs.map((doc) => {
          const bookData = doc.data();
          const book: Book = {
            id: doc.id,
            ...bookData,
          };

          return book;
        });

        dispatch(setBooks(bookList));
        setFetchingStatus("succeeded");
      });
    };

    fetchBooks();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.UID]);

  return { fetchingStatus };
}
