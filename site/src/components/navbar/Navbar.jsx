import { useContext, useRef } from "react";
import { useStickiedTrigger } from "../../util/hooks";
import LiftedContext from "../extras/LiftedContext";
import BarBase from "./Bar";

const Navbar = (props) => {
  const me = useRef(null);
  const stickied = useStickiedTrigger({ ref: me, threshold: 20 });
  const { lifted, setLifted } = useContext(LiftedContext);
  setLifted(stickied);

  return <BarBase ref={me} $lifted={lifted} {...props} />;
};

export default Navbar;
export { Navbar };
