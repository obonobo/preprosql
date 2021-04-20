import { useRef, useState } from "react";
import styled from "styled-components";
import { useScrollListener } from "../util/hooks";

// prettier-ignore
const HeaderBase = styled.div`
  margin: 0px !important;
  margin-bottom: -4em !important;
  padding: 0px;
  width: 100%;
  height: 5em;
  z-index: 1500;

  top: 0;
  position: sticky;
  transition: all 0.4s linear;
  border-top: 0.5em solid rgba(131, 131, 131, 0.575);

  ${({ $shadow }) => $shadow && `
    box-shadow: 0px 8px 12px -6px rgba(71, 71, 71, 0.788);
    background-color: rgba(39, 0, 84, 0.623);
    border-top: 0.5em rgba(39, 0, 84, 0.623);
    backdrop-filter: blur(5px);
  `}
`;

const Navbar = ({ ...props }) => {
  const [shadow, setShadow] = useState(false);
  const me = useRef(null);

  useScrollListener({
    action: () => {
      if (!me.current) return;
      setShadow(me.current.getBoundingClientRect().top <= 20);
    },
  });

  return <HeaderBase ref={me} $shadow={shadow} {...props} />;
};

export default Navbar;
export { Navbar };
