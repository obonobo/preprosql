import styled from "styled-components";
import { FloatyTiltyHeaderCard } from "../src/components/FloatyTiltyHeaderCard";
import Triangles from "../src/components/Triangles";

const Root = styled.div`
  justify-content: center;
  flex-direction: column;
  justify-items: center;
  display: flex;

  & > * {
    margin-top: 7%;
  }
`;

const Header = styled(FloatyTiltyHeaderCard)`
  margin-top: 13%;
  flex-grow: 0;
`;

const BackgroundBase = styled.div`
  position: absolute;
  width: 100%;
  padding: 0;
  z-index: 0;
  margin: 0;
  left: 0;
  top: 0;
`;

const CoolTriangles = styled(Triangles)`
  height: 15.3em;
  width: 100%;

  img,
  svg {
    object-fit: cover;
    box-sizing: border-box;
    border-bottom: 0.5em solid rgba(128, 128, 128, 0.404);
  }
`;

const Background = () => (
  <BackgroundBase>
    <CoolTriangles button />
  </BackgroundBase>
);

const Home = () => (
  <>
    <main>
      <Root>
        <Background />
        <Header />
        <p>asdasd </p>
      </Root>
    </main>
  </>
);

export default Home;
