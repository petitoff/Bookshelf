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
  const [loginError, setLoginError] = useState<Error | any>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleLogin = async () => {
      if (isLoggingIn) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        // console.log("login", userCredential.user);

        const userProfile: User = {
          id: userCredential.user?.uid,
          email: userCredential.user?.email || undefined,
        };
        dispatch(setUser(userProfile));
        setIsLoggingIn(false);
        setLoginError(null);
      }
    };

    handleLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggingIn, email, password]);

  const login = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setIsLoggingIn(true);
  };

  return { login, isLoggingIn, loginError };
};

export default useLogin;
