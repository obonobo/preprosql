import styled from "styled-components";
import Wiki from "../src/components/article/articles/Wiki";
import { DynamicButtons } from "../src/components/floatytilty/ButtonGrid";
import { FloatyTiltyHeaderCard } from "../src/components/floatytilty/FloatyTiltyHeaderCard";
import { Navbar } from "../src/components/navbar/Navbar";
import { TriangleTopbar } from "../src/components/triangles/TriangleTopbar";
import { LiftedContextProvider } from "../src/state/LiftedContext";
import { SmallScreenLiftObserver } from "../src/util/utility-components";

const Content = styled.div`
  justify-content: center;
  flex-direction: column;
  justify-items: center;
  display: flex;

  & > * {
    margin-top: 7rem;
  }
`;

const FloatingHeader = styled(FloatyTiltyHeaderCard)`
  margin-top: 6em;
  flex-grow: 0;
`;

const Home = (): JSX.Element => (
  <LiftedContextProvider>
    <SmallScreenLiftObserver />
    <main>
      <TriangleTopbar />
      <FloatingHeader />
      <DynamicButtons />
      <Navbar />
      <Content>
        <Wiki />
      </Content>
    </main>
  </LiftedContextProvider>
);

export default Home;
