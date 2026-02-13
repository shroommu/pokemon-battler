import { useState, useEffect, useLayoutEffect, useCallback } from "react";

export const useDimensions = (targetRef) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleResize = useCallback(() => {
    const getDimensions = () => {
      return {
        width: targetRef.current ? targetRef.current.offsetWidth : 0,
        height: targetRef.current ? targetRef.current.offsetHeight : 0,
      };
    };
    setDimensions(getDimensions());
  }, [setDimensions, targetRef]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useLayoutEffect(() => {
    handleResize();
  }, [handleResize]);

  return dimensions;
};
