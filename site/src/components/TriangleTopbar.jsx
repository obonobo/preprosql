import styled, { css } from "styled-components";
import Triangles from "./Triangles";

const spacer = css`
  height: 15.8em;
  width: 100%;
  margin: 0px;
  padding: 0px;
  border: none;
`;

const Spacer = styled.div`
  ${spacer}
`;

const BackgroundBase = styled.div`
  position: absolute;
  width: 100%;
  height: 15.8em;
  padding: 0;
  z-index: 0;
  margin: 0;
  left: 0;
  top: 0;

  box-sizing: border-box;
`;

const CoolTriangles = styled(Triangles).attrs({ button: true })`
  ${spacer}

  img,
  svg {
    object-fit: cover;
    box-sizing: border-box;
  }
`;

const Background = () => (
  <BackgroundBase>
    <CoolTriangles />
  </BackgroundBase>
);

const TriangleTopbar = () => (
  <>
    <Background />
    <Spacer />
  </>
);

export { Spacer, Background, TriangleTopbar };
