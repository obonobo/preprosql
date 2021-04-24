import { useMediaQuery } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import { DynamicButtons } from "../src/components/ButtonGrid";
import LiftedContext from "../src/components/extras/LiftedContext";
import { FloatyTiltyHeaderCard } from "../src/components/FloatyTiltyHeaderCard";
import { Navbar } from "../src/components/navbar/Navbar";
import { TriangleTopbar } from "../src/components/TriangleTopbar";
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

const FloatingHeader = styled(FloatyTiltyHeaderCard)`
  margin-top: 6em;
  flex-grow: 0;
`;

const Home = () => {
  const [lifted, setLifted] = useState(false);
  const smallScreen = useMediaQuery("(max-width: 45em)");

  return (
    <LiftedContext.Provider
      value={{ lifted: lifted || smallScreen, setLifted }}
    >
      <main>
        <TriangleTopbar />
        <FloatingHeader />
        <DynamicButtons />
        <Navbar />
        <Content>
          <DemoArticle />
        </Content>
      </main>
    </LiftedContext.Provider>
  );
};

export default Home;
