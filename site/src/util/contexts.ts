import { createContext } from "react";

const LiftedContext = createContext({
  lifted: false,
  setLifted: (value: boolean) => {
    (this ?? { lifted: false }).lifted = value;
  },
});

export default LiftedContext;
export { LiftedContext };
