import { useCallback, useState } from "react";
import styled from "styled-components";
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
`;

const Floater = styled(Tiltable)`
  display: flex;
  flex-direction: column;
  place-items: center;

  background: linear-gradient(45deg, #0040ff, #00bfff);
  border-radius: 1em;
  box-shadow: 0px 11px 67px -4px rgba(0, 0, 0, 0.6);

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
  color: hsl(240, 100%, 20%);
  font-size: 8em;
  margin: 0;
  margin-bottom: 0.1em;
  font-family: "B612", Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;

  & span {
    color: hsl(0, 100%, 30%);
    font-family: IBM Plex Serif;
  }
`;

const ContentsBase = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  padding: 0.5em 1.5em;
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

const GithubLink = ({ className, children, props }) => (
  <a
    className={className}
    href="https://github.com/obonobo/preprosql"
    {...props}
  >
    {children}
  </a>
);

const FloatyTiltyHeaderCard = ({ className, ...props }) => (
  <GithubLink className={className} {...props}>
    <FloaterContainer>
      <Floater speed={500}>
        <Contents />
      </Floater>
    </FloaterContainer>
  </GithubLink>
);

export default FloatyTiltyHeaderCard;
export { FloatyTiltyHeaderCard };
