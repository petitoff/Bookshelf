import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "../firebase/config";

const useUserIdFromUsername = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [fetchingStatus, setFetchingStatus] = useState<
    "idle" | "loading" | "error"
  >("idle");

  const updateUsername = useCallback((newUsername: string) => {
    setUsername(newUsername);
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      setFetchingStatus("loading");

      try {
        const usernamesRef = collection(db, "usernames");
        const usernameQuery = query(
          usernamesRef,
          where("username", "==", username)
        );
        const usernameSnap = await getDocs(usernameQuery);

        if (usernameSnap.empty) throw new Error("User does not exist");

        setUserId(usernameSnap.docs[0].data().uid);
      } catch (error) {
        setFetchingStatus("error");
        console.log(error);
      }
    };

    if (username) {
      fetchUserId();
    }
  }, [username]);

  return { userId, fetchingStatus, updateUsername };
};

export default useUserIdFromUsername;
