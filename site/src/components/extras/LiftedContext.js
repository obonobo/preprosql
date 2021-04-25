import { createContext } from "react";

const LiftedContext = createContext({ lifted: false, setLifted: () => {} });

export default LiftedContext;
