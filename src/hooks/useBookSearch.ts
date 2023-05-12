import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Book } from "../types/Book";
import { useAppDispatch } from "./hooks";
import { setBooksSearch } from "../store/slices/bookSlice";
import useDebounce from "./useDebounce";

interface UseBookSearchResult {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchResults: Book[];
  isLoading: boolean;
  error: any;
}

const useBookSearch = (): UseBookSearchResult => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Adjust the delay as needed
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchBooks = async () => {
      if (!debouncedSearchTerm) {
        setSearchResults([]);
        dispatch(setBooksSearch(null));
        return;
      }

      setIsLoading(true);

      try {
        const q = query(
          collection(db, "books"),
          where("title", ">=", debouncedSearchTerm),
          where("title", "<=", debouncedSearchTerm + "\uf8ff")
        );

        const querySnapshot = await getDocs(q);

        const results: Book[] = [];
        querySnapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });

        dispatch(setBooksSearch(results));
        setSearchResults(results);
        setError(null);
      } catch (err) {
        setSearchResults([]);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return { searchTerm, setSearchTerm, searchResults, isLoading, error };
};

export default useBookSearch;
