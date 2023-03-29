import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

const useLogout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (isLoggingOut) {
      signOut(auth)
        .then(() => {
          if (isMounted) {
            setIsLoggingOut(false);
          }
        })
        .catch((error) => {
          if (isMounted) {
            setError(error);
            setIsLoggingOut(false);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isLoggingOut]);

  const logout = () => {
    setIsLoggingOut(true);
  };

  return { logout, isLoggingOut, error };
};

export default useLogout;
