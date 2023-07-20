import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import useFirebaseImage from "../../firebaseHooks/useFirebaseImage";
import { updateUser } from "../../../store/slices/authSlice";
import { fetchUserData } from "../../../firebase/services/firestore";

const useUserData = (reloadDependency: any) => {
  const user = useAppSelector((state) => state.auth.user);
  const { getImageUrl } = useFirebaseImage();
  const isMounted = useRef(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.UID) return;

      const userData = await fetchUserData(user.UID);

      if (!userData) return;

      const imageUrl = await getImageUrl(userData?.imageId);

      userData.imageUrl = imageUrl;

      if (isMounted.current) {
        dispatch(updateUser(userData));
      }
    };

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [dispatch, getImageUrl, reloadDependency, user]);

  return {};
};

export default useUserData;
