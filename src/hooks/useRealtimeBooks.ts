import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Book } from "../types/Book";

export function useRealtimeBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const booksCollection = collection(db, "books");
    const unsubscribe = onSnapshot(booksCollection, (snapshot) => {
      const bookList = snapshot.docs.map((doc) => {
        const bookData = doc.data();
        return { id: doc.id, title: bookData.title };
      });
      setBooks(bookList);
    });
    return () => unsubscribe();
  }, []);

  return { books };
}
