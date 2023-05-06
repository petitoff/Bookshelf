import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAppDispatch } from "./hooks";
import { setUser } from "../store/slices/authSlice";
import { User } from "../types/User";
import { toast } from "react-toastify";

const useLogin = () => {
  const [loggingInStatus, setLoggingInStatus] = useState<
    "idle" | "fetching" | "error" | "success"
  >("idle");
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

      const userProfile: User = {
        UID: userCredential.user?.uid,
        email: userCredential.user?.email || undefined,
      };

      dispatch(setUser(userProfile));

      toast.success("Logged in successfully!", {
        autoClose: 1000,
        hideProgressBar: true,
      });

      setLoggingInStatus("success");
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

  return { login, loggingInStatus };
};

export default useLogin;
