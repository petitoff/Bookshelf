import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Sign up the user with Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: Error | any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};

export default useSignup;
