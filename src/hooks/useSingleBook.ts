import { useEffect, useState } from "react";
import { getBookByIdFromFirestore } from "../firebase/services/firestore";
import { Book } from "../types/Book";

export const useSingleBook = (bookId?: string) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (!bookId) {
          throw new Error("No book id provided");
        }

        const fetchedBook: Book | null = await getBookByIdFromFirestore(bookId);

        if (!fetchedBook) {
          throw new Error("Book not found!");
        } else {
          setBook(fetchedBook);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching book data");
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  return { book, loading };
};
