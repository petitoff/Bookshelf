import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "../../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { updateUser } from "../../../store/slices/authSlice";
import { toast } from "react-toastify";

const useUpdateUserProfilePhoto = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();

  const updateUserProfilePhoto = async (photo: File) => {
    setIsLoading(true);
    setError("");

    try {
      if (!user || !photo) return;

      // Validate the selected file
      if (!photo.type.startsWith("image/")) {
        throw new Error("Please upload an image file.");
      }

      toast.info("Uploading photo... Please wait");

      // Upload photo to storage
      // TODO: Generate a random name for the photo
      const photoRef = ref(storage, `users/${user?.UID}/${photo.name}`);
      await uploadBytes(photoRef, photo);
      const photoURL = await getDownloadURL(photoRef);

      // Update user profile photo in firestore
      const userRef = doc(db, "usernames", user?.UID);
      await updateDoc(userRef, { imageUrl: photoURL });

      // Delete old photo from storage
      if (user.imageUrl) {
        const oldPhotoRef = ref(storage, user.imageUrl);
        await deleteObject(oldPhotoRef);
      }

      dispatch(updateUser({ ...user, imageUrl: photoURL }));
      toast.success("Photo uploaded successfully");
    } catch (error: Error | any) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { updateUserProfilePhoto, isLoading, error };
};

export default useUpdateUserProfilePhoto;
