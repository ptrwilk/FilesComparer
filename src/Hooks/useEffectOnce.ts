import { useEffect, useRef } from "react";

//for some reason useEffect is called twice after the page is refreshed,
//so this hook is a bypass when we want to call an action once
export const useEffectOnce = (action: () => void) => {
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current === false) {
      loadedRef.current = true;

      action();
    }
  }, []);
};
