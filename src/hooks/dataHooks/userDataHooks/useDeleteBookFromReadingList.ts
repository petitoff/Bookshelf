import { useCallback } from "react";
import { removeReadingListBookId } from "../../../firebase/services/firestore";
import { removeBookFromReadingListById } from "../../../store/slices/authSlice";
import { useAppDispatch } from "../../hooks";

export const useDeleteBookFromReadingList = (userId: string | null) => {
  const dispatch = useAppDispatch();

  const deleteBookFromReadingList = useCallback(
    async (bookId: string | undefined) => {
      if (!bookId || !userId) return;

      const response = await removeReadingListBookId(userId, bookId);
      if (response.status !== "success") return;

      dispatch(removeBookFromReadingListById(bookId));
    },
    [userId, dispatch]
  );

  return { deleteBookFromReadingList };
};
