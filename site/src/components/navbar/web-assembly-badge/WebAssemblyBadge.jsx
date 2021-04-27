import styled, { css, keyframes } from "styled-components";
import { urlFor } from "../../../util/utils";

const WebAssemblyBadge = styled.div`
  &&& {
    ${({ theme }) => theme && theme.mixins && theme.mixins.unselectable()}

    display: flex;
    place-content: center;
    place-items: center;

    border-radius: 20%;
    box-shadow: ${({ theme }) =>
      theme && theme.shadows && theme.shadows.sparse};

    width: 4em;
    height: 4em;
    padding: 0.2em;
    margin: 0.3em;
    overflow: hidden;

    & > img {
      ${({ theme }) => theme && theme.mixins && theme.mixins.unselectable()}
      object-fit: contain;
      width: 3em !important;
    }
  }
`;

// prettier-ignore
const CoolBadge = styled(WebAssemblyBadge)`
  transition: ${({ theme }) => theme
    && theme.transitions
    && theme.transitions.liftedFast};

  transform: rotate(-20deg);
  font-size: 0.35em;
  flex-shrink: 0;
  position: relative;
  z-index: 6000;
  top: -5%;
  left: 85%;

  ${({ $hovering }) => $hovering && css`
    transform: rotate(-20deg) scale(1.2);
  `}
`;

const animate = (value = "") => css`
  animation: ${value};
  -moz-animation: ${value};
  -webkit-animation: ${value};
  -ms-animation: ${value};
`;

const spin = keyframes`
  from { transform: rotateZ(0deg);   }
  to   { transform: rotateZ(360deg); }
`;

// prettier-ignore
const Background = styled.div`
  ${animate(css`${spin} 3000ms linear infinite`)}

  background: linear-gradient(45deg, #fffb00, #ff0000);
  height: 200%;
  width: 200%;

  position: relative;
  left: 1em;
  z-index: -1;

  flex-grow: 0;
  flex-shrink: 0;
`;

const Logo = styled.img.attrs({
  alt: "WA",
  src: urlFor("/WebAssembly_Logo.svg"),
})`
  position: relative;
  z-index: 2;
  left: -4em;
`;

const CoolWebAssemblyBadge = ({ hovering, ...props }) => (
  <CoolBadge $hovering={hovering} {...props}>
    <Background />
    <Logo />
  </CoolBadge>
);

export default WebAssemblyBadge;
export { WebAssemblyBadge, CoolWebAssemblyBadge };
