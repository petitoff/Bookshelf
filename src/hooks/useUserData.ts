import { useState, useEffect } from "react";
import "firebase/firestore";
import { User } from "../types/User";
import { db } from "../firebase/config";
import { useAppDispatch, useAppSelector } from "./hooks";
import { doc, getDoc } from "firebase/firestore";
import useFirebaseImage from "./useFirebaseImage";
import { setUser } from "../store/slices/authSlice";

const useUserData = () => {
  const [error, setError] = useState<Error | null>(null);
  const auth = useAppSelector((state) => state.auth.user);
  const { getImageUrl, imageUrl } = useFirebaseImage();
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!auth?.UID || isUserLoaded) return;

    const userRef = doc(db, "users", auth?.UID);

    getDoc(userRef)
      .then((doc) => {
        if (doc.exists()) {
          const userData = doc.data() as User;
          if (userData.imageId) {
            getImageUrl(userData?.imageId);
          }

          setIsUserLoaded(true);
          dispatch(setUser(userData));
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        setError(error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    if (!imageUrl) return;
    dispatch(setUser({ imageUrl } as User));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  return { error };
};

export default useUserData;
