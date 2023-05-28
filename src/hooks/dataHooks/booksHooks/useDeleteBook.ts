import { useState } from "react";
import { db } from "../../../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const useDeleteBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteBook = async (bookId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Delete the book from Firestore
      const bookRef = doc(db, "books", bookId);
      await deleteDoc(bookRef);
    } catch (error: Error | any) {
      setError(error);
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteBook, isLoading, error };
};

export default useDeleteBook;
