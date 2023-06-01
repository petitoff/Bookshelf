import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Timestamp } from "firebase/firestore";
import { storage } from "../../firebase/config";
import useAddNewBook from "../dataHooks/booksHooks/useAddNewBook";
import { Book, Review } from "../../types/Book";
import { toast } from "react-toastify";

interface Props {
  isAdmin: boolean;
  userId: string;
}

const useBookForm = ({ isAdmin, userId }: Props) => {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [summary, setSummary] = useState("");
  const [pages, setPages] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { addNewBook } = useAddNewBook();

  const generateUniqueFileName = (originalFileName: string) => {
    const fileExtension = originalFileName.split(".").pop();
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 10);
    return `photo_${timestamp}_${randomId}.${fileExtension}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAdmin) {
      toast.error("You don't have permission to add new book");
      return;
    }

    if (title && authorName && coverImage) {
      setIsLoading(true);

      // Przesyłanie zdjęcia do Storage
      const uniqueFileName = generateUniqueFileName(coverImage.name);
      const coverImageRef = ref(storage, `coverImages/${uniqueFileName}`);
      await uploadBytes(coverImageRef, coverImage);
      const imageUrl = await getDownloadURL(coverImageRef);
      const imageId = coverImageRef.name;

      let pageNumber = Number(pages);
      // Check for an error and set a default value
      if (isNaN(pageNumber)) {
        pageNumber = 1;
      }

      // Dodawanie książki do Firestore
      const bookData: Book = {
        title,
        authorName,
        summary,
        pages: pageNumber,
        reviews,
        imageId,
        imageUrl,
        addedBy: userId,
        createdAt: Timestamp.now(),
      };

      addNewBook(bookData);

      // Resetowanie stanu formularza
      setTitle("");
      setAuthorName("");
      setSummary("");
      setPages("");
      setReviews([]);
      setCoverImage(null);
      setIsLoading(false);
    }
  };

  return {
    title,
    setTitle,
    authorName,
    setAuthorName,
    summary,
    setSummary,
    pages,
    setPages,
    reviews,
    setReviews,
    coverImage,
    setCoverImage,
    isLoading,
    handleSubmit,
  };
};
export default useBookForm;
