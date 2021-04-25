import { Fragment, useCallback, useContext, useState } from "react";
import styled from "styled-components";
import LiftedContext from "./extras/LiftedContext";
import Floatable from "./Floatable";
import Tiltable from "./Tiltable";
import defaultTheme from "../util/styles";

const AppTitle = styled.h1.attrs({
  children: [
    <Fragment key="prepro">PrePro</Fragment>,
    <span key="sql">SQL</span>,
  ],
  theme: defaultTheme,
})`
  color: ${({ theme }) => theme.colors.preProBlue};
  font-size: 8em;
  margin: 0;
  margin-bottom: 0.1em;
  font-family: ${({ theme }) => theme.fonts.B612};

  & span {
    color: ${({ theme }) => theme.colors.sqlRed};
    font-family: ${({ theme }) => theme.fonts.IBMPlexSerif};
  }
`;

// prettier-ignore
const ShakyBuildBadge = styled.img.attrs({
  $shakyDistance: 0.05,
  alt: "Build Badge",
  src:
    "https://github.com/obonobo/preprosql/actions/workflows/test.yml/badge.svg",
})`
  height: 2em;

  animation: ${({ $hovering }) =>
    $hovering ? "200ms linear 0s infinite shaky" : ""};

  @keyframes shaky {
      ${({ $shakyDistance }) => $shakyDistance && `
        0% { transform: translate(-${$shakyDistance}em, -${$shakyDistance}em); }
       20% { transform: translate( ${$shakyDistance}em,  ${$shakyDistance}em); }
       40% { transform: translate(-${$shakyDistance}em,  ${$shakyDistance}em); }
       80% { transform: translate( ${$shakyDistance}em, -${$shakyDistance}em); }
      100% { transform: translate(-${$shakyDistance}em, -${$shakyDistance}em); }
    `}
  }
`;

const Tilty = styled(Floatable).attrs({ distance: "0.6em" })`
  user-select: none;
  color: red;
  height: fit-content !important;
  width: unset !important;
`;

const Floaty = styled(Tiltable).attrs({ speed: 500 })`
  display: flex;
  flex-direction: column;
  place-items: center;
  height: fit-content !important;
  width: unset !important;

  border-radius: 1em;
  box-shadow: 0px 11px 67px -4px rgba(0, 0, 0, 0.6);

  backdrop-filter: blur(10px);
  background: linear-gradient(
    45deg,
    rgba(0, 64, 255, 0.712),
    rgba(0, 191, 255, 0.712)
  );

  @supports not (backdrop-filter: blur(10px)) {
    background: linear-gradient(
      45deg,
      rgba(0, 64, 255, 1),
      rgba(0, 191, 255, 1)
    );
  }

  & h1 {
    margin: 0px;
  }
  & svg {
    margin-bottom: 0.3em;
  }
  & img {
    margin-bottom: 0.5em;
  }
`;

const ContentsBase = styled.div`
  width: inherit;
  display: flex;
  flex-direction: column;
  place-items: center;
  padding: 0.5em 0em;
`;

const Contents = () => {
  const [hovering, setHovering] = useState(false);
  const handleEnter = useCallback(() => setHovering(true), []);
  const handleLeave = useCallback(() => setHovering(false), []);

  return (
    <ContentsBase
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      <AppTitle />
      <ShakyBuildBadge $hovering={hovering} />
    </ContentsBase>
  );
};

/* prettier-ignore */
const LinkBase = styled.a`
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  width: min(42em, 100vw);

  position: fixed;
  top: -1em;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 2000;

  ${({ $mini }) => $mini &&`
    top: 0.5em;
    left: 0%;
    transform: translate(-30%, -80%) scale(0.3);
  `}
`;

const HomeLink = ({ className, children, props }) => {
  const { lifted } = useContext(LiftedContext);
  return (
    <LinkBase $mini={lifted} className={className} href="/" {...props}>
      {children}
    </LinkBase>
  );
};

const FloatyTiltyHeaderCard = ({ className, ...props }) => (
  <HomeLink className={className} {...props}>
    <Tilty>
      <Floaty>
        <Contents />
      </Floaty>
    </Tilty>
  </HomeLink>
);

export default FloatyTiltyHeaderCard;
export { FloatyTiltyHeaderCard };
