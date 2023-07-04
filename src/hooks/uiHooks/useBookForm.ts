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
  const [formState, setFormState] = useState({
    title: "",
    authorName: "",
    summary: "",
    pages: "",
    reviews: [] as Review[],
    coverImage: null as File | null,
    category: BookCategory.All,
  });
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

  const handleChange =
    (field: keyof typeof formState) => (value: string | File | null) => {
      setFormState((prevState) => ({ ...prevState, [field]: value }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAdmin) {
      toast.error("You don't have permission to add new book");
      return;
    }

    const { title, authorName, coverImage, category } = formState;

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

      let pageNumber = Number(formState.pages);
      // Check for an error and set a default value
      if (isNaN(pageNumber)) {
        pageNumber = 1;
      }

      // Add book to Firestore
      const bookData: Book = {
        title: formState.title,
        authorName: formState.authorName,
        summary: formState.summary,
        pages: pageNumber,
        reviews: formState.reviews,
        category: formState.category,
        imageId,
        imageUrl,
        addedBy: userId,
        createdAt: Timestamp.now(),
      };

      addNewBook(bookData);

      // Reset form state
      setFormState({
        title: "",
        authorName: "",
        summary: "",
        pages: "",
        reviews: [],
        coverImage: null,
        category: BookCategory.All,
      });
      setIsLoading(false);
    }
  };

  return {
    ...formState,
    isLoading,
    handleChange,
    handleSubmit,
  };
};
export default useBookForm;
