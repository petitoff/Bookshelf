import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Timestamp } from "firebase/firestore";
import { storage } from "../../firebase/config";
import useAddNewBook from "../dataHooks/booksHooks/useAddNewBook";
import { Book, BookCategory, CATEGORIES, Review } from "../../types/Book";
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
  const [category, setCategory] = useState<BookCategory>(BookCategory.All);
  const [isLoading, setIsLoading] = useState(false);

  const { addNewBook } = useAddNewBook();

  const generateUniqueFileName = (originalFileName: string) => {
    const fileExtension = originalFileName.split(".").pop();
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 10);
    return `photo_${timestamp}_${randomId}.${fileExtension}`;
  };

  const isCategoryValid = (category: string): category is BookCategory => {
    return CATEGORIES.includes(category as BookCategory);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAdmin) {
      toast.error("You don't have permission to add new book");
      return;
    }

    if (title && authorName && coverImage && isCategoryValid(category)) {
      setIsLoading(true);

      // Upload image to Storage
      let imageUrl = "";
      let imageId = "";
      try {
        const uniqueFileName = generateUniqueFileName(coverImage.name);
        const coverImageRef = ref(storage, `coverImages/${uniqueFileName}`);
        await uploadBytes(coverImageRef, coverImage);
        imageUrl = await getDownloadURL(coverImageRef);
        imageId = coverImageRef.name;
      } catch (err: any) {
        toast.error(err.message);
        setIsLoading(false);
        return;
      }

      let pageNumber = Number(pages);
      // Check for an error and set a default value
      if (isNaN(pageNumber)) {
        pageNumber = 1;
      }

      // Add book to Firestore
      const bookData: Book = {
        title,
        authorName,
        summary,
        pages: pageNumber,
        reviews,
        category, // Added category to Book data
        imageId,
        imageUrl,
        addedBy: userId,
        createdAt: Timestamp.now(),
      };

      addNewBook(bookData);

      // Reset form state
      setTitle("");
      setAuthorName("");
      setSummary("");
      setPages("");
      setReviews([]);
      setCoverImage(null);
      setCategory(BookCategory.All);
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
    category,
    setCategory,
  };
};
export default useBookForm;
