import { useMediaQuery } from "@material-ui/core";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { useTopScrollTrigger } from "../util/hooks";
import Floatable from "./Floatable";
import Tiltable from "./Tiltable";

const AppLogo = ({ className, ...props }) => (
  <h1 className={className} {...props}>
    PrePro
    <span>SQL</span>
  </h1>
);

const BuildBadge = (props) => (
  <img
    alt="Build Badge"
    src="https://github.com/obonobo/preprosql/actions/workflows/test.yml/badge.svg"
    style={{ height: "2em" }}
    {...props}
  />
);

const FloaterContainer = styled(Floatable)`
  user-select: none;
  color: red;
  width: inherit;
`;

const Floater = styled(Tiltable)`
  width: inherit;
  display: flex;
  flex-direction: column;
  place-items: center;

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

const Title = styled(AppLogo)`
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

const ContentsBase = styled.div`
  width: inherit;
  display: flex;
  flex-direction: column;
  place-items: center;
  padding: 0.5em 0em;
`;

const shakyDistance = 0.05;
const ShakyBuildBadge = styled(BuildBadge)`
  animation: ${({ $hovering }) =>
    $hovering ? "200ms linear 0s infinite shaky" : ""};

  /* prettier-ignore */
  @keyframes shaky {
      0% { transform: translate(-${shakyDistance}em, -${shakyDistance}em); }
     20% { transform: translate( ${shakyDistance}em,  ${shakyDistance}em); }
     40% { transform: translate(-${shakyDistance}em,  ${shakyDistance}em); }
     80% { transform: translate( ${shakyDistance}em, -${shakyDistance}em); }
    100% { transform: translate(-${shakyDistance}em, -${shakyDistance}em); }
  }
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
      <Title />
      <ShakyBuildBadge $hovering={hovering} />
    </ContentsBase>
  );
};

/* prettier-ignore */
const LinkBase = styled.a`
  transition: all 0.4s;
  width: min(42em, 100vw);

  position: fixed;
  top: -1em;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 2000;

  /* Move the component to the topbar if you scroll too far */
  ${({ $mini }) => $mini &&`
    top: 0.25em;
    left: 0%;
    transform: translate(-30%, -80%) scale(0.3);
  `}
`;

const GithubLink = ({ className, children, props }) => {
  const trigger = useTopScrollTrigger({ threshold: 40 });
  const smallScreen = useMediaQuery("(max-width: 45em)");

  return (
    <LinkBase
      $mini={trigger || smallScreen}
      className={className}
      href="https://github.com/obonobo/preprosql"
      {...props}
    >
      {children}
    </LinkBase>
  );
};

const FloatyTiltyHeaderCard = ({ className, ...props }) => (
  <GithubLink className={className} {...props}>
    <FloaterContainer distance="0.6em">
      <Floater speed={500}>
        <Contents />
      </Floater>
    </FloaterContainer>
  </GithubLink>
);

export default FloatyTiltyHeaderCard;
export { FloatyTiltyHeaderCard };
