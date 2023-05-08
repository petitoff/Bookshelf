import { useAppDispatch, useAppSelector } from "./hooks";
import { User } from "../types/User";
import {
  updateUserEmailInAuth,
  updateUserInFirestore,
  updateUsernamesInFirestore,
} from "../firebase/services/firestore";
import { updateUser } from "../store/slices/authSlice";
import { successToast } from "../utils/toastHelper";

const useUpdateUser = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const updateUserPartial = async (data: Partial<User>): Promise<void> => {
    try {
      if (!user || !data) return;
      console.log(data);

      if (data?.username) {
        console.log(user);
        await updateUsernamesInFirestore(user.UID, data);
      }

      if (data?.email) {
        await updateUserEmailInAuth(data?.email);
        await updateUserInFirestore(user.UID, { email: data.email });
      }

      dispatch(updateUser(data));
      successToast("Success user update");
    } catch (error: Error | any) {
      // throw new Error("Error updating user")

      console.log(error.mesage);
    }
  };

  return { updateUserPartial };
};

export default useUpdateUser;
