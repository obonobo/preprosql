import { memo } from "react";
import { useSmallScreenLiftTrigger } from "./hooks";

/**
 * A utility component that listens for changes to screen size and reacts by
 * dispatching an action to the lift state store. All that is needed is to place
 * this component within scope of a lift store context provider. This is
 * component-based API for invoking the `useSmallScreenLiftTrigger`. It gives a
 * parent component the ability to insert the observer in its DOM tree.
 *
 * @returns An empty React.Fragment
 */
const SmallScreenLiftObserver = memo(() => {
  useSmallScreenLiftTrigger();
  return <></>;
});

export default SmallScreenLiftObserver;
export { SmallScreenLiftObserver };
