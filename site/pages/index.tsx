import { useMediaQuery } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import DemoArticle from "../src/components/article/articles/DemoArticle";
import Wiki from "../src/components/article/articles/Wiki";
import { DynamicButtons } from "../src/components/floatytilty/ButtonGrid";
import { FloatyTiltyHeaderCard } from "../src/components/floatytilty/FloatyTiltyHeaderCard";
import { Navbar } from "../src/components/navbar/Navbar";
import { TriangleTopbar } from "../src/components/triangles/TriangleTopbar";
import { LiftedContext } from "../src/util/contexts";
import { style as $ } from "../src/util/utils";

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
          <DemoArticle loremIpsum times={50} style={{ marginTop: "6em" }} />
          <Wiki style={$`width: 100vw;`} />
        </Content>
      </main>
    </LiftedContext.Provider>
  );
};

export default Home;
