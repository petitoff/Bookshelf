import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { storage, db } from "../../firebase/config";

interface Props {
  isAdmin: boolean;
  userId: string;
}

const useBookForm = ({ isAdmin, userId }: Props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAdmin && title && author && coverImage) {
      setIsLoading(true);

      // Przesyłanie zdjęcia do Storage
      const coverImageRef = ref(storage, `coverImages/${coverImage.name}`);
      await uploadBytes(coverImageRef, coverImage);
      const coverImageUrl = await getDownloadURL(coverImageRef);

      // Dodawanie książki do Firestore
      const bookData = {
        title,
        author,
        coverImageUrl,
        addedBy: userId,
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "books"), bookData);

      // Resetowanie stanu formularza
      setTitle("");
      setAuthor("");
      setCoverImage(null);
      setIsLoading(false);
    }
  };

  return {
    title,
    setTitle,
    author,
    setAuthor,
    coverImage,
    setCoverImage,
    isLoading,
    handleSubmit,
  };
};
export default useBookForm;
