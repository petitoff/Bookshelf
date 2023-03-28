import { db } from "../config";
import { DocumentData, addDoc, collection, getDocs } from "firebase/firestore";

export async function fetchBooks(): Promise<DocumentData[]> {
  const booksCollection = collection(db, "books");
  const bookSnapshot = await getDocs(booksCollection);
  const bookList = bookSnapshot.docs.map((doc) => doc.data());
  return bookList;
}

export async function addNewBook(bookData: { title: string }) {
  const booksCollection = collection(db, "books");
  const newBookRef = await addDoc(booksCollection, {
    ...bookData,
  });
  return newBookRef.id;
}
