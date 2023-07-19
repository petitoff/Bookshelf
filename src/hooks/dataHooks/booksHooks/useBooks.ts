import { db } from "../../../firebase/config";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Book } from "../../../types/Book";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setBooks } from "../../../store/slices/bookSlice";

export const useBooks = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [fetchingStatus, setFetchingStatus] = useState<
    "idle" | "loading" | "succeeded" | "failed"
  >("idle");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchBooks = async () => {
      setFetchingStatus("loading");
      const booksCollection = query(collection(db, "books"));
      const unsubscribe = onSnapshot(booksCollection, async (snapshot) => {
        const bookListPromises = snapshot.docs.map(async (doc) => {
          const bookData: Book = doc.data();

          // const createdAt =
          //   bookData?.createdAt === undefined
          //     ? undefined
          //     : (bookData.createdAt as Timestamp).toDate();

          const book: Book = {
            id: doc.id,
            // createdAt,
            ...bookData,
          };

          return book;
        });

        const bookList = await Promise.all(bookListPromises);

        dispatch(setBooks(bookList));
        setFetchingStatus("succeeded");
      });

      return () => {
        unsubscribe();
      };
    };

    fetchBooks();
  }, [dispatch, user]);

  return { fetchingStatus };
};
