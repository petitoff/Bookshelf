import { useAppDispatch, useAppSelector } from "../../hooks";
import { User } from "../../../types/User";
import {
  updateUserEmailInAuth,
  updateUserInFirestore,
  updateUsernamesInFirestore,
} from "../../../firebase/services/firestore";
import { updateUser } from "../../../store/slices/authSlice";
import { successToast } from "../../../utils/toastHelper";
import { useState } from "react";

const useUpdateUser = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [error, setError] = useState<"idle" | "error" | "success">("idle");
  const dispatch = useAppDispatch();

  const updateUserPartial = async (data: Partial<User>): Promise<void> => {
    try {
      setError("idle");
      if (!user || !data) return;
      if (
        data?.username &&
        data?.username !== user.username &&
        data?.username.length > 0
      ) {
        await updateUsernamesInFirestore(user.UID, {
          username: data.username.toLowerCase(),
        });
      }

      if (data?.email) {
        await updateUserEmailInAuth(data?.email);
        await updateUserInFirestore(user.UID, { email: data.email });
      }

      if (data?.favouriteCategories) {
        await updateUsernamesInFirestore(user.UID, {
          favouriteCategories: data.favouriteCategories,
        });
      }

      if (data?.isRegistrationComplete) {
        await updateUsernamesInFirestore(user.UID, {
          isRegistrationComplete: data.isRegistrationComplete,
        });
      }

      dispatch(updateUser(data));
      successToast("Success user update");
      setError("success");
    } catch (error: Error | any) {
      // throw new Error("Error updating user")
      setError("error");
    }
  };

  return { updateUserPartial, error };
};

export default useUpdateUser;
