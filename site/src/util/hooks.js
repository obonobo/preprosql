import { useEffect, useState } from "react";

/**
 * A hook that tells you when the user has scrolled away from the top of the
 * screen
 */
const useTopScrollTrigger = (threshold) => {
  const [awayFromTop, setAwayFromTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setAwayFromTop(window.scrollY >= (threshold || 100));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return awayFromTop;
};

export default useTopScrollTrigger;
export { useTopScrollTrigger };
