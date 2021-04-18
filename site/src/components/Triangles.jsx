import { IconButton } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Triangulr from "triangulr";
import { assetPrefix } from "../utils";

const Root = styled.div`
  position: relative;
  top: 0px;
  left: 0px;
`;

const Background = styled(Root)`
  z-index: 0;
  max-width: 100%;
  max-height: 100%;
`;

const Foreground = styled(Root)`
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
`;

const OkEmoji = () => (
  <img
    alt="ok"
    src={`${assetPrefix}/ok.png`}
    style={{ border: "none", objectFit: "contain" }}
  />
);

const RegenerateTrianglesButton = styled(IconButton)`
  transition: all 0.1s;
  align-self: flex-end;
  display: flex;
  place-items: center;
  place-content: center;

  height: 2.5em;
  width: 2.5em;
  padding: 0.1em;

  :hover {
    transform: scale(1.1) rotate(5deg);
  }

  :active {
    transform: scale(1.1) rotate(-5deg);
  }

  * {
    height: inherit;
    width: inherit !important;
    border: none;
    object-fit: none;
    box-sizing: unset;
    transition: all 0.1s;
  }
`;

const TrianglesOverlay = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;

  & > * {
    margin: 2em;
  }
`;

const createTriangles = (w, h) =>
  new Triangulr(w, h, 40, 20, (path) => {
    const random = 32;
    const ratio = (path.x + path.y) / (path.cols + path.lines);
    const code = Math.floor(
      255 - ratio * (255 - random) - Math.random() * random
    ).toString(16);
    return `#${code}0055`;
  });

const Tri = ({ w, h, button, ...props }) => {
  const triangles = useRef(null);

  const populateBackground = () => {
    if (triangles.current) {
      const newTriangle = createTriangles(w || 1920, h || 253);
      triangles.current.innerHTML = "";
      triangles.current.appendChild(newTriangle);
    }
  };

  const But = () => (
    <TrianglesOverlay>
      <RegenerateTrianglesButton
        onClick={populateBackground}
        style={{ margin: "1em", transition: "all 0.2s" }}
      >
        <OkEmoji />
      </RegenerateTrianglesButton>
    </TrianglesOverlay>
  );

  useEffect(populateBackground, [w, h]);
  return (
    <>
      <Background ref={triangles} {...props} />
      {button ? <But /> : null}
    </>
  );
};

const Triangles = ({ children, className, button, ...props }) => {
  const triangles = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  const reapplyDimensions = () => {
    if (triangles.current) {
      setDimensions({
        width: triangles.current.clientWidth,
        height: triangles.current.clientHeight,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", reapplyDimensions);
    reapplyDimensions();
    return () => window.removeEventListener("resize", reapplyDimensions);
  }, []);

  return (
    <Root ref={triangles} className={className} {...props}>
      <Tri w={dimensions.width} h={dimensions.height} button={button} />
      <Foreground>{children}</Foreground>
    </Root>
  );
};

export default Triangles;
