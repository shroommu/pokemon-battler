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

    const nextDimensions = getDimensions();

    setDimensions((currentDimensions) => {
      if (
        currentDimensions.width === nextDimensions.width &&
        currentDimensions.height === nextDimensions.height
      ) {
        return currentDimensions;
      }

      return nextDimensions;
    });
  }, [setDimensions, targetRef]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (!targetRef.current || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => {
      handleResize();
    });

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [handleResize, targetRef]);

  useLayoutEffect(() => {
    handleResize();
  });

  return dimensions;
};
