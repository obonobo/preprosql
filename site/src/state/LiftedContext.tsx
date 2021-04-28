import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

type LiftedStore = { lifted: boolean };
type LiftedAction = {
  type: "lift" | "unlift" | "setLift" | "toggleLift";
  newValue?: boolean;
};

const LiftedStoreContext = createContext<LiftedStore>({ lifted: false });
const LiftedDispatchContext = createContext<Dispatch<LiftedAction>>(() => {});

const reducer = (state: LiftedStore, action: LiftedAction): LiftedStore => {
  switch (action.type) {
    case "setLift":
      return action.newValue === state.lifted
        ? state
        : { lifted: action.newValue };
    case "toggleLift":
      return { lifted: !state.lifted };
    case "lift":
      return !state.lifted ? { lifted: true } : state;
    case "unlift":
      return state.lifted ? { lifted: false } : state;
    default:
      return state;
  }
};

const useNewLiftedContext = () => useReducer(reducer, { lifted: false });

/**
 * Context wrapper component
 *
 * @param props
 * @returns
 */
const LiftedContextProvider = ({ children }: { children?: ReactNode }) => {
  const [lifted, dispatchLifted] = useNewLiftedContext();
  return (
    <LiftedDispatchContext.Provider value={dispatchLifted}>
      <LiftedStoreContext.Provider value={lifted}>
        {children}
      </LiftedStoreContext.Provider>
    </LiftedDispatchContext.Provider>
  );
};

/**
 * Convenience hook for grabbing the lifted state
 */
const useLifted = () => useContext(LiftedStoreContext).lifted;

/**
 * Convenience hook for using the lifted dispatch function
 */
const useLiftedDispatch = () => useContext(LiftedDispatchContext);

export default LiftedStoreContext;
export type { LiftedStore, LiftedAction };
export {
  useLifted,
  useLiftedDispatch,
  LiftedDispatchContext,
  LiftedStoreContext,
  useNewLiftedContext,
  LiftedContextProvider,
};
