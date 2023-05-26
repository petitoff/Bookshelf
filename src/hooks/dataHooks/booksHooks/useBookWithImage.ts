import { useEffect, useState } from "react";
import useFirebaseImage from "../../firebaseHooks/useFirebaseImage";
import { useAppSelector } from "../../hooks";
import { useSingleBook } from "./useSingleBook";

interface Props {
  bookId?: string;
}

/**
 * Optimized version of useSingleBook hook. First it checks if the book is already in the redux store.
 * If not, it fetches the book from firestore and stores it in the redux store.
 * Then it fetches the image url from firebase storage and returns it.
 * @param id id of the book
 * @returns
 */
const useBookWithImage = ({ bookId }: Props) => {
  const books = useAppSelector((state) => state.books.books);
  const [book, setBook] = useState(books.find((b) => b.id === bookId));
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);

  const { book: bookFromHook } = useSingleBook(bookId);
  const { getImageUrl } = useFirebaseImage();

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);

      if (!bookId) {
        setIsLoading(false);
        return;
      }

      if (book && book.imageId) {
        setIsLoading(false);
        return;
      }

      if (bookFromHook && bookFromHook.imageId) {
        const fetchedImageUrl = await getImageUrl(bookFromHook.imageId);
        fetchedImageUrl && setImageUrl(fetchedImageUrl);
        setIsLoading(false);
        bookFromHook && setBook(bookFromHook);
        return;
      }
    };

    fetchImage();
  }, [book, bookFromHook, getImageUrl, bookId]);

  return { book, imageUrl, isLoading };
};

export default useBookWithImage;
