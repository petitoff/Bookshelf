import { useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";
import { setLoading } from "../../store/slices/authSlice";

const useFirebaseImage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const getImageUrl = async (imageId: string | undefined | null) => {
    try {
      if (!imageId && !imageUrl) {
        setImageUrl(null);
        return;
      }

      if (imageUrl) {
        return imageUrl;
      }

      const imageRef = ref(storage, `images/${imageId}`);
      const url = await getDownloadURL(imageRef);
      setImageUrl(url);
      return url;
    } catch (error: any) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { getImageUrl, imageUrl, error };
};

export default useFirebaseImage;
