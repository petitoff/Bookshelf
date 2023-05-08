import {useAppDispatch, useAppSelector} from "./hooks";
import {User} from "../types/User";
import {updateUserEmailInAuth, updateUserInFirestore} from "../firebase/services/firestore";
import {updateUser} from "../store/slices/authSlice";
import {successToast} from "../utils/toastHelper";

const useUpdateUser = () => {
    const user = useAppSelector(state => state.auth.user)
    const dispatch = useAppDispatch();

    const updateUserPartial = async (data: Partial<User>): Promise<void> => {
        try {
            if (!user) return;

            data?.username && await updateUserInFirestore(user.UID, data)
            data?.email && await updateUserEmailInAuth(data?.email)


            dispatch(updateUser(data))

            successToast("Success user update")
        } catch (error: any) {
            throw new Error("Error updating error")
        }
    }

    return {updateUserPartial}
}

export default useUpdateUser;