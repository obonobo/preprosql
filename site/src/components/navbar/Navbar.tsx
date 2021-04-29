import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { useLiftedDispatch } from "../../state/LiftedContext";
import { useStickiedTrigger } from "../../util/hooks";
import defaultTheme from "../../util/styles";

// prettier-ignore
const BarBase = styled.div.attrs({
  theme: defaultTheme,
})<{ $lifted: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  margin: 0px !important;
  margin-bottom: -4em !important;
  padding: 0.2em;
  width: calc(100% + 13px);
  height: 5em;
  z-index: 1500;

  top: 0;
  position: sticky;
  border-top: 0.5em solid rgba(131, 131, 131, 0.575);
  transition: ${({ theme }) => theme.transitions.lifted};

  ${({ $lifted, theme }) => $lifted && css`
    box-shadow: 0px 8px 12px -6px rgba(71, 71, 71, 0.788);
    background-color: ${theme.colors.seeThroughPurple};
    border-top: 0.5em ${theme.colors.seeThroughPurple};
    backdrop-filter: blur(5px);
  `}

  & > div {
    display: none;

    ${({ $lifted }) => $lifted && css`
      flex-grow: 0;
      display: grid;
    `}
  }
`;

const Navbar = (props: ComponentPropsWithoutRef<"div">) => {
  const me = useRef(null);
  const stickied = useStickiedTrigger({ ref: me, threshold: 100 });
  const liftedDispatch = useLiftedDispatch();
  useEffect(() => liftedDispatch({ type: "setLift", newValue: stickied }), [
    stickied,
    liftedDispatch,
  ]);

  return <BarBase ref={me} $lifted={stickied} {...props} />;
};

export default Navbar;
export { Navbar };
