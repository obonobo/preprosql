import { useRef, useState } from "react";
import { useScrollListener } from "../../util/hooks";
import BarBase from "./Bar";
import ButtonGrid from "./ButtonGrid";
import { DownloadNow, TryInBrowser } from "./Buttons";

const Navbar = (props) => {
  const [lifted, setLifted] = useState(false);
  const me = useRef(null);

  useScrollListener({
    action: () => {
      if (!me.current) return;
      setLifted(me.current.getBoundingClientRect().top <= 20);
    },
  });

  return (
    <BarBase ref={me} $lifted={lifted} {...props}>
      <ButtonGrid>
        <DownloadNow />
        <TryInBrowser />
      </ButtonGrid>
    </BarBase>
  );
};

export default Navbar;
export { Navbar };
