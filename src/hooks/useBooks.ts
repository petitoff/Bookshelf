import { db } from "../firebase/config";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Book } from "../types/Book";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchBooksStart, fetchBooksSuccess } from "../store/slices/bookSlice";

export function useBooks() {
  const [books, setBooks] = useState<any>([]);
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user?.UID) return;

    dispatch(fetchBooksStart());

    const booksCollection = query(collection(db, "books"));

    const unsubscribe = onSnapshot(booksCollection, (snapshot) => {
      const bookList = snapshot.docs.map((doc) => {
        const bookData = doc.data();
        const book: Book = {
          id: doc.id,
          ...bookData,
        };

        return book;
      });
      setBooks(bookList);
      dispatch(fetchBooksSuccess(bookList));
    });
    return () => unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.UID]);

  return { books };
}
