import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAppDispatch } from "./hooks";
import { setUser } from "../store/slices/authSlice";
import { User } from "../types/User";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState<Error | any>(null);
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
            setLoginError(new Error("No user found"));
            return;
          }

          const userProfile: User = {
            UID: userCredential.user?.uid,
            email: userCredential.user?.email || undefined,
          };

          setIsLoggedIn(true);
          dispatch(setUser(userProfile));
          setIsLoggingIn(false);
          setLoginError(null);
        } catch (error) {
          setIsLoggingIn(false);
          setLoginError(error);
          setIsLoggedIn(false);
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

  return { login, isLoggingIn, loginError, isLoggedIn };
};

export default useLogin;
