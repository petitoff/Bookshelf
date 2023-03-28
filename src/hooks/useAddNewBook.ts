import { useState } from "react";
import { addNewBook } from "../firebase/services/booksService";

export function useAddNewBook() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function addBook(bookData: string) {
    setIsLoading(true);
    setError(null);

    try {
      const newBookId = await addNewBook({ title: bookData });
      console.log(`New book added with ID ${newBookId}`);
    } catch (err: Error | any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return [addBook, isLoading, error];
}
