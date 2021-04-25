import { ButtonBase, makeStyles } from "@material-ui/core";
import { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import { LiftedContext } from "../../util/contexts";
import defaultTheme from "../../util/styles";
import { assetPrefix } from "../../util/utils";
import TranslateDownOnClick from "../extras/TranslateDownOnClick";
import Floatable from "./Floatable";
import Tiltable from "./Tiltable";

const AppTitle = styled.h1.attrs({
  children: (
    <>
      PrePro
      <span key="sql">SQL</span>
    </>
  ),
  theme: defaultTheme,
})`
  margin: 0;
  font-size: 8em;
  margin-bottom: 0.1em;

  ${({ theme }) => `
    color: ${theme.colors.preProBlue};
    font-family: ${theme.fonts.B612};
    & span {
      color: ${theme.colors.sqlRed};
      font-family: ${theme.fonts.IBMPlexSerif};
    }
  `}
`;

const LinkToBuilds = styled.a.attrs({
  href: "https://github.com/obonobo/preprosql/actions/workflows/test.yml",
})`
  height: 2em;
  :hover {
    transform: scale(1.05) translateY(-5%);
  }

  &,
  & > img {
    transition: ${({ theme }) =>
      theme && theme.transitions && theme.transitions.liftedFast};
    margin: 0;
    padding: 0;
  }
`;

// prettier-ignore
const ShakyBuildBadge = styled.img.attrs({
  $shakyDistance: 0.05,
  alt: "Build Badge",
  src: "https://github.com/obonobo/preprosql/actions/workflows/test.yml/badge.svg",
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

/* prettier-ignore */
const HomeLink = styled.div.attrs(({ onClick }) => ({
  theme: defaultTheme,
  onClick: (e) => {
    if (onClick) onClick(e);
    if (window && window.location) window.location.replace(`${assetPrefix}/`);
  },
}))`
  transition: ${({ theme }) => theme.transitions.lifted};
  width: min(42em, 100vw);
  position: fixed;
  top: -1em;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 2000;

  :hover {
    cursor: pointer;
  }

  ${({ $lifted }) => $lifted && `
    top: 0.4em;
    left: 0%;
    transform: translate(-30%, -80%) scale(0.3);
  `}
`;

const Floaty = styled(Floatable).attrs({ distance: "0.6em" })`
  user-select: none;
  color: red;
  height: fit-content !important;
  width: unset !important;
`;

const Tilty = styled(Tiltable).attrs({ speed: 500, $lifted: false })`
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

const ContentsBase = styled(ButtonBase)`
  &&& {
    width: 100%;
    height: 100%;
    margin: 0px;
    color: white;
    font-size: 1rem;
    padding: 0.5em 0em;
    border-radius: inherit;

    display: flex;
    flex-direction: column;
    place-items: center;
  }
`;

const Contents = () => {
  const [hovering, setHovering] = useState(false);
  const handleEnter = useCallback(() => setHovering(true), []);
  const handleLeave = useCallback(() => setHovering(false), []);

  const classes = makeStyles({ root: { height: "16em" } })();
  return (
    <ContentsBase
      classes={classes}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      <AppTitle />
      <LinkToBuilds>
        <ShakyBuildBadge $hovering={hovering} />
      </LinkToBuilds>
    </ContentsBase>
  );
};

const FloatyTiltyHeaderCard = ({ className, ...props }) => {
  const { lifted } = useContext(LiftedContext);
  return (
    <HomeLink $lifted={lifted} className={className} {...props}>
      <TranslateDownOnClick distance="0.6em">
        <Floaty>
          <Tilty>
            <Contents />
          </Tilty>
        </Floaty>
      </TranslateDownOnClick>
    </HomeLink>
  );
};

export default FloatyTiltyHeaderCard;
export { FloatyTiltyHeaderCard };
