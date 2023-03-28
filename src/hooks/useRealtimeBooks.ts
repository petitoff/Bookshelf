import { db } from "../firebase/config";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

export function useRealtimeBooks() {
  const [books, setBooks] = useState<DocumentData>([]);

  useEffect(() => {
    const booksCollection = collection(db, "books");
    const unsubscribe = onSnapshot(booksCollection, (snapshot) => {
      const bookList = snapshot.docs.map((doc) => {
        const bookData = doc.data();
        return { id: doc.id, ...bookData };
      });
      setBooks(bookList);
    });
    return () => unsubscribe();
  }, []);

  return { books };
}
