import { MutableRefObject, useCallback, useMemo, useState } from "react";
import { Todo } from "./StoreContext";

type Filter = "all" | "complete" | "incomplete";

/**
 * A hook for creating the Todo-list item filter.
 *
 * @returns An object - { filter: the filter function, setFilter: an update
 * function that accepts one of ["all", "complete", "incomplete"] }
 */
const useFilter = (): {
  filter: (f: Todo) => boolean;
  setFilter: (f: Filter) => void;
} => {
  const [filter, setFilter] = useState<(f: Todo) => boolean>(() => () => true);

  const updateFilter = useCallback(
    (f: Filter) => {
      switch (f) {
        case "all":
          return setFilter(() => () => true);
        case "complete":
          return setFilter(() => (x: Todo) => x.completed);
        case "incomplete":
          return setFilter(() => (x: Todo) => !x.completed);
        default:
          return null;
      }
    },
    [setFilter]
  );

  return { filter, setFilter: updateFilter };
};

/**
 * A hook for sensing double, triple, etc. clicks on elements. This hook returns
 * 3 controls that you can use in your elements: the current double-clicked
 * status (whether or not the element has been double clicked), an onClick
 * function that you can use to increment the click counter, a reset function to
 * restore the counter back to 0.
 *
 * The function works by counting clicks and then getting "stuck" after a
 * certain number of clicks have been delivered within the givin timeframe. The
 * only way to "unstick" the trigger is to call the reset function. Clicks made
 * before the trigger gets stuck have a timeout after which they will expire. So
 * basically, a double-click features is: you make x number of clicks within the
 * given timeframe to trigger the double-click.
 *
 * @param numberOfClicks The number of clicks needed to stick the trigger.
 *                       Defaults to 2.
 *
 * @param timeout The expiry time of a click. Defaults to 200 milliseconds
 *                (shorter than it sounds).
 *
 * @returns A tuple of: [state, increment click, reset function]
 */
const useClickCounter = ({
  numberOfClicks = 2,
  timeout = 200,
}: {
  numberOfClicks?: number;
  timeout?: number;
} = {}): [boolean, () => void, () => void] => {
  const [clicked, setClicked] = useState(0);
  const isSet = useMemo(() => clicked >= 2, [clicked]);
  const reset = useCallback(() => setClicked(0), [setClicked]);

  const set = useCallback(() => {
    setClicked((c) => c + (c >= 1 ? numberOfClicks + 666 : 1));
    setTimeout(() => setClicked((c) => c - 1), timeout);
  }, [setClicked, numberOfClicks, timeout]);

  return [isSet, set, reset];
};

/**
 * A function that scrolls to the bottom of an element after a short delay
 *
 * @param ref Reference to your element.
 * @param delay The length of time to wait before executing the scroll.
 * @param behavior The scroll behaviour that you want.
 * @returns
 */
const useScrollToBottomFunction = <T extends HTMLElement>(
  ref: MutableRefObject<T>,
  {
    delay = 50,
    behavior = "smooth",
  }: {
    delay?: number;
    behavior?: ScrollBehavior;
  } = {}
): (() => NodeJS.Timeout) =>
  useCallback(
    () =>
      setTimeout(
        () =>
          ref?.current?.scrollBy({
            behavior,
            top: ref.current.scrollHeight,
          }),
        delay
      ),
    [ref, delay, behavior]
  );

export { useFilter, useClickCounter, useScrollToBottomFunction };
export type { Filter };
