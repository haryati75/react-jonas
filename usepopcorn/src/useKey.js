import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [action, key]);
}
