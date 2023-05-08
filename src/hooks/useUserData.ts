import { useEffect, useRef } from "react";
import { User } from "../types/User";
import { useAppDispatch, useAppSelector } from "./hooks";
import useFirebaseImage from "./useFirebaseImage";
import { updateUser } from "../store/slices/authSlice";
import { fetchUserData } from "../firebase/services/firestore";

const useUserData = (reloadDependency: any) => {
  const user = useAppSelector((state) => state.auth.user);
  const { getImageUrl, imageUrl } = useFirebaseImage();
  const isMounted = useRef(true);

  const dispatch = useAppDispatch();

  const fetchData = async () => {
    if (!user?.UID) return;

    const userData = await fetchUserData(user.UID);

    if (!userData) return;

    await getImageUrl(userData.imageUrl);

    if (isMounted.current) {
      dispatch(updateUser(userData));
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadDependency]);

  useEffect(() => {
    if (!imageUrl) return;

    const partialUser: Partial<User> = { imageUrl };
    dispatch(updateUser(partialUser));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  return {};
};

export default useUserData;
