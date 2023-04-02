import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAppDispatch } from "./hooks";
import { logoutUser } from "../store/slices/authSlice";

const useLogout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    let isMounted = true;
    if (isLoggingOut) {
      signOut(auth)
        .then(() => {
          if (isMounted) {
            setIsLoggingOut(false);
            dispatch(logoutUser());
            handleRefresh();
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggingOut]);

  const logout = () => {
    setIsLoggingOut(true);
  };

  return { logout, isLoggingOut, error };
};

export default useLogout;
