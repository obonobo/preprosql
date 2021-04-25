import { useContext, useRef } from "react";
import { LiftedContext } from "../../util/contexts";
import { useStickiedTrigger } from "../../util/hooks";
import BarBase from "./Bar";

const Navbar = (props) => {
  const me = useRef(null);
  const stickied = useStickiedTrigger({ ref: me, threshold: 100 });
  const { setLifted } = useContext(LiftedContext);
  setLifted(stickied);

  return <BarBase ref={me} $lifted={stickied} {...props} />;
};

export default Navbar;
export { Navbar };
