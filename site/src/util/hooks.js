import { useEffect, useState } from "react";

/**
 * A hook that tells you when the user has scrolled away from the top of the
 * screen
 */
const useTopScrollTrigger = ({ threshold = 100 } = {}) => {
  const [awayFromTop, setAwayFromTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setAwayFromTop(window.scrollY >= threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return awayFromTop;
};

/**
 * Attach an event listener to the 'scroll' event. `ref` can be a React `useRef`
 * value.
 */
const useScrollListener = ({ ref, action = () => {} } = {}) => {
  useEffect(() => {
    const node = (ref && ref.current) || window;
    node.addEventListener("scroll", action);
    return () => node.removeEventListener("scroll", action);
  }, []);
};

export default useTopScrollTrigger;
export { useTopScrollTrigger, useScrollListener };
