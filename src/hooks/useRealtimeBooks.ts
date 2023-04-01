import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Book } from "../types/Book";
import { useAppSelector } from "./hooks";

export function useRealtimeBooks() {
  const [books, setBooks] = useState<any>([]);
  const uid = useAppSelector((state) => state.auth.user?.id);

  useEffect(() => {
    const booksCollection = query(
      collection(db, "books"),
      where("authorUid", "==", uid)
    );

    const unsubscribe = onSnapshot(booksCollection, (snapshot) => {
      const bookList = snapshot.docs.map((doc) => {
        const bookData = doc.data();
        return { id: doc.id, title: bookData.title };
      });
      setBooks(bookList);
    });
    return () => unsubscribe();
  }, [uid]);

  return { books };
}
