import { useState, useEffect } from "react";
import "firebase/firestore";
import { User } from "../types/User";
import { db } from "../firebase/config";
import { useAppSelector } from "./hooks";
import { doc, getDoc } from "firebase/firestore";
import useFirebaseImage from "./useFirebaseImage";

const useUserData = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const auth = useAppSelector((state) => state.auth.user);
  const { getImageUrl, imageUrl } = useFirebaseImage();
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    if (!auth?.UID || isUserLoaded) return;

    const userRef = doc(db, "users", auth?.UID);

    getDoc(userRef)
      .then((doc) => {
        if (doc.exists()) {
          const userData = doc.data() as User;
          setUser(userData);
          getImageUrl(userData?.imageId);
          setIsUserLoaded(true);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        setError(error);
      });
  }, []);

  return { user, imageUrl, error };
};

export default useUserData;
