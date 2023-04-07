import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAppDispatch } from "./hooks";
import { setUser } from "../store/slices/authSlice";
import { User } from "../types/User";
import { toast } from "react-toastify";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleLogin = async () => {
      if (isLoggingIn) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          if (!userCredential.user) {
            setIsLoggingIn(false);
            return;
          }

          const userProfile: User = {
            UID: userCredential.user?.uid,
            email: userCredential.user?.email || undefined,
          };

          dispatch(setUser(userProfile));
          setIsLoggingIn(false);
          toast.success("Logged in successfully!", {
            autoClose: 1000,
            hideProgressBar: true,
          });
        } catch (error: any) {
          setIsLoggingIn(false);

          if (error.code === "auth/user-not-found") {
            toast.error("User not found!");
          } else if (error.code === "auth/wrong-password") {
            toast.error("Wrong password!");
          } else {
            toast.error("Something went wrong!");
          }
        }
      }
    };

    handleLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  const login = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setIsLoggingIn(true);
  };

  return { login };
};

export default useLogin;
