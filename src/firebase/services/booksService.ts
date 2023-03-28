import { db } from "../config";
import { DocumentData, collection, getDocs } from "firebase/firestore";

export async function fetchBooks(): Promise<DocumentData[]> {
  const booksCollection = collection(db, "books");
  const bookSnapshot = await getDocs(booksCollection);
  const bookList = bookSnapshot.docs.map((doc) => doc.data());
  return bookList;
}
