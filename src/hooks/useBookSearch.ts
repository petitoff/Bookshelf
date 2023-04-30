import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Book } from "../types/Book";
import { useAppDispatch } from "./hooks";
import { setBooksSearch } from "../store/slices/bookSlice";

const useBookSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchBooks() {
      if (!searchTerm) {
        setSearchResults([]);
        dispatch(setBooksSearch(null));
        return;
      }

      setIsLoading(true);

      try {
        const q = query(
          collection(db, "books"),
          where("title", ">=", searchTerm),
          where("title", "<=", searchTerm + "\uf8ff")
        );

        const querySnapshot = await getDocs(q);

        const results: Book[] = [];
        querySnapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });

        dispatch(setBooksSearch(results));
        setSearchResults(results);
        setError(null);
      } catch (error: any) {
        setSearchResults([]);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return { searchTerm, setSearchTerm, searchResults, isLoading, error };
};

export default useBookSearch;
