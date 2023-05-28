import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { useSingleBook } from "./useSingleBook";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/config";

interface Props {
  bookId?: string;
}

/**
 * Optimized version of useSingleBook hook. First, it checks if the book is already in the Redux store.
 * If not, it fetches the book from Firestore and stores it in the Redux store.
 * Then it fetches the image URL from Firebase storage and returns it.
 * @param id id of the book
 * @returns {Object} book, imageUrl, isLoading
 */
const useBookWithImage = ({ bookId }: Props) => {
  const books = useAppSelector((state) => state.books.books);
  const [book, setBook] = useState(books.find((b) => b.id === bookId));
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { book: bookFromHook } = useSingleBook(bookId);

  useEffect(() => {
    const fetchImage = async () => {
      // Return early if the required data is missing
      if (!bookId || book) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      // Update the book if it's not already set
      if (!book && bookFromHook) {
        setBook(bookFromHook);
      }

      // Fetch the image URL if the book has an imageId and no imageUrl
      if (bookFromHook && bookFromHook.imageId && !bookFromHook?.imageUrl) {
        try {
          const imageRef = ref(storage, `images/${bookFromHook.imageId}`);
          const fetchedImageUrl = await getDownloadURL(imageRef);
          fetchedImageUrl && setImageUrl(fetchedImageUrl);
        } catch (error) {
          console.error("Failed to fetch image URL:", error);
        }
      }

      setIsLoading(false);
    };

    fetchImage();
  }, [book, bookFromHook, bookId]);

  return { book, imageUrl, isLoading };
};

export default useBookWithImage;
