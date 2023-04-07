import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Book } from "../types/Book";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchBooksStart, fetchBooksSuccess } from "../store/slices/bookSlice";

export function useBooks() {
  const [books, setBooks] = useState<any>([]);
  const uid = useAppSelector((state) => state.auth.user?.UID);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!uid) return;

    dispatch(fetchBooksStart());

    const booksCollection = query(
      collection(db, "books"),
      where("authorUid", "==", uid)
    );

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
  }, [uid]);

  return { books };
}
