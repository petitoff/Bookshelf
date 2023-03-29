import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<Error | any>(null);

  useEffect(() => {
    if (isLoggingIn) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setEmail("");
          setPassword("");
          setIsLoggingIn(false);
          setLoginError(null);
        })
        .catch((error: Error | any) => {
          setLoginError(error);
          setIsLoggingIn(false);
        });
    }
  }, [isLoggingIn, email, password]);

  const login = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setIsLoggingIn(true);
  };

  return { login, isLoggingIn, loginError };
};

export default useLogin;
