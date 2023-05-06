import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

interface SignupState {
  isLoading: boolean;
  error: string | null;
}

const useSignup = () => {
  const [signupState, setSignupState] = useState<SignupState>({
    isLoading: false,
    error: null,
  });

  const history = useHistory();

  const signup = async (email: string, password: string): Promise<void> => {
    setSignupState({ isLoading: true, error: null });

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (result.user) {
        await setDoc(doc(db, "users", result.user.uid), {
          email: result.user.email,
          // Add any additional user data you want to store in the document
        });

        await setDoc(doc(db, "usernames", result.user.uid), {});

        toast.success("User created successfully");
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use");
      } else {
        toast.error(`Something went wrong ${error.message}`);
      }

      setSignupState({ isLoading: false, error });
    } finally {
      setSignupState({ isLoading: false, error: null });
      history.push("/login");
    }
  };

  return { signupState, signup };
};

export default useSignup;
