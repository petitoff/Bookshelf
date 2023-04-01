import { useState } from "react";
import { addNewBook } from "../firebase/services/booksService";
import { useAppSelector } from "./hooks";

export function useAddNewBook() {
  const user = useAppSelector((state) => state.auth.user);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | any>(null);

  async function addBook(bookData: string): Promise<void> {
    setIsLoading(true);
    setError(null);

    if (!user) throw new Error("User is not logged in.");

    try {
      const newBookId = await addNewBook({
        title: bookData,
        authorUid: user.id,
      });
      console.log(`New book added with ID ${newBookId}`);
    } catch (err: Error | any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return { addBook, isLoading, error };
}
