// hooks/useMediaQuery.ts
import { useEffect, DependencyList } from "react";

type MediaQueryCallback = (matches: boolean) => void;

const useMediaQuery = (
  query: string,
  callback: MediaQueryCallback,
  deps?: DependencyList
) => {
  useEffect(() => {
    // Check if window is defined
    if (typeof window === "undefined") {
      // You can decide how to handle this case, for example:
      callback(false);
      return;
    }

    if (!window.matchMedia) {
      callback(false);
      return;
    }

    const mediaQuery = window.matchMedia(query);

    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      callback(e.matches);
    };

    handleMediaChange(mediaQuery);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [query, callback]);
};

export default useMediaQuery;
