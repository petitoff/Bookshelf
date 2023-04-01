import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

interface Props {
  imageName?: string;
}

const useFirebaseImage = ({ imageName }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    console.log(`image url: ${imageName}`);
    const imageRef = ref(storage, `images/${imageName}`);
    getDownloadURL(imageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.log(error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageName, storage]);

  return { imageUrl };
};

export default useFirebaseImage;
