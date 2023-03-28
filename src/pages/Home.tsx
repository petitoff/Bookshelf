import { useEffect, useState } from "react";
import BookList from "../components/BookList";
import BookForm from "../components/BookForm";

import { fetchBooks } from "../firebase/services/booksService";
import { DocumentData } from "firebase/firestore";

export default function Home() {
  const [books, setBooks] = useState<DocumentData>([]);

  useEffect(() => {
    fetchBooks().then((books: DocumentData[]) => setBooks(books));
  }, []);

  console.log(books);
  return (
    <div className="App">
      {books && <BookList books={books} />}
      <BookForm />
    </div>
  );
}
