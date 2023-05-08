import {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase/config";
import {useAppDispatch} from "./hooks";
import {setUser} from "../store/slices/authSlice";
import {toast} from "react-toastify";
import {successToast} from "../utils/toastHelper";
import {fetchUserData} from "../firebase/services/firestore";

const useLogin = () => {
    const [loggingInStatus, setLoggingInStatus] = useState<
        "idle" | "fetching" | "error" | "success"
    >("idle");
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [error, setError] = useState<any>(null);

    const dispatch = useAppDispatch();

    const login = async (email: string, password: string) => {
        setLoggingInStatus("fetching");

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            if (!userCredential.user) {
                throw new Error("User not found!");
            }

            const userData = await fetchUserData(userCredential.user?.uid, setError);

            dispatch(setUser(userData));
            // dispatch((updateUser({imageUrl: imageUrl})))
            setLoggingInStatus("success");
            successToast("Logged in successfully!");
            setIsUserLoggedIn(true);

        } catch (error: any) {
            setLoggingInStatus("error");

            if (error.code === "auth/user-not-found") {
                toast.error("User not found!");
            } else if (error.code === "auth/wrong-password") {
                toast.error("Wrong password!");
            } else {
                toast.error("Something went wrong!");
            }
        }
    };

    return {login, loggingInStatus, isUserLoggedIn};
};

export default useLogin;
