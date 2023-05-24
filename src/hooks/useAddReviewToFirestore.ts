import { useState } from "react";
import { Review } from "../types/Book";
import { db } from "../firebase/config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useAppSelector } from "./hooks";
import { toast } from "react-toastify";
import { successToast } from "../utils/toastHelper";

const useAddReviewToFirestore = (bookId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const user = useAppSelector((state) => state.auth.user);

  const addReview = async (review: Partial<Review>) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!user?.UID) throw new Error("User not found");

      if (review.rating === 0 || review.content === undefined)
        throw new Error("Review is not valid");

      review.UID = user?.UID;
      review.username = user?.username;

      const bookRef = doc(db, "books", bookId);
      await updateDoc(bookRef, {
        reviews: arrayUnion(review),
      });

      successToast("Review added successfully");
    } catch (error: any) {
      setError(error);

      if (error.message === "User not found")
        toast.error("You must be logged in to add a review");

      if (error.message === "Review is not valid")
        toast.error("Review is not valid");
    } finally {
      setIsLoading(false);
    }
  };

  return { addReview, isLoading, error };
};

export default useAddReviewToFirestore;
