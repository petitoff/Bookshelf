import { db } from "../firebase/config";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setBooks } from "../store/slices/bookSlice";
import useFirebaseImage from "./useFirebaseImage";

export function useBooks() {
  const user = useAppSelector((state) => state.auth.user);
  const [fetchingStatus, setFetchingStatus] = useState<
    "idle" | "loading" | "succeeded" | "failed"
  >("idle");
  const dispatch = useAppDispatch();
  const { getImageUrl } = useFirebaseImage();

  useEffect(() => {
    const fetchBooks = async () => {
      setFetchingStatus("loading");
      const booksCollection = query(collection(db, "books"));
      const unsubscribe = onSnapshot(booksCollection, async (snapshot) => {
        const bookListPromises = snapshot.docs.map(async (doc) => {
          const bookData = doc.data();
          const imageUrl = await getImageUrl(bookData.imageId);

          const book: Book = {
            id: doc.id,
            imageUrl,
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.UID]);

  return { fetchingStatus };
}
