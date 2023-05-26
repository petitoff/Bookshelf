import { useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";

const useFirebaseImage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const getImageUrl = async (imageId: string | undefined | null) => {
    try {
      if (!imageId) {
        setImageUrl(null);
        return;
      }

      const imageRef = ref(storage, `images/${imageId}`);
      const url = await getDownloadURL(imageRef);
      setImageUrl(url);
      return url;
    } catch (error: any) {
      console.log(error);
      setError(error);
    }
  };

  return { getImageUrl, imageUrl, error };
};

export default useFirebaseImage;
