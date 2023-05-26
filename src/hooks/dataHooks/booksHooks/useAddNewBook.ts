import { useState } from "react";
import { addBook } from "../../../firebase/services/firestore";
import { useAppSelector } from "../../hooks";

interface Props {
  addNewBookToFirestore: (bookData: string) => Promise<void>;
  isLoading: boolean;
  error: Error | any;
}

function useAddNewBook(): Props {
  const user = useAppSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | any>(null);

  async function addNewBookToFirestore(bookData: string): Promise<void> {
    if (!user) throw new Error("User is not logged in.");

    try {
      setIsLoading(true);
      await addBook({
        title: bookData,
        authorUid: user.UID,
      });
    } catch (err: Error | any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return { addNewBookToFirestore, isLoading, error };
}

export default useAddNewBook;
