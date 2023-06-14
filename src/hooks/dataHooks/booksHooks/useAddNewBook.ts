import { useState } from "react";
import { addBook } from "../../../firebase/services/firestore";
import { useAppSelector } from "../../hooks";
import { successToast } from "../../../utils/toastHelper";
import { toast } from "react-toastify";
import { Book } from "../../../types/Book";

interface Props {
  addNewBook: (bookData: Book) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

function useAddNewBook(): Props {
  const user = useAppSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function addNewBookToFirestore(bookData: Book) {
    if (!user) {
      const errorMessage = "User is not logged in.";
      setError(new Error(errorMessage));
      toast.error(errorMessage);
      return;
    }

    try {
      setIsLoading(true);
      await addBook(bookData);

      successToast("Book added successfully.");
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
        toast.error(err.message);
      } else {
        const errorMessage = "An unknown error occurred.";
        setError(new Error(errorMessage));
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { addNewBook: addNewBookToFirestore, isLoading, error };
}

export default useAddNewBook;
