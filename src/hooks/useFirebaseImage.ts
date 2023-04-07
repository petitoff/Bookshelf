import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

const useFirebaseImage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const getImageUrl = async (imageId?: string) => {
    try {
      if (imageId === undefined) {
        setImageUrl(null);
      }

      const imageRef = ref(storage, `images/${imageId}`);
      const url = await getDownloadURL(imageRef);
      setImageUrl(url);
    } catch (error: any) {
      console.log(error);
      setError(error);
    }
  };

  // useEffect(() => {
  //   getImageUrl();
  // }, [imageName]);

  return { getImageUrl, imageUrl, error };
};

export default useFirebaseImage;
