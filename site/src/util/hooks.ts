import { useEffect, useReducer, useState, MutableRefObject } from "react";

/**
 * A hook that tells you when the user has scrolled away from the top of the
 * screen
 */
const useTopScrollTrigger = ({ threshold = 100 } = {}) => {
  const [awayFromTop, setAwayFromTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => setAwayFromTop(window.scrollY >= threshold);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return awayFromTop;
};

/**
 * Attach an event listener to the 'scroll' event. `ref` can be a React `useRef`
 * value.
 */
const useScrollListener = ({
  ref,
  action = () => {},
}: { ref?: MutableRefObject<any>; action?: () => void } = {}) => {
  useEffect(() => {
    const node = (ref && ref.current) || window;
    node.addEventListener("scroll", action);
    return () => node.removeEventListener("scroll", action);
  }, []);
};

/**
 * Tells you when your element has gotten "stuck" at the top of the screen.
 * Useful for `position: sticky;` elements.
 */
const useStickiedTrigger = ({
  ref,
  threshold = 20,
}: { ref?: MutableRefObject<any>; threshold?: number } = {}) => {
  const [triggered, setTriggered] = useState(false);

  useScrollListener({
    action: () => {
      if (!ref || !ref.current) return;
      setTriggered(ref.current.getBoundingClientRect().top <= threshold);
    },
  });

  return triggered;
};

type Action = { type: "lift" } | { type: "unlift" };

const useLiftReducer = () =>
  useReducer(
    (_: { lifted: boolean }, action: Action) => {
      switch (action.type) {
        case "lift":
          return { lifted: true };
        case "unlift":
          return { lifted: false };
      }
    },
    { lifted: false }
  );

export {
  useTopScrollTrigger,
  useScrollListener,
  useStickiedTrigger,
  useLiftReducer,
};
