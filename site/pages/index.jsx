import styled from "styled-components";
import { FloatyTiltyHeaderCard } from "../src/components/FloatyTiltyHeaderCard";
import { Navbar } from "../src/components/Navbar";
import Triangles from "../src/components/Triangles";
import DemoArticle from "../src/content/DemoArticle";

const Content = styled.div`
  justify-content: center;
  flex-direction: column;
  justify-items: center;
  display: flex;

  & > * {
    margin-top: 7%;
  }
`;

const Header = styled(FloatyTiltyHeaderCard)`
  margin-top: 6em;
  flex-grow: 0;
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

const spacer = `
  height: 15.8em;
  width: 100%;
  margin: 0px;
  padding: 0px;
  border: none;
`;

const CoolTriangles = styled(Triangles)`
  ${spacer}

  img,
  svg {
    object-fit: cover;
    box-sizing: border-box;
  }
`;

const Spacer = styled.div`
  ${spacer}
`;

const Background = () => (
  <BackgroundBase>
    <CoolTriangles button />
  </BackgroundBase>
);

const Home = () => (
  <>
    <main>
      <Background />
      <Spacer />
      <Header />
      <Navbar />
      <Content>
        <DemoArticle />
      </Content>
    </main>
  </>
);

export default Home;
