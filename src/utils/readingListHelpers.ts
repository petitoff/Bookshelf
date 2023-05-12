// utils/readingListHelpers.ts

import { removeReadingListBookId } from "../firebase/services/firestore";
import { removeBookFromReadingListById } from "../store/slices/authSlice";
import { AppDispatch } from "../store/store";

export const deleteBookFromReadingList = async (
  bookId: string | undefined,
  userId: string | undefined,
  dispatch: AppDispatch
) => {
  if (!bookId || !userId) return;

  const response = await removeReadingListBookId(userId, bookId);
  if (response.status !== "success") return;

  dispatch(removeBookFromReadingListById(bookId));
};
